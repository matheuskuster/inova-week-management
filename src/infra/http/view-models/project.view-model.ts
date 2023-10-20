import { Project } from '@/application/entities';

export class ProjectViewModel {
  public static toHTTP(project: Project) {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      approved: project.approved,
      leaderUserId: project.leaderUserId,
      themeId: project.themeId,
      inovaId: project.inovaId,
      stand: project.stand,
      presentationDay: project.presentationDay,
      reviewedAt: project.reviewedAt,
    };
  }
}
