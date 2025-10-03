import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    username: string,
    hash: string
    alive: boolean
    createdAt: number
    createBy: string;
}

const userSchema = new mongoose.Schema(
    {
        _id: String,
        username: { type: String, required: true },
        hash: { type: String, required: true },
        alive: { type: Boolean, default: true, },
        createdAt: { type: Number, default: new Date().getTime() },
        createdBy: { type: String, default: 'vi' },
    },
    {
        strict: false,
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform(doc, ret: any) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

export default mongoose.model<IUser>("user", userSchema, 'user');