import { Service } from "typedi";
import models from "../../models/mongoose";
import * as bcrypt from 'bcrypt';
import { v7 as uuidv7 } from 'uuid';
import { generateToken, verifyToken } from "../../utils/authUtil";

@Service()
export class AuthService {
    public async register(username: string, password: string) {
        const userDoc = await models.User.findOne({ username, alive: true })
        const hashedPassword = await bcrypt.hash(password, 10)
        if (userDoc) {
            throw { message: 'Username exsited', code: 'USERNAME_EXISTED' };
        }
        const user = new models.User({
            _id: uuidv7(),
            username,
            hash: hashedPassword,
        })
        await user.save()
        return true;
    }
    public async login(username: string, password: string) {
        const userDoc = await models.User.findOne({ username, alive: true })
        if (!userDoc) {
            throw { message: 'Username is not existed', code: 'USERNAME_NOTE_EXISTED' };
        }
        const isPasswordValid = await bcrypt.compare(
            userDoc.hash,
            password,
        );
        if (isPasswordValid) {
            throw { message: 'Password is not correct', code: 'PASSWORD_NOT_CORRECT' };
        }

        const { token, expireAt } = await generateToken({ username, userId: userDoc.id}, process.env.ACCESS_TOKEN_SECRET );
        return { accessToken: token, username: userDoc.username, userId: userDoc.id, expireAt };
    }
    public async refresh(refreshToken: string) {
        if (!refreshToken) throw { code: 'UNAUTHEN', message: 'Refresh token is existed' }
        const payload = await verifyToken(refreshToken);
        if (!payload.username || !payload.userId) throw { code: 'UNAUTHEN', message: 'Refresh token is error' }

        const { token, expireAt } = await generateToken({ username: payload.username, userId: payload.userId });
        return { accessToken: token,  username: payload.username, userId: payload.userId, expireAt };
    }
}