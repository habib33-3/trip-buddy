/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextFunction, Request, Response } from "express";

import type { AnyZodObject } from "zod";

const validationMiddleware =
    (schema: AnyZodObject) => async (req: Request, _res: Response, next: NextFunction) => {
        try {
            const originalData = {
                body: req.body,
                params: req.params,
                query: req.query,
            };

            const validatedData = await schema.parseAsync(originalData);

            Object.assign(req, validatedData);

            return next();
        } catch (error) {
            return next(error);
        }
    };

export default validationMiddleware;
