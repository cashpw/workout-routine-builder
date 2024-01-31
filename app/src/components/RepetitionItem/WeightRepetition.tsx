import type { WeightRepetition as WeightRepetitionType } from 'types';

export interface WeightRepetitionProps {
  repetition: WeightRepetitionType;
}

export default function WeightRepetition(props: WeightRepetitionProps) {
  const {
    repetition,
  } = props;

  return (
    <>
      {repetition.toString()}
    </>
  );
}
