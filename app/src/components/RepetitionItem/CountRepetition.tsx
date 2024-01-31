import type { CountRepetition as CountRepetitionType } from 'types';

import { Stack } from '@mui/material';

export interface CountRepetitionProps {
  repetition: CountRepetitionType;
}

export default function CountRepetition(props: CountRepetitionProps) {
  const {
    repetition,
  } = props;
  const {
    count,
  } = repetition;

  return (
    <Stack
      direction="row"
    >
      <span>Count: {count}</span>
    </Stack>
  );
}
