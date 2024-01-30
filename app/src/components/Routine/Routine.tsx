import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  List,
} from '@mui/material';

import {
  useAppSelector,
  useAppDispatch,
} from 'app/hooks';
import {
  addExercise,
  removeExercise,
  selectExercises,
  selectName,
} from './routineSlice';
// import styles from './Routine.module.css';
import exercisesById from 'exercises/byId';
import exercisesAsList from 'exercises/asList';
import RoutineItem from 'components/RoutineItem/RoutineItem';
import AddExerciseDialog from 'components/AddExerciseDialog/AddExerciseDialog';

export default function Routine() {
  const { t } = useTranslation();
  const [addExerciseDialogOpen, setAddExerciseDialogOpen] = useState(false);
  const exercises = useAppSelector(selectExercises);
  const name = useAppSelector(selectName);
  const dispatch = useAppDispatch();

  return (
    <>
      <span>[DEBUG] Exercises: {exercises.join(', ')}</span>
      <br></br>
      <br></br>
      <br></br>
      <span>Name: {name}</span>
      <List>
        {exercises.map((id, index) => {
          return (
            <RoutineItem
              key={index.toString()}
              handleRemoveExercise={() => dispatch(removeExercise(index))}
              name={t(exercisesById[id].name)}
            />
          )})}
      </List>
      <Button
        variant="contained"
        onClick={() => {setAddExerciseDialogOpen(true)}}
      >
        {t('addExerciseCallToAction')}
      </Button>
      <AddExerciseDialog
        open={addExerciseDialogOpen}
        exercises={exercisesAsList}
        onClose={(id: number|undefined) => {
          if (id !== undefined) {
            dispatch(addExercise(id));
          }
          setAddExerciseDialogOpen(false);
        }}
      />
   </>
  );
}
