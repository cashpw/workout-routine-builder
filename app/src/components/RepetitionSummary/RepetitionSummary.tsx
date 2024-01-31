import type {
  Repetition,
  CountRepetition as CountRepetitionType,
  WeightRepetition as WeightRepetitionType,
} from 'types';

import { RepetitionType } from 'types.d';

import WeightRepetitionSummary from './WeightRepetitionSummary';
import CountRepetitionSummary from './CountRepetitionSummary';

export interface RepetitionSummaryProps {
  repetition: Repetition;
}

export default function RepetitionSummary(props: RepetitionSummaryProps) {
  const { repetition } = props;

  switch (repetition.type) {
    case RepetitionType.WEIGHT:
     return (
        <WeightRepetitionSummary
          repetition={repetition as WeightRepetitionType}
        />
      );
    case RepetitionType.COUNT:
      return (
        <CountRepetitionSummary
          repetition={repetition as CountRepetitionType}
        />
      );
  }
  return (<></>);
}
