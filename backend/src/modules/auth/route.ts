import { Router } from "express";
import 'reflect-metadata';
import Container from "typedi";
import { errorResponse, successResponse } from "../../models/common/response";
import { AuthService } from "./service";

const router = Router();
const service = Container.get(AuthService);
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await service.register(username, password);
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, error);
    }
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await service.login(username, password);
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, error);
    }
});
router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.cookies
    try {
        const result = await service.refresh(refreshToken);
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, error);
    }
});
export const authenRouter = router