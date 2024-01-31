import type { WeightRepetition as WeightRepetitionType } from 'types';

import {
  IconButton,
  Grid,
  ListItem,
} from '@mui/material';
import { DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material';

import { useAppDispatch } from 'app/hooks';
import {
  removeRepetition,
  setRepetitionWeight,
  setRepetitionCount,
} from 'components/Routine/routineSlice';
import CountInput from 'components/CountInput/CountInput';
import WeightInput from 'components/WeightInput/WeightInput';

export interface WeightRepetitionProps {
  exerciseSetIndex: number;
  repetition: WeightRepetitionType;
  repetitionIndex: number;
}

export default function WeightRepetition(props: WeightRepetitionProps) {
  const {
    exerciseSetIndex,
    repetition,
    repetitionIndex,
  } = props;
  const {
    count,
    unit,
    weight,
  } = repetition;
  const dispatch = useAppDispatch();
  const weightStep = 5;
  const countStep = 1;

  function handleIncrementWeight() {
    dispatch(setRepetitionWeight({
      exerciseSetIndex,
      repetitionIndex,
      weight: weight + weightStep,
    }));
  }
  function handleDecrementWeight() {
    const decrementedWeight = weight - weightStep;
    dispatch(setRepetitionWeight({
      exerciseSetIndex,
      repetitionIndex,
      weight: (decrementedWeight < 0) ? 0 : decrementedWeight,
    }));
  }
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
         xs={5}
       >
         <WeightInput
           weight={weight}
           unit={unit}
           onIncrement={handleIncrementWeight}
           onDecrement={handleDecrementWeight}
         />
       </Grid>
       <Grid
         item
         xs={5}
       >
         <CountInput
           count={count}
           onIncrement={handleIncrementCount}
           onDecrement={handleDecrementCount}
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
