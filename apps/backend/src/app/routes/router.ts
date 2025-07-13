import { Router } from "express";

import { authRouter } from "./auth.route";
import { tripRouter } from "./trip.route";

const router = Router();

const routes = [
    {
        path: "/auth",
        router: authRouter,
    },
    {
        path: "/trip",
        router: tripRouter,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.router);
});

export default router;
