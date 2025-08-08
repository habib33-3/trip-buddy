import { faker } from "@faker-js/faker";
import "dotenv/config";

import { ItineraryStatus, PrismaClient, TripStatus, UserRole } from "../src/generated/prisma";
import { logger } from "../src/shared/logger";
import { hashData } from "../src/utils/hash";
import { resetDBData } from "./reset-db";

const prisma = new PrismaClient();

async function main() {
    try {
        logger.info("🧹 Cleaning database...");
        await resetDBData();
        logger.info("✅ Database cleaned.");
        logger.info("🐛 After resetDBData, before seeding...");

        // --- Seed Users ---
        logger.info("🚀 Seeding users...");

        const demoUser = await prisma.user.create({
            data: {
                email: "demo@email.com",
                name: "John Doe",
                password: await hashData("password"),
                role: UserRole.USER,
                image: faker.image.avatar(),
                initials: "JD",
            },
        });

        const users = await Promise.all(
            Array.from({ length: 4 }).map(async () =>
                prisma.user.create({
                    data: {
                        email: faker.internet.email().toLowerCase(),
                        name: faker.person.fullName(),
                        password: await hashData(faker.internet.password()),
                        role: faker.helpers.arrayElement([UserRole.USER, UserRole.ADMIN]),
                        image: faker.image.avatar(),
                        initials: faker.string.alpha({ length: 2 }).toUpperCase(),
                    },
                })
            )
        );

        users.push(demoUser);
        logger.info("✅ Users seeded.");

        // --- Seed Places ---
        logger.info("🚀 Seeding places...");
        const places = await Promise.all(
            Array.from({ length: 10 }).map(() =>
                prisma.place.create({
                    data: {
                        formattedAddress: faker.location.streetAddress({
                            useFullAddress: true,
                        }),
                        lat: parseFloat(faker.location.latitude().toString()),
                        lng: parseFloat(faker.location.longitude().toString()),
                        city: faker.location.city(),
                        country: faker.location.country(),
                        countryFlag: faker.image.avatar(),
                    },
                })
            )
        );
        logger.info("✅ Places seeded.");

        // --- Seed Trips & Itineraries ---
        logger.info("🚀 Seeding trips and itineraries...");
        for (const user of users) {
            const tripCount = faker.number.int({ min: 1, max: 3 });

            for (let i = 0; i < tripCount; i++) {
                const startDate = faker.date.future();
                const endDate = faker.date.soon({ days: 10, refDate: startDate });

                let trip;
                try {
                    trip = await prisma.trip.create({
                        data: {
                            title: faker.lorem.words(3),
                            description: faker.lorem.sentences(2),
                            status: faker.helpers.arrayElement([
                                TripStatus.PLANNED,
                                TripStatus.ACTIVE,
                                TripStatus.COMPLETED,
                                TripStatus.CANCELLED,
                            ]),
                            coverImg: faker.image.avatar(),
                            startDate,
                            endDate,
                            userId: user.id,
                        },
                    });
                } catch (err) {
                    logger.error(
                        `❌ Failed to create trip for user ${user.id}: ${
                            err instanceof Error ? err.message : String(err)
                        }`
                    );
                    continue;
                }

                const itineraryCount = faker.number.int({ min: 1, max: 4 });

                for (let j = 0; j < itineraryCount; j++) {
                    try {
                        await prisma.itinerary.create({
                            data: {
                                title: faker.lorem.words(2),
                                notes: faker.lorem.sentence(),
                                status: faker.helpers.arrayElement([
                                    ItineraryStatus.UPCOMING,
                                    ItineraryStatus.COMPLETED,
                                    ItineraryStatus.CANCELLED,
                                ]),
                                tripId: trip.id,
                                placeId: faker.helpers.arrayElement(places).id,
                            },
                        });
                    } catch (err) {
                        logger.error(
                            `❌ Failed to create itinerary for trip ${trip.id}: ${
                                err instanceof Error ? err.message : String(err)
                            }`
                        );
                    }
                }
            }
        }

        logger.info("✅ Trips and itineraries seeded.");
        logger.info("🎉 Seeding complete.");
    } catch (error) {
        logger.error(
            `❌ Seeding failed with error: ${
                error instanceof Error ? error.message : String(error)
            }`
        );
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
