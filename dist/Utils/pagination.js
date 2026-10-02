"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = getPagination;
exports.paginationMeta = paginationMeta;
function getPagination(query) {
    const rawPage = Number(query.page);
    const rawLimit = Number(query.limit);
    const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
    const limit = Number.isInteger(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 100) : 10;
    return { page, limit, skip: (page - 1) * limit };
}
function paginationMeta(page, limit, total) {
    const totalPages = Math.max(1, Math.ceil(total / limit));
    return { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
}
//# sourceMappingURL=pagination.js.map