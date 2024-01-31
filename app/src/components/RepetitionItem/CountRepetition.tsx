import type { CountRepetition as CountRepetitionType } from 'types';

import { Grid } from '@mui/material';

import CountInput from 'components/CountInput/CountInput';

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

  function handleIncrementCount() {
  }
  function handleDecrementCount() {
  }

  return (
    <Grid
      container
      item
    >
      <Grid
        item
        xs={10}
      >
        <CountInput
          value={count}
          onIncrement={handleIncrementCount}
          onDecrement={handleDecrementCount}
        />
      </Grid>
      <Grid
        item
      >
        delete
      </Grid>
    </Grid>
  );
}
