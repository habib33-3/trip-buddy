import type { JwtPayload } from "jsonwebtoken";

type Meta = {
    page: number;
    limit: number;
    total: number;
};

export type ApiResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string | null;
    meta?: Meta;
    data?: T | null;
};

export type TokenPayload = JwtPayload & {
    id: string;
    email: string;
};

export type CityStat = {
    name: string;
    lat: number;
    lng: number;
    count: number;
};

export type Stat = {
    cities: CityStat[];
    countries: number;
    itineraryCount: number;
    mostVisitedCountry: {
        name: string;
        count: number;
        flag: string;
    };
    tripsCount: number;
    tripStatusCounts: {
        completed: number;
        inProgress: number;
        planned: number;
    };
};

export type ImageTypes = "avatars" | "place" | "trip-covers" | "trip";

export type FoldersOptions =
    | { type: "avatars"; userId: string }
    | { type: "place"; placeId: string }
    | { type: "trip-covers"; tripId: string }
    | { type: "trip"; tripId: string };
