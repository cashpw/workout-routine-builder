import type { Repetition as RepetitionType } from 'types';

import {
  Button,
  Stack,
} from '@mui/material';
import {
  useAppDispatch,
} from 'app/hooks';

import { addWeightRepetition } from 'components/Routine/routineSlice';
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
    <Stack>
      {repetitions.map((repetition, index) => (
        <RepetitionItem
          key={index}
          repetition={repetition}
        />
      ))}
      <Button
        variant="outlined"
        onClick={() => dispatch(addWeightRepetition(exerciseSetIndex))}
      >
        Add weight repetition
      </Button>
    </Stack>
  );
}
