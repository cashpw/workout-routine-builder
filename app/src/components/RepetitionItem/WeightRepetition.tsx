import type { WeightRepetition as WeightRepetitionType } from 'types';

import { Grid } from '@mui/material';

import { useAppDispatch } from 'app/hooks';
import CountInput from 'components/CountInput/CountInput';
import WeightInput from 'components/WeightInput/WeightInput';
import {
  setRepetitionCount,
  setRepetitionWeight,
} from 'components/Routine/routineSlice';

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
  const dispatch = useAppDispatch();
  const weightStep = 5;
  const countStep = 1;

   function handleIncrementWeight() {
    dispatch(setRepetitionWeight({
      exerciseSetIndex: 0,
      repetitionIndex: 0,
      weight: weight + weightStep,
    }));
  }
  function handleDecrementWeight() {
    const decrementedWeight = weight - weightStep;
    dispatch(setRepetitionWeight({
      exerciseSetIndex: 0,
      repetitionIndex: 0,
      weight: (decrementedWeight < 0) ? 0 : decrementedWeight,
    }));
  }

 function handleIncrementCount() {
    dispatch(setRepetitionCount({
      exerciseSetIndex: 0,
      repetitionIndex: 0,
      count: count + countStep,
    }));
  }
  function handleDecrementCount() {
    const decrementedCount = count - countStep;
    dispatch(setRepetitionCount({
      exerciseSetIndex: 0,
      repetitionIndex: 0,
      count: (decrementedCount < 0) ? 0 : decrementedCount,
    }));
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
