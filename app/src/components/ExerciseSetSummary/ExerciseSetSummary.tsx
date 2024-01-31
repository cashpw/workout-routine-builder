import type { ExerciseSet } from 'types';

import RepetitionSummary from 'components/RepetitionSummary/RepetitionSummary';

export interface ExerciseSetSummaryProps {
  exerciseSet: ExerciseSet;
}

export default function ExerciseSetSummary(props: ExerciseSetSummaryProps) {
  const {
    exerciseSet,
  } = props;
  const {
    repetitions,
  } = exerciseSet;

  return (
    <ul>
      {repetitions.map((repetition, index) => (
        <li
          key={index}
        >
          <RepetitionSummary
            repetition={repetition}
          />
        </li>
      ))}
    </ul>
  );
}
