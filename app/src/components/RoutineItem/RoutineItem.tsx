import type { ExerciseSet } from 'types';

import { useTranslation } from 'react-i18next';
import {
  Stack,
  Button,
} from '@mui/material';

import RepetitionList from 'components/RepetitionList/RepetitionList';
import exercisesById from 'exercises/byId';

export interface RoutineItemProps {
  exerciseSet: ExerciseSet;
  handleRemoveExercise: () => void;
}

export default function RoutineItem(props: RoutineItemProps) {
  const {
    handleRemoveExercise,
    exerciseSet,
  } = props;
  const {
    exerciseId,
    repetitions,
  } = exerciseSet;
  const { t } = useTranslation();
  const exerciseName = t(exercisesById[exerciseId].name);

  return (
    <Stack>
      <span>{exerciseName}</span>
      <Button
        variant="outlined"
        aria-label="delete"
        onClick={handleRemoveExercise}
      >
        Delete exercise
      </Button>
      <RepetitionList
        repetitions={repetitions}
      />
    </Stack>
  );
}
