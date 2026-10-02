import { getCache, setCache } from './cache'

type ListName = 'clients' | 'orders' | 'measurements'

const versionKey = (list: ListName, userId: string) => `${list}:${userId}:version`

export async function getListCacheVersion(list: ListName, userId: string) {
  const cached = await getCache(versionKey(list, userId))
  const version = Number(cached)
  return Number.isInteger(version) && version > 0 ? version : 1
}

export async function bumpListCacheVersion(list: ListName, userId: string) {
  const current = await getListCacheVersion(list, userId)
  await setCache(versionKey(list, userId), current + 1, 60 * 60 * 24 * 365)
}

export async function paginatedListCacheKey(
  list: ListName,
  userId: string,
  values: Record<string, string | number | undefined>,
) {
  const version = await getListCacheVersion(list, userId)
  const query = Object.entries(values)
    .filter(([, value]) => value !== undefined)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}:${String(value).trim().toLowerCase()}`)
    .join(':')
  return `${list}:${userId}:v:${version}:${query}`
}
