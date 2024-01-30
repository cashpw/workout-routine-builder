import type { Exercise } from 'types';

import {
  barbellCurl,
  barbellBenchPress,
  barbellHipThrust,
} from 'exercises/forTests';

import routineReducer, {
  RoutineState,
  addExerciseSet,
} from './routineSlice';

describe('routine reducer', () => {
  const initialState: RoutineState = {
    exerciseSets: [],
    name: "",
  };

  it('should handle initial state', () => {
    expect(routineReducer(undefined, { type: 'unknown' })).toEqual({
      exercises: [],
      name: "",
    });
  });

  it('should handle adding an exercise', () => {
    const actual = routineReducer(initialState, addExerciseSet(barbellCurl.id));

    expect(actual.exerciseSets).toEqual([
      {
        exerciseId: barbellCurl.id,
        repetitions: [],
      }
    ]);
  });

  it('should handle adding more than one exercise', () => {
    let actual = routineReducer(initialState, addExerciseSet(barbellCurl.id));
    actual = routineReducer(actual, addExerciseSet(barbellHipThrust.id));
    actual = routineReducer(actual, addExerciseSet(barbellBenchPress.id));

    expect(actual.exerciseSets).toEqual([
      { exerciseId: barbellCurl.id, repetitions: [] },
      { exerciseId: barbellHipThrust.id, repetitions: [] },
      { exerciseId: barbellBenchPress.id, repetitions: [] },
    ]);
  });
});
