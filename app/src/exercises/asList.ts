import type { Exercise } from 'types';
import {
  RepetitionType,
  RepetitionTypeStrings,
} from 'types.d';

import exercises from './exercises.json';

const exerciseList: Exercise[] = exercises.all.map(({
  id,
  name,
  repetitionTypes,
}) => ({
  id,
  name,
  repetitionTypes: repetitionTypes.map(key => RepetitionType[key as RepetitionTypeStrings]),
}));

export default exerciseList;
