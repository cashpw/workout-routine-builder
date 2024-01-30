import React from 'react';
import { useTranslation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
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

export function Routine() {
  const { t } = useTranslation();

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
      <List>
        {exercisesAsList.map((exercise, index) => (
          <ListItem
            disablePadding
            key={index}
          >
            <ListItemButton
              onClick={() => dispatch(addExercise(exercise.id))}
            >
              <ListItemText
                primary={t(exercise.name)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
