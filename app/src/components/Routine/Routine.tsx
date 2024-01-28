import React from 'react';

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
          <li>{exercise}</li>
        ))}
      </ul>
      <button
        aria-label="Add exercise"
        onClick={() => dispatch(addExercise("Foo"))}
      >
        Add exercise
      </button>
    </>
  );
}
