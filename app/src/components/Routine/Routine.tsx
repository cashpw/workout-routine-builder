import React, { useState } from 'react';
import Select, { ActionMeta, OnChangeValue } from 'react-select';
import { useTranslation } from 'react-i18next';

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
  selectExercises,
  selectName,
} from './routineSlice';
import styles from './Routine.module.css';
import exercisesById from 'exercises/byId';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const colorOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

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
      <span>[DEBUG] Exercises: {exercises.join(", ")}</span>
      <br></br>
      <br></br>
      <br></br>
      <span>Name: {name}</span>
      <ul
        className={styles.routine}
      >
        {exercises.map((id, index) => {
          return (
            <li
              key={index}
              >
              {t(exercisesById[id].name)}
            </li>
          )})}
      </ul>
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
      <button
        aria-label="Add exercise"
        onClick={() => dispatch(addExercise(selectedExercise))}
      >
        Add exercise
      </button>
    </>
  );
}
