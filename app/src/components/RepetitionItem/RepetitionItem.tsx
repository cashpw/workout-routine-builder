import type {
  Repetition,
  CountRepetition as CountRepetitionType,
  WeightRepetition as WeightRepetitionType,
} from 'types';

import { useAppSelector } from 'app/hooks';
import { selectRepetition } from 'components/Routine/routineSlice';
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
  const optionalRepetition = useAppSelector(selectRepetition(exerciseSetIndex, repetitionIndex));
  if (!optionalRepetition) {
    return (<></>)
  }
  const repetition = optionalRepetition as Repetition;

  switch ((repetition as Repetition).type) {
    case RepetitionType.WEIGHT:
     return (
        <WeightRepetition
          exerciseSetIndex={exerciseSetIndex}
          repetition={repetition as WeightRepetitionType}
          repetitionIndex={repetitionIndex}
        />
      );
    case RepetitionType.COUNT:
      return (
        <CountRepetition
          exerciseSetIndex={exerciseSetIndex}
          repetition={repetition as CountRepetitionType}
          repetitionIndex={repetitionIndex}
        />
      );
  }
  return (<></>);
}
