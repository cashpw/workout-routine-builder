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
    const state = routineReducer(initialState, addExerciseSet(barbellCurl.id));

    expect(state.exerciseSets).toEqual([{
      exerciseId: barbellCurl.id,
      repetitions: [],
    }]);
  });

  it('should handle adding more than one exercise set', () => {
    const state = addExerciseSets(initialState, [
      barbellCurl.id,
      barbellHipThrust.id,
      barbellBenchPress.id,
    ]);

    expect(state.exerciseSets).toEqual([
      { exerciseId: barbellCurl.id, repetitions: [] },
      { exerciseId: barbellHipThrust.id, repetitions: [] },
      { exerciseId: barbellBenchPress.id, repetitions: [] },
    ]);
  });

  it('should handle removing an exercise set', () => {
    let state = addExerciseSets(initialState, [
      barbellCurl.id,
      barbellHipThrust.id,
      barbellBenchPress.id,
    ]);
    state = routineReducer(state, removeExerciseSet(1));

    expect(state.exerciseSets).toEqual([
      { exerciseId: barbellCurl.id, repetitions: [] },
      { exerciseId: barbellBenchPress.id, repetitions: [] },
    ]);
  });

  it('should handle removing more than one exercise set', () => {
    let state = addExerciseSets(initialState, [
      barbellCurl.id,
      barbellHipThrust.id,
      barbellBenchPress.id,
    ]);
    state = routineReducer(state, removeExerciseSet(1));
    state = routineReducer(state, removeExerciseSet(0));

    expect(state.exerciseSets).toEqual([
      { exerciseId: barbellBenchPress.id, repetitions: [] },
    ]);
  });
});
