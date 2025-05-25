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
app.use(express.static('.'));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
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

// Delete a meme
app.delete('/api/memes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.meme.delete({
            where: { id }
        });

        await updateMemeStats();

        res.json({ message: 'Meme deleted successfully' });
    } catch (error) {
        console.error('Error deleting meme:', error);
        res.status(500).json({ error: 'Failed to delete meme' });
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
