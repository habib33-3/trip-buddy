import { Router } from "express";

import { tripRouter } from "./trip.route";
import { userRouter } from "./user.route";

const router = Router();

const routes = [
    {
        path: "/user",
        router: userRouter,
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
