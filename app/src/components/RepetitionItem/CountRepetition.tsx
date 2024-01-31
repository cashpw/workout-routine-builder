import type { CountRepetition as CountRepetitionType } from 'types';

export interface CountRepetitionProps {
  repetition: CountRepetitionType;
}

export default function CountRepetition(props: CountRepetitionProps) {
  const {
    repetition,
  } = props;

  return (
    <>
      {repetition.toString()}
    </>
  );
}
