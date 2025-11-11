import { createApp } from "./app";
import { MovieModel } from "./models/database/mysql/movie.js";

createApp({ movieModel: MovieModel }); 