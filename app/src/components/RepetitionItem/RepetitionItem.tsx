import type {
  Repetition,
  CountRepetition as CountRepetitionType,
  WeightRepetition as WeightRepetitionType,
} from 'types';


import {
  useAppSelector,
} from 'app/hooks';
import {
  selectRepetition,
} from 'components/Routine/routineSlice';
import { RepetitionType } from 'types.d';

import WeightRepetition from './WeightRepetition';
import CountRepetition from './CountRepetition';

export interface RepetitionItemProps {
  exerciseSetIndex: number;
  repetitionIndex: number;
}

export default function RepetitionItem(props: RepetitionItemProps) {
  const {
    exerciseSetIndex,
    repetitionIndex,
  } = props;
  const repetition = useAppSelector(selectRepetition(exerciseSetIndex, repetitionIndex));
  if (!repetition) {
    return (<></>);
  }

  switch ((repetition as Repetition).type) {
    case RepetitionType.WEIGHT:
      return (
        <WeightRepetition
          repetition={repetition as WeightRepetitionType}
        />
      );
    case RepetitionType.COUNT:
      return (
        <CountRepetition
          repetition={repetition as CountRepetitionType}
        />
      );
  }
  return (<></>);
}
