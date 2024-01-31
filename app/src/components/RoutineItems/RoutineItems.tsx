import type { ExerciseSet } from 'types';

import { Stack } from '@mui/material';

import { removeExerciseSet } from 'components/Routine/routineSlice';
import RoutineItem from 'components/RoutineItem/RoutineItem';
import { useAppDispatch } from 'app/hooks';

export interface RoutineItemsProps {
  exerciseSets: ExerciseSet[];
}

export default function RoutineItems(props: RoutineItemsProps) {
  const {
    exerciseSets,
  } = props;
  const dispatch = useAppDispatch();

  return (
    <Stack>
      {exerciseSets.map((exerciseSet, index) => (
        <RoutineItem
          key={index.toString()}
          exerciseSet={exerciseSet}
          handleRemoveExercise={() => dispatch(removeExerciseSet(index))}
        />
      ))}
   </Stack>
  );
}
