import { Localization } from 'data/exercise';

export type ExerciseId = number;
export type ExerciseName = string;

export interface Exercise {
  // A unique identifier for the entire Exercise
  id: ExerciseId;

  // A unique identifier for i18n
  name: ExerciseName;
}
