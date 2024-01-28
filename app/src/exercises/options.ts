import type {
  TFunction,
} from 'i18next';
import {
  useTranslation,
} from 'react-i18next';

import {
  Exercise,
  ExerciseId,
} from './exercise';
import * as exercises from './exercises';

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
