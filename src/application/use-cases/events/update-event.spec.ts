import { makeEvent } from '@test/factories/event.factory';
import { InMemoryEventsRepository } from '@test/repositories/in-memory.events.repository';

import { UpdateEvent } from './update-event';

import { NotFoundError } from '@/errors/not-found.error';

describe('Update event', () => {
  let eventsRepository: InMemoryEventsRepository;
  let updateEvent: UpdateEvent;

  beforeEach(() => {
    eventsRepository = new InMemoryEventsRepository();
    updateEvent = new UpdateEvent(eventsRepository);
  });

  it('should throw if event does not exist', async () => {
    await expect(
      updateEvent.execute({
        id: '1',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should update event', async () => {
    const event = makeEvent();
    await eventsRepository.create(event);

    await updateEvent.execute({
      id: event.id,
      name: 'new name',
    });

    const updatedEvent = await eventsRepository.findById(event.id);

    expect(updatedEvent.name).toEqual('new name');
  });
});
