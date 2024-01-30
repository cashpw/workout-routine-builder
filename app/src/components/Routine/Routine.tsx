import React, { useState } from 'react';
import Select, { ActionMeta, OnChangeValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  ExerciseOption,
  getExerciseOptions,
} from 'exercises/options';
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

  const options = getExerciseOptions(t);
  const defaultOption = options[0];
  const exercises = useAppSelector(selectExercises);
  const name = useAppSelector(selectName);
  const dispatch = useAppDispatch();

  const [selectedExercise, setSelectedExercise] = useState(defaultOption.value);

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
      <Select
        defaultValue={null}
        onChange={(value: OnChangeValue<ExerciseOption, false>,
                  actionMeta: ActionMeta<ExerciseOption>) => {
                    if (value) {
                      setSelectedExercise(value.value);
                    }
                  }}
        options={options}
        name="exercises"
      />
      <Button
        aria-label="Add exercise"
        variant="contained"
        onClick={() => dispatch(addExercise(selectedExercise))}
      >
        Add exercise
      </Button>
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
