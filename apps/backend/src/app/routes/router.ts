import { Router } from "express";

import { authRouter } from "./auth.route";
import { locationsRouter } from "./locations.routes";
import { tripRouter } from "./trip.route";

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
        path: "/location",
        router: locationsRouter,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.router);
});

export default router;
