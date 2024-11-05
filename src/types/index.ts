export interface Credentials {
  clientId: string;
  clientSecret: string;
  organizationId: string;
  accountId: string;
}

export interface Course {
  id: string;
  title: string;
  progress: number;
  skills: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  courses: Course[];
  completionPercentage: number;
}

export interface SkillProgress {
  name: string;
  level: number;
  coursesContributing: string[];
}

export interface LearningPathState {
  selectedPathId: string | null;
  learningPaths: LearningPath[];
  setSelectedPathId: (id: string | null) => void;
  setLearningPaths: (paths: LearningPath[]) => void;
}