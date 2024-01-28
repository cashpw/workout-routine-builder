import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  barbellBenchPress,
} from 'exercises/exercises';
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

export function Routine() {
  const { t } = useTranslation();
  const exercises = useAppSelector(selectExercises);
  const name = useAppSelector(selectName);
  const dispatch = useAppDispatch();

  return (
    <>
      <span>{name}</span>
      <ul
        className={styles.routine}
      >
        {exercises.map(exercise => (
          <li>{exercise.name}: {t(exercise.name)}</li>
        ))}
      </ul>
      <button
        aria-label="Add exercise"
        onClick={() => dispatch(addExercise(barbellBenchPress))}
      >
        Add exercise
      </button>
    </>
  );
}
