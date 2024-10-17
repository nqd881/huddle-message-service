import { Inject, Injectable } from "@nestjs/common";
import {
  AnyAggregate,
  IAggregateEventDispatcher,
  IRepository,
  Id,
} from "ddd-node";
// import { EVENT_STORE, IEventStore } from 'infrastructure/modules/event-store';

@Injectable()
export class InMemoryRepo<T extends AnyAggregate> implements IRepository<T> {
  protected records: T[] = [];

  // constructor(@Inject(EVENT_STORE) private eventStore: IEventStore) {}

  // eventDispatcher(): IAggregateEventDispatcher {
  //   return {
  //     dispatch: (event) => {
  //       this.eventStore.append(event);
  //     },
  //   };
  // }

  async save(instance: T): Promise<any> {
    const index = this.records.findIndex(
      (record) => record.id() === instance.id()
    );

    if (index < 0) this.records.push(instance);
    else this.records[index] = instance;
  }

  async id(id: Id): Promise<T | null> {
    return this.records.find((record) => record.id() === id) ?? null;
  }
}
