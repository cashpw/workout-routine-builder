import type {
  Repetition,
  CountRepetition as CountRepetitionType,
  WeightRepetition as WeightRepetitionType,
} from 'types';

import { RepetitionType } from 'types.d';

import WeightRepetition from './WeightRepetition';
import CountRepetition from './CountRepetition';

export interface RepetitionItemProps {
  repetition: Repetition;
}

export default function RepetitionItem(props: RepetitionItemProps) {
  const {
    repetition,
  } = props;

  switch (repetition.type) {
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
