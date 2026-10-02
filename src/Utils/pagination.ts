export type PaginationQuery = { page?: unknown; limit?: unknown }

export function getPagination(query: PaginationQuery) {
  const rawPage = Number(query.page)
  const rawLimit = Number(query.limit)
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1
  const limit = Number.isInteger(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 100) : 10
  return { page, limit, skip: (page - 1) * limit }
}

export function paginationMeta(page: number, limit: number, total: number) {
  const totalPages = Math.max(1, Math.ceil(total / limit))
  return { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 }
}
