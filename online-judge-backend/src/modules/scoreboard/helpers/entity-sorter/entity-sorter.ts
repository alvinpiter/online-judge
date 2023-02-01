import { SortedSetService } from 'src/modules/cache/sorted-set.service';
import { EntityIdentifierMapper, EntityScoreCalculator } from './interfaces';

export class EntitySorterService<Entity, ScoringSchema> {
  constructor(
    private readonly sortedSetService: SortedSetService,
    private readonly entityIdentifierMapper: EntityIdentifierMapper<Entity>,
    private readonly entityScoreCalculator: EntityScoreCalculator<
      Entity,
      ScoringSchema
    >,
  ) {}

  async updateEntityScore(entity: Entity) {
    const identifier = await this.entityIdentifierMapper.toIdentifier(entity);
    const numericScore = await this.entityScoreCalculator.getNumericScore(
      entity,
    );

    await this.sortedSetService.upsertMemberScore(identifier, numericScore);
  }
}
