import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

export const moviesRouter = Router();



moviesRouter.get('/', MovieController.getAll )

moviesRouter.get('/:id', MovieController.getById )

moviesRouter.delete('/:id', MovieController.delete)

moviesRouter.post('/', MovieController.create)

moviesRouter.patch('/:id', MovieController.update)
