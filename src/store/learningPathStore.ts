import { create } from 'zustand';
import type { LearningPathState } from '../types';

export const useLearningPathStore = create<LearningPathState>((set) => ({
  selectedPathId: null,
  learningPaths: [],
  setSelectedPathId: (id) => set({ selectedPathId: id }),
  setLearningPaths: (paths) => set({ learningPaths: paths }),
}));