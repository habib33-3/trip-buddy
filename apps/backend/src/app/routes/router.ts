import { Router } from "express";

import { authRouter } from "./auth.routes";
import { itineraryRouter } from "./itinerary.routes";
import { placeRouter } from "./place.routes";
import { statsRouter } from "./stats.routes";
import { tripRouter } from "./trip.routes";
import { userRouter } from "./user.routes";

const router = Router();

const routes: { path: string; router: Router }[] = [
    {
        path: "/auth",
        router: authRouter,
    },
    {
        path: "/trip",
        router: tripRouter,
    },
    {
        path: "/itinerary",
        router: itineraryRouter,
    },
    {
        path: "/stats",
        router: statsRouter,
    },
    {
        path: "/place",
        router: placeRouter,
    },
    {
        path: "/user",
        router: userRouter,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.router);
});

export default router;
