const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve static files with proper headers
app.use(express.static(__dirname, {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
        if (path.endsWith('.gif') || path.endsWith('.png') || path.endsWith('.jpg')) {
            res.setHeader('Content-Type', 'image/' + path.split('.').pop());
        }
    }
}));

// Serve public directory for assets
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Explicitly serve CSS and JS files
app.get('/styles.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/script.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'script.js'));
});

// API Routes for Memes

// Get all memes (with pagination)
app.get('/api/memes', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const memes = await prisma.meme.findMany({
            orderBy: { timestamp: 'desc' },
            skip,
            take: limit
        });

        const total = await prisma.meme.count();

        res.json({
            memes,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching memes:', error);
        res.status(500).json({ error: 'Failed to fetch memes' });
    }
});

// Get memes by type
app.get('/api/memes/type/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const memes = await prisma.meme.findMany({
            where: { type },
            orderBy: { timestamp: 'desc' }
        });

        res.json({ memes });
    } catch (error) {
        console.error('Error fetching memes by type:', error);
        res.status(500).json({ error: 'Failed to fetch memes by type' });
    }
});

// Create a new meme
app.post('/api/memes', async (req, res) => {
    try {
        const { imageUrl, imageData, ipfsHash, text, type, corsMethod, seed } = req.body;

        if ((!imageUrl && !imageData) || !text || !type) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Use imageData if provided (base64), otherwise use imageUrl
        const finalImageUrl = imageData || imageUrl;

        const meme = await prisma.meme.create({
            data: {
                imageUrl: finalImageUrl,
                ipfsHash: ipfsHash || null,
                text,
                type,
                corsMethod: corsMethod || 'Unknown',
                seed: seed || null,
                dateCreated: new Date().toLocaleString()
            }
        });

        // Update stats
        await updateMemeStats();

        res.status(201).json({ meme });
    } catch (error) {
        console.error('Error creating meme:', error);
        res.status(500).json({ error: 'Failed to create meme' });
    }
});



// Upload to IPFS via Pinata (simplified approach)
app.post('/api/upload-to-ipfs', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        const pinataApiKey = process.env.PINATA_API_KEY;
        const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;

        console.log('🔑 Checking Pinata credentials...');
        console.log('API Key exists:', !!pinataApiKey);
        console.log('Secret Key exists:', !!pinataSecretApiKey);

        if (!pinataApiKey || !pinataSecretApiKey) {
            console.error('❌ Pinata credentials missing!');
            return res.status(500).json({ error: 'Pinata credentials not configured' });
        }

        console.log('📤 Uploading to Pinata with file size:', req.file.buffer.length);

        // Use axios for better form-data handling
        const axios = require('axios');
        const FormData = require('form-data');

        const formData = new FormData();
        formData.append('file', req.file.buffer, {
            filename: `crypto-meme-${Date.now()}.png`,
            contentType: 'image/png'
        });

        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                ...formData.getHeaders(),
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataSecretApiKey
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });

        console.log('✅ IPFS upload successful:', response.data.IpfsHash);

        res.json({
            success: true,
            ipfsHash: response.data.IpfsHash,
            ipfsUrl: `https://ipfs.io/ipfs/${response.data.IpfsHash}`,
            pinataUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
        });

    } catch (error) {
        console.error('IPFS upload error:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to upload to IPFS',
            details: error.response?.data || error.message
        });
    }
});

// Test Pinata credentials
app.get('/api/test-pinata', async (req, res) => {
    try {
        const pinataApiKey = process.env.PINATA_API_KEY;
        const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;

        if (!pinataApiKey || !pinataSecretApiKey) {
            return res.status(500).json({ error: 'Pinata credentials not configured' });
        }

        // Test with Pinata's test authentication endpoint
        const response = await fetch('https://api.pinata.cloud/data/testAuthentication', {
            method: 'GET',
            headers: {
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataSecretApiKey
            }
        });

        if (response.ok) {
            const result = await response.json();
            res.json({ success: true, message: 'Pinata credentials are valid', result });
        } else {
            const errorText = await response.text();
            res.status(400).json({ error: 'Invalid Pinata credentials', details: errorText });
        }

    } catch (error) {
        console.error('Pinata test error:', error);
        res.status(500).json({ error: 'Failed to test Pinata credentials' });
    }
});

// Update meme with IPFS hash
app.post('/api/memes/update-ipfs', async (req, res) => {
    try {
        const { originalImageUrl, ipfsHash, ipfsUrl } = req.body;

        if (!originalImageUrl || !ipfsHash) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        console.log('🔄 Updating meme with IPFS hash:', ipfsHash);

        // Find and update the meme with the original image URL
        const updatedMeme = await prisma.meme.updateMany({
            where: {
                imageUrl: originalImageUrl
            },
            data: {
                ipfsHash: ipfsHash,
                imageUrl: ipfsUrl || `https://ipfs.io/ipfs/${ipfsHash}`
            }
        });

        if (updatedMeme.count > 0) {
            console.log(`✅ Updated ${updatedMeme.count} meme(s) with IPFS hash`);
            res.json({
                success: true,
                updated: updatedMeme.count,
                ipfsHash,
                ipfsUrl: ipfsUrl || `https://ipfs.io/ipfs/${ipfsHash}`
            });
        } else {
            console.warn('⚠️ No memes found with that image URL');
            res.status(404).json({ error: 'No memes found with that image URL' });
        }

    } catch (error) {
        console.error('Error updating meme with IPFS:', error);
        res.status(500).json({ error: 'Failed to update meme with IPFS hash' });
    }
});

