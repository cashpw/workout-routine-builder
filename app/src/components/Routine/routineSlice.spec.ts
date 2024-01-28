import { Exercise } from 'exercises/exercise';
import {
  barbellCurl,
  barbellBenchPress,
  barbellHipThrust,
} from 'exercises/forTests';

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
    const actual = routineReducer(initialState, addExercise(barbellCurl.id));

    expect(actual.exercises).toEqual([barbellCurl.id]);
  });

  it('should handle adding more than one exercise', () => {
    let actual = routineReducer(initialState, addExercise(barbellCurl.id));
    actual = routineReducer(actual, addExercise(barbellHipThrust.id));
    actual = routineReducer(actual, addExercise(barbellBenchPress.id));

    expect(actual.exercises).toEqual([
      barbellCurl.id,
      barbellHipThrust.id,
      barbellBenchPress.id,
    ]);
  });
});
