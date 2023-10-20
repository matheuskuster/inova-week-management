import { Invite } from '@/application/entities';

export class InviteViewModel {
  public static toHTTP(invite: Invite) {
    return {
      userId: invite.userId,
      projectId: invite.projectId,
      acceptedAt: invite.acceptedAt,
      createdAt: invite.createdAt,
    };
  }
}
