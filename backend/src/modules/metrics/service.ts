import { Service } from "typedi";
import models from "../../models/mongoose";
import * as bcrypt from 'bcrypt';
import { v7 as uuidv7 } from 'uuid';
import { generateToken } from "../../utils/authUtil";
import { model } from "mongoose";
import { forceToInfoPagition } from "../../utils/func";
import { PaginationItemModel } from "../../models/common/pagination";

@Service()
export class AdminService {
    public async compareMetricByDate({ fromDate, toDate,previousDate }: {
        fromDate: number, toDate: number,previousDate: number,
    }) {
        const metricDoc = await models.Metrics.find({ alive: true, date: { $gte: fromDate, $lte: toDate } })
        const metricPreviousDoc = await models.Metrics.find({ alive: true, date: { $gte: previousDate, $lte: fromDate } })
       
        return {curMetric: metricDoc, preMetric: metricPreviousDoc};
    }
    public async createMetrics({ pos, eatclub, labourCosts, date, impact }: {
        pos: number, eatclub: number, labourCosts: number, date: number, impact: boolean,
    }) {
        const metric = new models.Metrics({
            _id: uuidv7(),
            pos, eatclub, labourCosts, date, impact,
        })
        const res = await metric.save()
        return res;
    }
    public async getMetrics(data: { page: any, limit: any }) {
        const { skip, page, take } = forceToInfoPagition(data.page, data.limit)
        const metricDoc = await models.Metrics.find({ alive: true }).skip(skip).limit(take)
        const total = await models.Metrics.countDocuments({ alive: true });
        return new PaginationItemModel(metricDoc, total, page, take);
    }
    public async updateMetric({ id, pos, eatclub, labourCosts, date, impact }: {
        id: string,
        pos: number, eatclub: number, labourCosts: number, date: number, impact: boolean,
    }) {
        const res = await models.Metrics.findByIdAndUpdate(id, {
            pos, eatclub, labourCosts, date, impact,
            updatedAt: new Date().getTime()
        }, {new: true})

        return res;
    }
    public async    deleteMetric(id: string) {
        const res = await models.Metrics.findByIdAndUpdate(id, {
            alive: false,
            updatedAt: new Date().getTime()
        })

        return res;
    }
}