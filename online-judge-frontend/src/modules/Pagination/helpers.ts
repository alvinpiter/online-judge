import { OffsetPaginationMeta } from "./interfaces";

export function getNumberOfPages(meta: OffsetPaginationMeta) {
  const { limit, total } = meta;
  return Math.ceil(total / limit);
}
