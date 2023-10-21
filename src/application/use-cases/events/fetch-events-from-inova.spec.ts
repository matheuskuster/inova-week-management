import { makeEvent } from '@test/factories';
import { makeInova } from '@test/factories/inova.factory';
import {
  InMemoryEventsRepository,
  InMemoryInovasRepository,
} from '@test/repositories';

import { FetchEventsFromInova } from './fetch-events-from-inova';

import { NotFoundError } from '@/errors/not-found.error';

describe('Fetch Events from Inova', () => {
  let eventsRepository: InMemoryEventsRepository;
  let inovasRepository: InMemoryInovasRepository;
  let fetchEventsFromInova: FetchEventsFromInova;

  beforeEach(() => {
    eventsRepository = new InMemoryEventsRepository();
    inovasRepository = new InMemoryInovasRepository();

    fetchEventsFromInova = new FetchEventsFromInova(
      eventsRepository,
      inovasRepository,
    );
  });

  it('should be defined', async () => {
    expect(fetchEventsFromInova).toBeDefined();
  });

  it('should throw if inova was not found', async () => {
    const inovaId = 'inova-id';

    await expect(
      fetchEventsFromInova.execute({ inovaId }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should be able to return all projects approveds from an inova', async () => {
    const inovaInMemory = makeInova();
    const eventsInMemory = [
      makeEvent({ inovaId: inovaInMemory.id }),
      makeEvent({ inovaId: inovaInMemory.id }),
    ];

    await inovasRepository.create(inovaInMemory);
    await eventsRepository.create(eventsInMemory[0]);
    await eventsRepository.create(eventsInMemory[1]);

    const { events } = await fetchEventsFromInova.execute({
      inovaId: inovaInMemory.id,
    });

    expect(events).toHaveLength(2);
    expect(events[0].id).toBe(eventsInMemory[0].id);
    expect(events[0].name).toBe(eventsInMemory[0].name);
    expect(events[0].inovaId).toBe(inovaInMemory.id);
    expect(events[1].id).toBe(eventsInMemory[1].id);
    expect(events[1].name).toBe(eventsInMemory[1].name);
    expect(events[1].inovaId).toBe(inovaInMemory.id);
  });
});
