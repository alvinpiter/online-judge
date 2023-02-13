import { map, zip } from 'lodash';
import { SortedSetPaginatedQueryBuilder } from 'src/modules/cache/sorted-set/sorted-set-paginated-query-builder';
import { SortedSetService } from 'src/modules/cache/sorted-set/sorted-set.service';
import { OffsetPaginationResult } from 'src/modules/pagination/offset-pagination.interface';
import { OffsetPaginationService } from 'src/modules/pagination/offset-pagination.service';
import {
  EntityIdentifierMapper,
  EntityScoreCalculator,
  SortedEntitiesPaginationParameter,
  SortedEntity,
} from './interfaces';

export class EntitySorterService<Entity, ScoringSchema> {
  constructor(
    private readonly sortedSetService: SortedSetService,
    private readonly entityIdentifierMapper: EntityIdentifierMapper<Entity>,
    private readonly entityScoreCalculator: EntityScoreCalculator<
      Entity,
      ScoringSchema
    >,
    private readonly offsetPaginationService: OffsetPaginationService,
  ) {}

  async getPaginatedSortedEntites(
    sortedSetKey: string,
    parameters: SortedEntitiesPaginationParameter<Entity>,
  ): Promise<OffsetPaginationResult<SortedEntity<Entity, ScoringSchema>>> {
    const qb = new SortedSetPaginatedQueryBuilder(
      this.sortedSetService,
      sortedSetKey,
    );

    // TODO: How to test this condition?
    if (parameters.entities?.length > 0) {
      const memberIdentifiers = await this.entityIdentifierMapper.toIdentifiers(
        parameters.entities,
      );
      memberIdentifiers.forEach((identifier) => qb.addMemberFilter(identifier));
    }

    // TODO: Test this as well
    qb.setOrder(parameters.order);

    const { data: rawResults, meta } =
      await this.offsetPaginationService.paginate(qb, {
        offset: parameters.offset,
        limit: parameters.limit,
      });

    const entities = await this.entityIdentifierMapper.fromIdentifiers(
      map(rawResults, 'member'),
    );

    const results: SortedEntity<Entity, ScoringSchema>[] = await Promise.all(
      zip(rawResults, entities).map(async ([rawResult, entity]) => ({
        entity,
        rank: rawResult.rank,
        numericScore: rawResult.score,
        schematicScore: await this.entityScoreCalculator.getSchematicScore(
          rawResult.score,
        ),
      })),
    );

    return {
      data: results,
      meta,
    };
  }

  async updateEntityScore(sortedSetKey: string, entity: Entity) {
    const identifiers = await this.entityIdentifierMapper.toIdentifiers([
      entity,
    ]);
    const numericScore = await this.entityScoreCalculator.getNumericScore(
      entity,
    );

    await this.sortedSetService.upsertMemberScore(
      sortedSetKey,
      identifiers[0],
      numericScore,
    );
  }
}
