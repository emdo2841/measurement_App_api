export type PaginationQuery = {
    page?: unknown;
    limit?: unknown;
};
export declare function getPagination(query: PaginationQuery): {
    page: number;
    limit: number;
    skip: number;
};
export declare function paginationMeta(page: number, limit: number, total: number): {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};
//# sourceMappingURL=pagination.d.ts.map