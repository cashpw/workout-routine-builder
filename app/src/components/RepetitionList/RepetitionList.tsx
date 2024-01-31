import type { Repetition as RepetitionType } from 'types';

import {
  Button,
  Grid,
} from '@mui/material';
import {
  useAppDispatch,
} from 'app/hooks';

import {
  addCountRepetition,
  addWeightRepetition,
} from 'components/Routine/routineSlice';
import RepetitionItem from 'components/RepetitionItem/RepetitionItem';

export interface RepetitionListProps {
  exerciseSetIndex: number;
  repetitions: RepetitionType[];
}

export default function RepetitionList(props: RepetitionListProps) {
  const {
    exerciseSetIndex,
    repetitions,
  } = props;
  const dispatch = useAppDispatch();

  return (
    <Grid
      container
    >
      {repetitions.map((repetition, index) => (
        <RepetitionItem
          key={index}
          repetition={repetition}
        />
      ))}
      <Grid
        item
        xs={12}
      >
        <Button
          variant="outlined"
          onClick={() => dispatch(addCountRepetition(exerciseSetIndex))}
        >
          Add count repetition
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch(addWeightRepetition(exerciseSetIndex))}
        >
          Add weight repetition
        </Button>
      </Grid>
    </Grid>
  );
}
