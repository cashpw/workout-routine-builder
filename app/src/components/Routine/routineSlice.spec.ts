import type {
  Exercise,
  ExerciseId,
} from 'types';

import {
  barbellCurl,
  barbellBenchPress,
  barbellHipThrust,
} from 'exercises/forTests';

import routineReducer, {
  RoutineState,
  addExerciseSet,
  removeExerciseSet,
} from './routineSlice';

describe('routine reducer', () => {
  const initialState: RoutineState = {
    exerciseSets: [],
    name: "",
  };

  function addExerciseSets(initialState: RoutineState, ids: ExerciseId[]): RoutineState {
    if (!ids.length) {
      return initialState
    }

    return ids.slice(1).reduce((state, id) => {
      return routineReducer(state, addExerciseSet(id));
    }, routineReducer(initialState, addExerciseSet(ids[0])));
  }

  it('should handle initial state', () => {
    expect(routineReducer(undefined, { type: 'unknown' })).toEqual({
      exerciseSets: [],
      name: "",
    });
  });

  it('should handle adding an exercise set', () => {
    const actual = routineReducer(initialState, addExerciseSet(barbellCurl.id));

    expect(actual.exerciseSets).toEqual([{
      exerciseId: barbellCurl.id,
      repetitions: [],
    }]);
  });

  it('should handle adding more than one exercise set', () => {
    const actual = addExerciseSets(initialState, [
      barbellCurl.id,
      barbellHipThrust.id,
      barbellBenchPress.id,
    ]);

    expect(actual.exerciseSets).toEqual([
      { exerciseId: barbellCurl.id, repetitions: [] },
      { exerciseId: barbellHipThrust.id, repetitions: [] },
      { exerciseId: barbellBenchPress.id, repetitions: [] },
    ]);
  });
});
