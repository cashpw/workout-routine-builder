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
  addExerciseSet,
  removeExerciseSet,
  selectExerciseSets,
  selectName,
} from './routineSlice';
// import styles from './Routine.module.css';
import exercisesAsList from 'exercises/asList';
import RoutineItem from 'components/RoutineItem/RoutineItem';
import AddExerciseDialog from 'components/AddExerciseDialog/AddExerciseDialog';

export default function Routine() {
  const { t } = useTranslation();
  const [addExerciseDialogOpen, setAddExerciseDialogOpen] = useState(false);
  const exerciseSets = useAppSelector(selectExerciseSets);
  const name = useAppSelector(selectName);
  const dispatch = useAppDispatch();

  return (
    <>
      <span>Name: {name}</span>
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
            dispatch(addExerciseSet(id));
          }
          setAddExerciseDialogOpen(false);
        }}
      />
   </>
  );
}
