import { makeInova } from '@test/factories/inova.factory';
import {
  InMemoryEventsRepository,
  InMemoryInovasRepository,
} from '@test/repositories';

import { CreateEvent } from './create-event';

import { NotFoundError } from '@/errors/not-found.error';

describe('Create Event', () => {
  let eventsRepository: InMemoryEventsRepository;
  let inovasRepository: InMemoryInovasRepository;
  let createEvent: CreateEvent;

  beforeEach(() => {
    eventsRepository = new InMemoryEventsRepository();
    inovasRepository = new InMemoryInovasRepository();

    createEvent = new CreateEvent(eventsRepository, inovasRepository);
  });

  it('should be defined', async () => {
    expect(createEvent).toBeDefined();
  });

  it('should throw if inova does not exist', async () => {
    await expect(
      createEvent.execute({
        inovaId: 'inova-id',
        name: 'any_name',
        type: 'any_type',
        date: '2021-01-01',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should be able to create a new Theme', async () => {
    const inova = makeInova();
    await inovasRepository.create(inova);

    const { event } = await createEvent.execute({
      inovaId: inova.id,
      name: 'any_name',
      type: 'any_type',
      date: '2021-01-01',
    });

    expect(event).toBeDefined();
    expect(event.name).toBe('any_name');
    expect(event.inovaId).toBe(inova.id);
    expect(event.type).toBe('any_type');
    expect(event.date).toEqual(new Date('2021-01-01'));
  });
});
