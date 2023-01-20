export function orderEntitiesById<T extends { id: number }>(
  targetOrder: number[],
  entities: Array<T>,
) {
  const posOfEntityWithId = new Map<number, number>();
  for (let i = 0; i < entities.length; i++) {
    posOfEntityWithId.set(entities[i].id, i);
  }

  return targetOrder.map((id) => entities[posOfEntityWithId.get(id)]) as T[];
}
