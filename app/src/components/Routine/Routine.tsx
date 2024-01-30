import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

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
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => dispatch(removeExercise(index))}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={t(exercisesById[id].name)}
              >
              </ListItemText>
            </ListItem>
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
