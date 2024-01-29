import type {
  TFunction,
} from 'i18next';

import {
  ExerciseId,
} from './exercise';
import exercises from './asList';

export type ExerciseOption = {
  readonly value: ExerciseId;
  readonly label: string;
}

export function getExerciseOptions(t: TFunction): ExerciseOption[] {
  return Object.values(exercises).map(exercise => ({
    value: exercise.id,
    label: t(exercise.name),
  }));
}