// Get meme statistics
app.get('/api/stats', async (req, res) => {
    try {
        const totalMemes = await prisma.meme.count();

        const memesByType = await prisma.meme.groupBy({
            by: ['type'],
            _count: { type: true }
        });

        const recentMemes = await prisma.meme.findMany({
            orderBy: { timestamp: 'desc' },
            take: 5,
            select: { id: true, text: true, type: true, timestamp: true }
        });

        const stats = {
            totalMemes,
            memesByType: memesByType.reduce((acc, item) => {
                acc[item.type] = item._count.type;
                return acc;
            }, {}),
            recentMemes
        };

        res.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// Debug endpoint for Vercel deployment
app.get('/api/debug', (req, res) => {
    const fs = require('fs');
    const debug = {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        __dirname: __dirname,
        files: {
            'index.html': fs.existsSync(path.join(__dirname, 'index.html')),
            'styles.css': fs.existsSync(path.join(__dirname, 'styles.css')),
            'script.js': fs.existsSync(path.join(__dirname, 'script.js'))
        },
        headers: req.headers,
        url: req.url
    };
    res.json(debug);
});

// ===== FOMO METER API ENDPOINTS =====

// Get FOMO stats
app.get('/api/fomo/stats', async (req, res) => {
    try {
        const stats = await prisma.fOMOStats.findUnique({
            where: { id: 'global' }
        });

        if (!stats) {
            // Initialize stats if they don't exist
            const newStats = await prisma.fOMOStats.create({
                data: {
                    id: 'global',
                    totalClicks: 42069,
                    currentLevel: 1,
                    onlineUsers: Math.floor(Math.random() * 1000) + 500
                }
            });
            return res.json(newStats);
        }

        // Update online users count with some randomness
        const updatedStats = await prisma.fOMOStats.update({
            where: { id: 'global' },
            data: {
                onlineUsers: Math.floor(Math.random() * 1000) + 500,
                lastUpdated: new Date()
            }
        });

        res.json(updatedStats);
    } catch (error) {
        console.error('Error fetching FOMO stats:', error);
        res.status(500).json({ error: 'Failed to fetch FOMO stats' });
    }
});

// Record a FOMO click
app.post('/api/fomo/click', async (req, res) => {
    try {
        const { userId, latitude, longitude, country, city } = req.body;
        const ipAddress = req.ip || req.connection.remoteAddress;
        const userAgent = req.get('User-Agent');

        // Rate limiting: max 1 click per 100ms per IP (much more lenient)
        const recentClick = await prisma.fOMOClick.findFirst({
            where: {
                ipAddress,
                timestamp: {
                    gte: new Date(Date.now() - 100) // Last 100ms only
                }
            }
        });

        if (recentClick) {
            return res.status(429).json({ error: 'Rate limited: Please wait before clicking again' });
        }

        // Record the click
        const click = await prisma.fOMOClick.create({
            data: {
                userId,
                ipAddress,
                latitude,
                longitude,
                country,
                city,
                userAgent
            }
        });

        // Update global stats
        const updatedStats = await prisma.fOMOStats.upsert({
            where: { id: 'global' },
            update: {
                totalClicks: { increment: 1 },
                lastUpdated: new Date()
            },
            create: {
                id: 'global',
                totalClicks: 42070,
                currentLevel: 1,
                onlineUsers: Math.floor(Math.random() * 1000) + 500
            }
        });

        // Update or create user stats
        if (userId) {
            const today = new Date().toDateString();
            const user = await prisma.fOMOUser.findUnique({
                where: { userId }
            });

            if (user) {
                const lastClickDate = user.lastClickDate ? user.lastClickDate.toDateString() : null;
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayString = yesterday.toDateString();

                let newStreakDays = user.streakDays;
                if (lastClickDate !== today) {
                    if (lastClickDate === yesterdayString) {
                        newStreakDays++;
                    } else {
                        newStreakDays = 1;
                    }
                }

                await prisma.fOMOUser.update({
                    where: { userId },
                    data: {
                        totalClicks: { increment: 1 },
                        lastClickDate: new Date(),
                        streakDays: newStreakDays,
                        country: country || user.country,
                        city: city || user.city
                    }
                });
            } else {
                await prisma.fOMOUser.create({
                    data: {
                        userId,
                        totalClicks: 1,
                        lastClickDate: new Date(),
                        streakDays: 1,
                        country,
                        city
                    }
                });
            }
        }

        // Update leaderboards asynchronously (don't wait for completion)
        setImmediate(() => {
            updateLeaderboards(userId, country, city).catch(error => {
                console.error('Error updating leaderboards:', error);
            });
        });

        res.json({
            success: true,
            globalStats: updatedStats,
            clickId: click.id
        });
    } catch (error) {
        console.error('Error recording FOMO click:', error);
        res.status(500).json({ error: 'Failed to record click' });
    }
});

// Get user stats
app.get('/api/fomo/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await prisma.fOMOUser.findUnique({
            where: { userId }
        });

        if (!user) {
            return res.json({
                totalClicks: 0,
                streakDays: 0,
                achievements: [],
                rank: 999999
            });
        }

        // Calculate rank
        const rank = await prisma.fOMOUser.count({
            where: {
                totalClicks: { gt: user.totalClicks }
            }
        }) + 1;

        res.json({
            ...user,
            rank
        });
    } catch (error) {
        console.error('Error fetching user stats:', error);
        res.status(500).json({ error: 'Failed to fetch user stats' });
    }
});

