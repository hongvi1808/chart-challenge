import { Router } from "express";
import 'reflect-metadata';
import Container from "typedi";
import { AdminService } from "./service";
import { errorResponse, successResponse } from "../../models/common/response";

const router = Router();
const service = Container.get(AdminService);
router.get('/compare', async (req, res) => {
    const { fromDate, toDate, previousDate } = req.query;
    try {
        const result = await service.compareMetricByDate({
            fromDate: Number(fromDate), toDate: Number(toDate),
            previousDate: Number(previousDate)
        });
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, error);
    }
});
router.post('/', async (req, res) => {
    const { pos, eatclub, labourCosts, date, impact } = req.body;
    try {
        const result = await service.createMetrics({ pos, eatclub, labourCosts, date, impact });
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, error);
    }
});
router.get('/', async (req, res) => {
    const { page, limit } = req.query;
    try {
        const result = await service.getMetrics({ page, limit });
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, error);
    }
});
router.put('/:id', async (req, res) => {
    const { pos, eatclub, labourCosts, date, impact } = req.body;
    const { id } = req.params;
    try {
        const result = await service.updateMetric({ id, pos, eatclub, labourCosts, date, impact });
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, error);
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await service.deleteMetric(id);
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, error);
    }
});
export const metricsRouter = router
