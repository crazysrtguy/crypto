const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Sample memes for demonstration
    const sampleMemes = [
        {
            imageUrl: 'https://example.com/sample1.jpg',
            text: 'When $CRYPTO hits the moon! 🚀',
            type: 'stonks',
            corsMethod: 'Sample Data',
            dateCreated: new Date().toLocaleString(),
            seed: 1234
        },
        {
            imageUrl: 'https://example.com/sample2.jpg',
            text: 'Diamond hands forever! 💎🙌',
            type: 'diamond-hands',
            corsMethod: 'Sample Data',
            dateCreated: new Date().toLocaleString(),
            seed: 5678
        },
        {
            imageUrl: 'https://example.com/sample3.jpg',
            text: 'HODL until Valhalla! ⚔️',
            type: 'hodl',
            corsMethod: 'Sample Data',
            dateCreated: new Date().toLocaleString(),
            seed: 9012
        }
    ];

    // Create sample memes
    for (const meme of sampleMemes) {
        await prisma.meme.create({
            data: meme
        });
        console.log(`✅ Created meme: "${meme.text}"`);
    }

    // Initialize stats
    await prisma.memeStats.create({
        data: {
            id: 'main',
            totalMemes: sampleMemes.length,
            lastUpdated: new Date()
        }
    });

    console.log('🎉 Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