// Get recent clicks for map
app.get('/api/fomo/recent-clicks', async (req, res) => {
    try {
        const recentClicks = await prisma.fOMOClick.findMany({
            where: {
                latitude: { not: null },
                longitude: { not: null },
                timestamp: {
                    gte: new Date(Date.now() - 5 * 60 * 1000) // Last 5 minutes
                }
            },
            select: {
                latitude: true,
                longitude: true,
                country: true,
                city: true,
                timestamp: true
            },
            orderBy: { timestamp: 'desc' },
            take: 100
        });

        res.json(recentClicks);
    } catch (error) {
        console.error('Error fetching recent clicks:', error);
        res.status(500).json({ error: 'Failed to fetch recent clicks' });
    }
});

// Get leaderboards
app.get('/api/fomo/leaderboards', async (req, res) => {
    try {
        const [globalUsers, countries, cities] = await Promise.all([
            // Top global users
            prisma.fOMOUser.findMany({
                orderBy: { totalClicks: 'desc' },
                take: 10,
                select: {
                    userId: true,
                    totalClicks: true,
                    country: true,
                    city: true
                }
            }),

            // Top countries
            prisma.fOMOLeaderboard.findMany({
                where: { type: 'country' },
                orderBy: { clicks: 'desc' },
                take: 10
            }),

            // Top cities
            prisma.fOMOLeaderboard.findMany({
                where: { type: 'city' },
                orderBy: { clicks: 'desc' },
                take: 10
            })
        ]);

        res.json({
            globalUsers: globalUsers.map((user, index) => ({
                rank: index + 1,
                name: `Anonymous Degen #${user.userId.slice(-4)}`,
                clicks: user.totalClicks,
                location: user.city && user.country ? `${user.city}, ${user.country}` : user.country || 'Unknown'
            })),
            countries: countries.map((country, index) => ({
                rank: index + 1,
                name: country.name,
                clicks: country.clicks
            })),
            cities: cities.map((city, index) => ({
                rank: index + 1,
                name: city.name,
                clicks: city.clicks
            }))
        });
    } catch (error) {
        console.error('Error fetching leaderboards:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboards' });
    }
});

// Update user achievements
app.post('/api/fomo/achievements', async (req, res) => {
    try {
        const { userId, achievements } = req.body;

        if (!userId || !Array.isArray(achievements)) {
            return res.status(400).json({ error: 'Invalid request data' });
        }

        const user = await prisma.fOMOUser.upsert({
            where: { userId },
            update: { achievements },
            create: {
                userId,
                achievements,
                totalClicks: 0
            }
        });

        res.json({ success: true, achievements: user.achievements });
    } catch (error) {
        console.error('Error updating achievements:', error);
        res.status(500).json({ error: 'Failed to update achievements' });
    }
});

// Helper function to update leaderboards
async function updateLeaderboards(userId, country, city) {
    try {
        // Update country leaderboard
        if (country) {
            await prisma.fOMOLeaderboard.upsert({
                where: { type_identifier: { type: 'country', identifier: country } },
                update: {
                    clicks: { increment: 1 },
                    lastUpdated: new Date()
                },
                create: {
                    type: 'country',
                    name: country,
                    identifier: country,
                    clicks: 1
                }
            });
        }

        // Update city leaderboard
        if (city) {
            await prisma.fOMOLeaderboard.upsert({
                where: { type_identifier: { type: 'city', identifier: city } },
                update: {
                    clicks: { increment: 1 },
                    lastUpdated: new Date()
                },
                create: {
                    type: 'city',
                    name: city,
                    identifier: city,
                    clicks: 1
                }
            });
        }
    } catch (error) {
        console.error('Error updating leaderboards:', error);
    }
}

// Helper function to update meme stats
async function updateMemeStats() {
    try {
        const totalMemes = await prisma.meme.count();

        // Update or create stats record
        await prisma.memeStats.upsert({
            where: { id: 'main' },
            update: {
                totalMemes,
                lastUpdated: new Date()
            },
            create: {
                id: 'main',
                totalMemes,
                lastUpdated: new Date()
            }
        });
    } catch (error) {
        console.error('Error updating stats:', error);
    }
}

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down server...');
    await prisma.$disconnect();
    process.exit(0);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Database: SQLite (crypto_memes.db)`);
    console.log(`🎨 Frontend: Serving static files from current directory`);
});
