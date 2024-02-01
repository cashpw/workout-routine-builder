import type { Exercise } from 'types';
import {
  MuscleType,
  MuscleTypeStrings,
  RepetitionType,
  RepetitionTypeStrings,
} from 'types.d';

import exercises from 'data/exercises.json';

const exerciseList: Exercise[] = exercises.all.map(({
  id,
  name,
  targetMuscles,
  repetitionTypes,
}) => ({
  id,
  name,
  targetMuscles: targetMuscles.map(key => MuscleType[key as MuscleTypeStrings]),
  repetitionTypes: repetitionTypes.map(key => RepetitionType[key as RepetitionTypeStrings]),
}));

export default exerciseList;
