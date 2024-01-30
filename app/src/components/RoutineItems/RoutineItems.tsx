import type { ExerciseSet } from 'types';

import { List } from '@mui/material';
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
    <List>
      {exerciseSets.map((exerciseSet, index) => {
        return (
          <RoutineItem
            key={index.toString()}
            exerciseSet={exerciseSet}
            handleRemoveExercise={() => dispatch(removeExerciseSet(index))}
          />
        )})}
    </List>
  );
}
