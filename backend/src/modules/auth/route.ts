import { Router } from "express";
import 'reflect-metadata';
import Container from "typedi";
import { errorResponse, successResponse } from "../../models/common/response";
import { AuthService } from "./service";
import { generateToken } from "../../utils/authUtil";

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
        const refreshToken = await generateToken({ username, userId: result.userId }, process.env.REFRESH_TOKEN_SECRET, '7d')
        res.cookie("refreshToken", refreshToken.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 7 * 3600 * 1000
        });
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
router.post('/logout', async (req, res) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 7 * 3600 * 1000
        });
        successResponse(res, true);
    } catch (error) {
        errorResponse(res, error);
    }
});
export const authenRouter = router