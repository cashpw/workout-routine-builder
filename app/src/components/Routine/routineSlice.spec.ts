import { Exercise } from 'exercises/exercise';
import {
  barbellCurl,
  barbellBenchPress,
  barbellHipThrust,
} from 'exercises/exercises';

import routineReducer, {
  RoutineState,
  addExercise,
} from './routineSlice';

describe('routine reducer', () => {
  const initialState: RoutineState = {
    exercises: [],
    name: "",
  };

  it('should handle initial state', () => {
    expect(routineReducer(undefined, { type: 'unknown' })).toEqual({
      exercises: [],
      name: "",
    });
  });

  it('should handle adding an exercise', () => {
    const actual = routineReducer(initialState, addExercise(barbellCurl));

    expect(actual.exercises).toEqual([barbellCurl]);
  });

  it('should handle adding more than one exercise', () => {
    let actual = routineReducer(initialState, addExercise(barbellCurl));
    actual = routineReducer(actual, addExercise(barbellHipThrust));
    actual = routineReducer(actual, addExercise(barbellBenchPress));

    expect(actual.exercises).toEqual([
      barbellCurl,
      barbellHipThrust,
      barbellBenchPress,
    ]);
  });
});
