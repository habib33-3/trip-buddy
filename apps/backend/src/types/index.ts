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

export type Stat = {
    cities: {
        lat: number;
        lng: number;
        name: string;
        count: number;
    }[];
    countries: number;
    itineraryCount: number;
    mostVisitedCountry: string;
    tripsCount: number;
    tripStatusCounts: {
        completed: number;
        inProgress: number;
        planned: number;
    };
};
