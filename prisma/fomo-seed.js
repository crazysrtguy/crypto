const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedFOMOData() {
    console.log('🎯 Seeding FOMO meter data...');

    try {
        // Initialize global FOMO stats
        await prisma.fOMOStats.upsert({
            where: { id: 'global' },
            update: {},
            create: {
                id: 'global',
                totalClicks: 42069,
                currentLevel: 1,
                onlineUsers: 500
            }
        });
        console.log('✅ Global FOMO stats initialized');

        // Create sample country leaderboard data
        const countries = [
            { name: '🇺🇸 United States', identifier: 'US', clicks: 15420 },
            { name: '🇨🇳 China', identifier: 'CN', clicks: 12350 },
            { name: '🇮🇳 India', identifier: 'IN', clicks: 9876 },
            { name: '🇩🇪 Germany', identifier: 'DE', clicks: 8765 },
            { name: '🇯🇵 Japan', identifier: 'JP', clicks: 7654 },
            { name: '🇬🇧 United Kingdom', identifier: 'GB', clicks: 6543 },
            { name: '🇫🇷 France', identifier: 'FR', clicks: 5432 },
            { name: '🇨🇦 Canada', identifier: 'CA', clicks: 4321 },
            { name: '🇦🇺 Australia', identifier: 'AU', clicks: 3210 },
            { name: '🇧🇷 Brazil', identifier: 'BR', clicks: 2109 }
        ];

        for (const country of countries) {
            await prisma.fOMOLeaderboard.upsert({
                where: { type_identifier: { type: 'country', identifier: country.identifier } },
                update: { clicks: country.clicks },
                create: {
                    type: 'country',
                    name: country.name,
                    identifier: country.identifier,
                    clicks: country.clicks,
                    rank: 0
                }
            });
        }
        console.log('✅ Country leaderboard seeded');

        // Create sample city leaderboard data
        const cities = [
            { name: '🔥 Degen City', identifier: 'degen-city', clicks: 420 },
            { name: '💎 Diamond District', identifier: 'diamond-district', clicks: 369 },
            { name: '🚀 Moon Base Alpha', identifier: 'moon-base', clicks: 314 },
            { name: '🤡 Clown Town', identifier: 'clown-town', clicks: 287 },
            { name: '🦍 Ape Island', identifier: 'ape-island', clicks: 256 },
            { name: '🎪 Circus Central', identifier: 'circus-central', clicks: 234 },
            { name: '💀 Skull Valley', identifier: 'skull-valley', clicks: 210 },
            { name: '🌙 Lunar Landing', identifier: 'lunar-landing', clicks: 198 },
            { name: '🔥 Fire Station', identifier: 'fire-station', clicks: 187 },
            { name: '⚡ Lightning Ridge', identifier: 'lightning-ridge', clicks: 176 }
        ];

        for (const city of cities) {
            await prisma.fOMOLeaderboard.upsert({
                where: { type_identifier: { type: 'city', identifier: city.identifier } },
                update: { clicks: city.clicks },
                create: {
                    type: 'city',
                    name: city.name,
                    identifier: city.identifier,
                    clicks: city.clicks,
                    rank: 0
                }
            });
        }
        console.log('✅ City leaderboard seeded');

        // Create some sample users
        const sampleUsers = [
            { userId: 'user_whale_001', totalClicks: 1337, country: 'United States', city: 'Degen City' },
            { userId: 'user_diamond_002', totalClicks: 999, country: 'Germany', city: 'Diamond District' },
            { userId: 'user_ape_003', totalClicks: 888, country: 'Japan', city: 'Ape Island' },
            { userId: 'user_moon_004', totalClicks: 777, country: 'Canada', city: 'Moon Base Alpha' },
            { userId: 'user_fire_005', totalClicks: 666, country: 'Australia', city: 'Fire Station' }
        ];

        for (const user of sampleUsers) {
            await prisma.fOMOUser.upsert({
                where: { userId: user.userId },
                update: {},
                create: {
                    userId: user.userId,
                    totalClicks: user.totalClicks,
                    lastClickDate: new Date(),
                    streakDays: Math.floor(Math.random() * 30) + 1,
                    achievements: ['first-click'],
                    country: user.country,
                    city: user.city
                }
            });
        }
        console.log('✅ Sample users created');

        // Create some sample recent clicks for the map
        const sampleClicks = [
            { lat: 40.7128, lng: -74.0060, country: 'United States', city: 'New York' },
            { lat: 51.5074, lng: -0.1278, country: 'United Kingdom', city: 'London' },
            { lat: 35.6762, lng: 139.6503, country: 'Japan', city: 'Tokyo' },
            { lat: 52.5200, lng: 13.4050, country: 'Germany', city: 'Berlin' },
            { lat: -33.8688, lng: 151.2093, country: 'Australia', city: 'Sydney' },
            { lat: 37.7749, lng: -122.4194, country: 'United States', city: 'San Francisco' },
            { lat: 48.8566, lng: 2.3522, country: 'France', city: 'Paris' },
            { lat: 55.7558, lng: 37.6176, country: 'Russia', city: 'Moscow' },
            { lat: 28.6139, lng: 77.2090, country: 'India', city: 'New Delhi' },
            { lat: -23.5505, lng: -46.6333, country: 'Brazil', city: 'São Paulo' }
        ];

        for (const click of sampleClicks) {
            await prisma.fOMOClick.create({
                data: {
                    userId: `demo_user_${Math.random().toString(36).substr(2, 9)}`,
                    latitude: click.lat,
                    longitude: click.lng,
                    country: click.country,
                    city: click.city,
                    timestamp: new Date(Date.now() - Math.random() * 300000) // Random time in last 5 minutes
                }
            });
        }
        console.log('✅ Sample map clicks created');

        console.log('🎉 FOMO meter data seeded successfully!');

    } catch (error) {
        console.error('❌ Error seeding FOMO data:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run the seed function
if (require.main === module) {
    seedFOMOData()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        });
}

module.exports = { seedFOMOData };
