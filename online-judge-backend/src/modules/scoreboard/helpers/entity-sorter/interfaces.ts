import { OffsetPaginationParameter } from 'src/modules/pagination/offset-pagination.interface';

export interface EntityIdentifierMapper<Entity> {
  toIdentifiers(entities: Entity[]): Promise<string[]>;
  fromIdentifiers(identifiers: string[]): Promise<Entity[]>;
}

export interface EntityScoreCalculator<Entity, ScoringSchema> {
  getNumericScore(entity: Entity): Promise<number>;
  getSchematicScore(numericScore: number | null): Promise<ScoringSchema | null>;
}

export interface SortedEntitiesPaginationParameter<Entity>
  extends OffsetPaginationParameter {
  entities?: Entity[];
}

export interface SortedEntity<Entity, ScoringSchema> {
  entity: Entity;
  rank: number | null;
  numericScore: number | null;
  schematicScore: ScoringSchema | null;
}
