import type { Exercise } from 'types';
import {
  RepetitionType,
  RepetitionTypeStrings,
} from 'types.d';

import exercises from 'data/exercises.json';

const exerciseList: Exercise[] = exercises.all.map(({
  id,
  name,
  primaryMuscles,
  repetitionTypes,
}) => ({
  id,
  name,
  primaryMuscles,
  repetitionTypes: repetitionTypes.map(key => RepetitionType[key as RepetitionTypeStrings]),
}));

export default exerciseList;
