import { OffsetPaginationParameter } from 'src/modules/pagination/offset-pagination.interface';

export interface EntityIdentifierMapper<Entity> {
  toIdentifier(entity: Entity): Promise<string>;
  fromIdentifiers(identifiers: string[]): Promise<Entity[]>;
}

export interface EntityScoreCalculator<Entity, ScoringSchema> {
  getNumericScore(entity: Entity): Promise<number>;
  getSchematicScore(numericScore: number | null): Promise<ScoringSchema | null>;
}

export interface SortedEntitiesPaginationParameter<Entity>
  extends OffsetPaginationParameter {
  entity?: Entity;
}

export interface SortedEntity<Entity, ScoringSchema> {
  entity: Entity;
  rank: number | null;
  numericScore: number | null;
  schematicScore: ScoringSchema | null;
}
