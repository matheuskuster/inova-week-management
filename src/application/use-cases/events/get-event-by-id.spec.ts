import { makeEvent } from '@test/factories/event.factory';
import { InMemoryEventsRepository } from '@test/repositories/in-memory.events.repository';

import { GetEventById } from './get-event-by-id';

import { NotFoundError } from '@/errors/not-found.error';

describe('Get Event By Id', () => {
  let eventsRepository: InMemoryEventsRepository;
  let getEventById: GetEventById;

  beforeEach(() => {
    eventsRepository = new InMemoryEventsRepository();
    getEventById = new GetEventById(eventsRepository);
  });

  it('should throw an error if event does not exist', async () => {
    await expect(getEventById.execute({ id: 'invalid-id' })).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should return the event if it exists', async () => {
    const event = makeEvent();
    await eventsRepository.create(event);

    const response = await getEventById.execute({ id: event.id });
    expect(response.event.id).toBe(event.id);
  });
});
