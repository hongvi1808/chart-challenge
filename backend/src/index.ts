import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import { connectDB } from './modules/mongodb/init';
import { expressjwt } from 'express-jwt';
import { authenRouter } from './modules/auth/route';
import { metricsRouter } from './modules/metrics/route';

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true,}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

connectDB();

app.use(expressjwt({
  secret: process.env.ACCESS_TOKEN_SECRET || '',
  algorithms: ['HS256'],
  credentialsRequired: false,
  requestProperty: "user",
}).unless({
  path:[
     /^\/auth\/.*/,
     { url: "/mectric/compare", methods: ["GET"] }
    ],
}))
app.use('/auth', authenRouter)
app.use('/metrics', metricsRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});