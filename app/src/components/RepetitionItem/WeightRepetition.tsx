import type { WeightRepetition as WeightRepetitionType } from 'types';

import { Grid } from '@mui/material';

import CountInput from 'components/CountInput/CountInput';
import WeightInput from 'components/WeightInput/WeightInput';

export interface WeightRepetitionProps {
  repetition: WeightRepetitionType;
}

export default function WeightRepetition(props: WeightRepetitionProps) {
  const {
    repetition,
  } = props;
  const {
    weight,
    count,
    unit: weightUnit,
  } = repetition;

  function handleIncrementWeight() {
  }
  function handleDecrementWeight() {
  }

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
        xs={5}
      >
        <WeightInput
          value={weight}
          onIncrement={handleIncrementWeight}
          onDecrement={handleDecrementWeight}
          weightUnit={weightUnit}
        />
      </Grid>
      <Grid
        item
        xs={5}
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
