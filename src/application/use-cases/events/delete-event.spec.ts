import { makeEvent } from '@test/factories/event.factory';
import { InMemoryEventsRepository } from '@test/repositories/in-memory.events.repository';

import { DeleteEvent } from './delete-event';

import { NotFoundError } from '@/errors/not-found.error';

describe('Delete event', () => {
  let eventsRepository: InMemoryEventsRepository;
  let deleteEvent: DeleteEvent;

  beforeEach(() => {
    eventsRepository = new InMemoryEventsRepository();
    deleteEvent = new DeleteEvent(eventsRepository);
  });

  it('should throw if event not found', async () => {
    await expect(deleteEvent.execute({ id: '1' })).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should delete given event', async () => {
    const event = makeEvent();
    await eventsRepository.create(event);

    expect(await eventsRepository.findById(event.id)).toEqual(event);

    await deleteEvent.execute({ id: event.id });

    const events = await eventsRepository.findAll();
    expect(events).toEqual([]);
  });
});
