import { Response } from 'express';

export type PaginationMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T | null;
    meta?: PaginationMeta | null;
};

export function successResponse<T>(
    res: Response,
    statusCode: number,
    message: string,
    data: T
) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        meta: null
    });
}

export function paginatedResponse<T>(
    res: Response,
    statusCode: number,
    message: string,
    data: T[],
    meta: PaginationMeta
) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        meta
    });
}

export function errorResponse(
    res: Response,
    statusCode: number,
    message: string
) {
    return res.status(statusCode).json({
        success: false,
        message,
        data: null,
        meta: null
    });
}