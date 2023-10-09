import express from 'express';
import cors from 'cors';
require("dotenv").config();

import { linksRoute } from "./routes/linksRoute";

export const app = express();

app.use(cors());
app.use(express.json());

app.use(linksRoute)
