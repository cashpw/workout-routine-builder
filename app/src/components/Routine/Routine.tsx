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
