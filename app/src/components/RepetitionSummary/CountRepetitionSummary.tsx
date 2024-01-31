import type { CountRepetition } from 'types';

export interface CountRepetitionSummaryProps {
  repetition: CountRepetition;
}

export default function CountRepetitionSummary(props: CountRepetitionSummaryProps) {
  const { repetition } = props;
  const { count } = repetition;

  return (
    <>
      {count}
    </>
  );
}
