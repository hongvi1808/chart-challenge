import mongoose from "mongoose";

export interface IMetrics extends mongoose.Document {
    pos: number
    eatclub: number
    labourCosts: number
    date: number
    impact: boolean
    createdAt: number
    updatedAt: number
    alive: boolean

}

const metricsSchema = new mongoose.Schema(
    {
        _id: String,
        pos: { type: Number, default: 0, required: true },
        eatclub: { type: Number, default: 0, required: true },
        labourCosts: { type: Number, default: 0, required: true  },
        date: { type: Number, required: true},
        impact: { type: Boolean, default: false },
        createdAt: { type: String, default: new Date().getTime()  },
        updatedAt: { type: String, default: new Date().getTime()  },
        alive: { type: Boolean, default: true },
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

export default mongoose.model<IMetrics>("metrics", metricsSchema, 'metrics');