import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.vehicle.deleteMany()
    const teste = await prisma.vehicle.create({
        data: {
            brand: 'ferrari',
            name: '458 italia',
            plate: 'AAA1111',
        },
    });

    console.log({ teste });
}

main().catch((e) => {
    console.error(e);
});
