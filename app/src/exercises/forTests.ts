import type { Exercise } from 'types';
import { MuscleType } from 'types.d';

export const barbellCurl: Exercise = {
  id: 1,
  name: 'barbellcurl',
  targetMuscles: [
    MuscleType.BICEP,
  ],
  repetitionTypes: [],
};

export const barbellBenchPress: Exercise = {
  id: 2,
  name: 'barbellbenchpress',
  targetMuscles: [
    MuscleType.CHEST,
  ],
  repetitionTypes: [],
};

export const barbellHipThrust: Exercise = {
  id: 3,
  name: 'barbellhipthrust',
  targetMuscles: [
    MuscleType.GLUTE,
  ],
  repetitionTypes: [],
};
