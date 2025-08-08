import { faker } from "@faker-js/faker";
import "dotenv/config";

import {
    Itinerary,
    ItineraryStatus,
    Place,
    PrismaClient,
    TripStatus,
    User,
    UserRole,
} from "../src/generated/prisma";
import { logger } from "../src/shared/logger";
import { hashData } from "../src/utils/hash";
import { resetDBData } from "./reset-db";

const prisma = new PrismaClient();

const countryFlags = [
    {
        country: "Bangladesh",
        flagUrl: "https://flagcdn.com/w320/bd.png",
        lat: 23.8103,
        lng: 90.4125,
        city: "Dhaka",
    },
    {
        country: "Bangladesh",
        flagUrl: "https://flagcdn.com/w320/bd.png",
        lat: 22.3569,
        lng: 91.7832,
        city: "Chittagong",
    },
    {
        country: "Bangladesh",
        flagUrl: "https://flagcdn.com/w320/bd.png",
        lat: 24.8949,
        lng: 91.8687,
        city: "Sylhet",
    },
    {
        country: "Bangladesh",
        flagUrl: "https://flagcdn.com/w320/bd.png",
        lat: 23.6236,
        lng: 90.4986,
        city: "Narayanganj",
    },
    {
        country: "Bangladesh",
        flagUrl: "https://flagcdn.com/w320/bd.png",
        lat: 23.4628,
        lng: 91.1811,
        city: "Comilla",
    },
    {
        country: "France",
        flagUrl: "https://flagcdn.com/w320/fr.png",
        lat: 48.8566,
        lng: 2.3522,
        city: "Paris",
    },
    {
        country: "France",
        flagUrl: "https://flagcdn.com/w320/fr.png",
        lat: 43.6047,
        lng: 1.4442,
        city: "Toulouse",
    },
    {
        country: "France",
        flagUrl: "https://flagcdn.com/w320/fr.png",
        lat: 45.764,
        lng: 4.8357,
        city: "Lyon",
    },
    {
        country: "France",
        flagUrl: "https://flagcdn.com/w320/fr.png",
        lat: 43.2965,
        lng: 5.3698,
        city: "Marseille",
    },
    {
        country: "France",
        flagUrl: "https://flagcdn.com/w320/fr.png",
        lat: 49.2583,
        lng: 4.0317,
        city: "Reims",
    },
    {
        country: "Japan",
        flagUrl: "https://flagcdn.com/w320/jp.png",
        lat: 35.6895,
        lng: 139.6917,
        city: "Tokyo",
    },
    {
        country: "Japan",
        flagUrl: "https://flagcdn.com/w320/jp.png",
        lat: 34.6937,
        lng: 135.5023,
        city: "Osaka",
    },
    {
        country: "Japan",
        flagUrl: "https://flagcdn.com/w320/jp.png",
        lat: 43.0618,
        lng: 141.3545,
        city: "Sapporo",
    },
    {
        country: "Japan",
        flagUrl: "https://flagcdn.com/w320/jp.png",
        lat: 35.0116,
        lng: 135.7681,
        city: "Kyoto",
    },
    {
        country: "Japan",
        flagUrl: "https://flagcdn.com/w320/jp.png",
        lat: 33.5902,
        lng: 130.4017,
        city: "Fukuoka",
    },
    {
        country: "Canada",
        flagUrl: "https://flagcdn.com/w320/ca.png",
        lat: 45.4215,
        lng: -75.6999,
        city: "Ottawa",
    },
    {
        country: "Canada",
        flagUrl: "https://flagcdn.com/w320/ca.png",
        lat: 43.65107,
        lng: -79.347015,
        city: "Toronto",
    },
    {
        country: "Canada",
        flagUrl: "https://flagcdn.com/w320/ca.png",
        lat: 49.2827,
        lng: -123.1207,
        city: "Vancouver",
    },
];

// Modular function to seed users
async function seedUsers() {
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

    return [...users, demoUser];
}

// Modular function to seed places
async function seedPlaces() {
    const places = await Promise.all(
        countryFlags.map(({ country, flagUrl, lat, lng, city }) =>
            prisma.place.create({
                data: {
                    formattedAddress: `${faker.location.streetAddress()}, ${city}, ${country}`,
                    lat,
                    lng,
                    city,
                    country,
                    countryFlag: flagUrl,
                },
            })
        )
    );
    return places;
}

// Modular function to seed trips and itineraries with transactions
async function seedTripsAndItineraries(users: User[], places: Place[]) {
    for (const user of users) {
        const tripCount = faker.number.int({ min: 1, max: 3 });

        for (let i = 0; i < tripCount; i++) {
            try {
                await prisma.$transaction(async (tx) => {
                    const startDate = faker.date.future();
                    const endDate = faker.date.soon({ days: 10, refDate: startDate });

                    const trip = await tx.trip.create({
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

                    const itineraryCount = faker.number.int({ min: 1, max: 4 });
                    const itineraryPromises: Promise<Itinerary>[] = [];

                    for (let j = 0; j < itineraryCount; j++) {
                        itineraryPromises.push(
                            tx.itinerary.create({
                                data: {
                                    title: faker.lorem.words(2),
                                    notes: faker.lorem.sentence(),
                                    status: faker.helpers.arrayElement([
                                        ItineraryStatus.UPCOMING,
                                        ItineraryStatus.COMPLETED,
                                        ItineraryStatus.CANCELLED,
                                    ]),
                                    tripId: trip.id,
                                    placeId: faker.helpers.arrayElement(places as Place[]).id,
                                },
                            })
                        );
                    }

                    await Promise.all(itineraryPromises);
                });
            } catch (err) {
                logger.error(
                    `❌ Failed to create trip and itineraries for user ${user.id}: ${
                        err instanceof Error ? err.message : String(err)
                    }`
                );
            }
        }
    }
}

async function main() {
    try {
        logger.info("🧹 Cleaning database...");
        await resetDBData();
        logger.info("✅ Database cleaned.");

        logger.info("🚀 Seeding users...");
        const users = await seedUsers();
        logger.info("✅ Users seeded.");

        logger.info("🚀 Seeding places...");
        const places = await seedPlaces();
        logger.info("✅ Places seeded.");

        logger.info("🚀 Seeding trips and itineraries...");
        await seedTripsAndItineraries(users, places);
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
