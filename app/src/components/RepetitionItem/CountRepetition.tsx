import type { CountRepetition as CountRepetitionType } from 'types';

import {
  IconButton,
  Grid,
  ListItem,
} from '@mui/material';
import { DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material';

import { useAppDispatch } from 'app/hooks';
import {
  removeRepetition,
  setRepetitionCount,
} from 'components/Routine/routineSlice';
import CountInput from 'components/CountInput/CountInput';

export interface CountRepetitionProps {
  exerciseSetIndex: number;
  repetition: CountRepetitionType;
  repetitionIndex: number;
}

export default function CountRepetition(props: CountRepetitionProps) {
  const {
    exerciseSetIndex,
    repetition,
    repetitionIndex,
  } = props;
  const { count } = repetition;
  const dispatch = useAppDispatch();
  const countStep = 1;

  function handleIncrementCount() {
    dispatch(setRepetitionCount({
      exerciseSetIndex,
      repetitionIndex,
      count: count + countStep,
    }));
  }
  function handleDecrementCount() {
    const decrementedCount = count - countStep;
    dispatch(setRepetitionCount({
      exerciseSetIndex,
      repetitionIndex,
      count: (decrementedCount < 0) ? 0 : decrementedCount,
    }));
  }
  function handleRemoveRepetition() {
    dispatch(removeRepetition({
      exerciseSetIndex,
      repetitionIndex,
    }));
  }

  return (
    <ListItem
      divider
      sx={{
        paddingTop: 2,
        paddingBottom: 2,
      }}
    >
      <Grid
        container
        item
      >
        <Grid
          item
          xs={10}
        >
          <CountInput
            count={count}
            onDecrement={handleDecrementCount}
            onIncrement={handleIncrementCount}
          />
        </Grid>
        <Grid
          item
        >
          <IconButton
            onClick={handleRemoveRepetition}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Grid>
      </Grid>
    </ListItem>
  );
}
