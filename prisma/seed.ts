import prisma from "../lib/prisma";

async function seedCurrency() {
    const currencies = [
        { name: 'Indian Rupee', symbol: '₹' },
        { name: 'United Arab Emirates Dirham', symbol: 'AED' },
        { name: 'US Dollar', symbol: '$' },
        { name: 'Euro', symbol: '€' },
        { name: 'Saudi Riyal', symbol: 'SAR' },
    ];

    for (const currency of currencies) {
        const existing = await prisma.currency.findUnique({
            where: {
                name_symbol: {
                    name: currency.name,
                    symbol: currency.symbol,
                },
            },
        });

        if (!existing) {
            await prisma.currency.create({ data: currency });
            console.log(`✅ Created currency: ${currency.name} (${currency.symbol})`);
        } else {
            console.log(`ℹ️ Currency already exists: ${currency.name} (${currency.symbol})`);
        }
    }
}

async function main() {
    try {
        await seedCurrency();
    } catch (e) {
        console.error('❌ Error seeding currencies', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.log('\n🌱 Currency seeding completed!\n');
        process.exit(0);
    }
}

main();
