import {
  AttendancesRepository,
  UsersRepository,
} from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface GetUserAttendancesRequest {
  userId: string;
}

export class GetUserAttendances {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly attendancesRepository: AttendancesRepository,
  ) {}

  async execute({ userId }: GetUserAttendancesRequest) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundError(`User with id ${userId} not found`);
    }

    const attendances = await this.attendancesRepository.findByUserId(userId);

    return {
      attendances,
    };
  }
}
