import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import helmet from 'helmet';

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true,}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});