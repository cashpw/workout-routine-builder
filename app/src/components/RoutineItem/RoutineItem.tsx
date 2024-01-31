import type { ExerciseSet } from 'types';

import { useTranslation } from 'react-i18next';
import {
  Grid,
  IconButton,
} from '@mui/material';
import { DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material';

import RepetitionList from 'components/RepetitionList/RepetitionList';
import ExerciseSetSummary from 'components/ExerciseSetSummary/ExerciseSetSummary';
import exercisesById from 'exercises/byId';

export interface RoutineItemProps {
  exerciseSet: ExerciseSet;
  exerciseSetIndex: number;
  handleRemoveExercise: () => void;
}

export default function RoutineItem(props: RoutineItemProps) {
  const {
    handleRemoveExercise,
    exerciseSet,
    exerciseSetIndex,
  } = props;
  const {
    exerciseId,
    repetitions,
  } = exerciseSet;
  const { t } = useTranslation();
  const exerciseName = t(exercisesById[exerciseId].name);

  return (
    <Grid
      container
    >
      <Grid
        container
        item
      >
        <Grid
          item
          xs={10}
        >
          {exerciseName}
          <ExerciseSetSummary
            exerciseSet={exerciseSet}
          />
        </Grid>
        <Grid
          item
          xs={2}
        >
          <IconButton
            aria-label="delete"
            onClick={handleRemoveExercise}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        container
        item
      >
        <RepetitionList
          exerciseSetIndex={exerciseSetIndex}
          repetitions={repetitions}
        />
      </Grid>
    </Grid>
  );
}
