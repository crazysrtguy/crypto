const express = require('express');
const cors = require('cors');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

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
        const { imageUrl, imageData, text, type, corsMethod, seed } = req.body;

        if ((!imageUrl && !imageData) || !text || !type) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Use imageData if provided (base64), otherwise use imageUrl
        const finalImageUrl = imageData || imageUrl;

        const meme = await prisma.meme.create({
            data: {
                imageUrl: finalImageUrl,
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
