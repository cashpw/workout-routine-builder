import type {
  ExerciseId,
} from 'types';

import {
  RepetitionType,
  WeightUnit,
} from 'types.d';
import {
  barbellCurl,
  barbellBenchPress,
  barbellHipThrust,
} from 'exercises/forTests';

import routineReducer, {
  RoutineState,
  addExerciseSet,
  addCountRepetition,
  addWeightRepetition,
  setRepetitionCount,
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

  describe('addExerciseSet', () => {
    it('should add an exercise set', () => {
      const state = routineReducer(initialState, addExerciseSet(barbellCurl.id));

      expect(state.exerciseSets).toEqual([{
        exerciseId: barbellCurl.id,
        repetitions: [],
      }]);
    });

   it('should not add an exercise set for an unknown ID', () => {
      let state = routineReducer(initialState, addExerciseSet(-1));
      state = routineReducer(initialState, addExerciseSet(100000));

      expect(state.exerciseSets).toEqual([]);
    });

    it('should add more than one exercise set', () => {
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
  });

  describe('removeExerciseSet', () => {
    it('should remove an exercise set', () => {
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

    it('should not remove an exercise set when index < 0', () => {
      let state = addExerciseSets(initialState, [
        barbellCurl.id,
        barbellHipThrust.id,
        barbellBenchPress.id,
      ]);
      state = routineReducer(state, removeExerciseSet(-1));

      expect(state.exerciseSets).toEqual([
        { exerciseId: barbellCurl.id, repetitions: [] },
        { exerciseId: barbellHipThrust.id, repetitions: [] },
        { exerciseId: barbellBenchPress.id, repetitions: [] },
      ]);
    });

    it('should not remove an exercise set when index > max', () => {
      let state = addExerciseSets(initialState, [
        barbellCurl.id,
        barbellHipThrust.id,
        barbellBenchPress.id,
      ]);
      state = routineReducer(state, removeExerciseSet(4));

      expect(state.exerciseSets).toEqual([
        { exerciseId: barbellCurl.id, repetitions: [] },
        { exerciseId: barbellHipThrust.id, repetitions: [] },
        { exerciseId: barbellBenchPress.id, repetitions: [] },
      ]);
    });

    it('should remove more than one exercise set', () => {
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

  describe('addCountRepetition', () => {
    it('should add a count repetition', () => {
      let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
      state = routineReducer(state, addCountRepetition(0));

      expect(state.exerciseSets).toEqual([
        {
          exerciseId: barbellCurl.id,
          repetitions: [
            {
              type: RepetitionType.COUNT,
              count: 0,
            },
          ],
        },
      ]);
    });

   it('should add a count repetition to the specified exerciseSet index', () => {
      let state = addExerciseSets(initialState, [
        barbellCurl.id,
        barbellHipThrust.id,
        barbellBenchPress.id,
      ]);
      state = routineReducer(state, addCountRepetition(1));

      expect(state.exerciseSets).toEqual([
        {
          exerciseId: barbellCurl.id,
          repetitions: [],
        },
        {
          exerciseId: barbellHipThrust.id,
          repetitions: [
            {
              type: RepetitionType.COUNT,
              count: 0,
            },
          ],
        },
        {
          exerciseId: barbellBenchPress.id,
          repetitions: [],
        },
      ]);
    });

    it('should not add a count repetition when index < 0', () => {
      let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
      state = routineReducer(state, addCountRepetition(-1));

      expect(state.exerciseSets).toEqual([
        {
          exerciseId: barbellCurl.id,
          repetitions: [],
        },
      ]);
    });

    it('should not add a count repetition when index > max', () => {
      let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
      state = routineReducer(state, addCountRepetition(1));

      expect(state.exerciseSets).toEqual([
        {
          exerciseId: barbellCurl.id,
          repetitions: [],
        },
      ]);
    });
  });

  describe('addWeightRepetition', () => {
    it('should add a weight repetition', () => {
      let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
      state = routineReducer(state, addWeightRepetition(0));

      expect(state.exerciseSets).toEqual([
        {
          exerciseId: barbellCurl.id,
          repetitions: [
            {
              type: RepetitionType.WEIGHT,
              unit: WeightUnit.POUNDS,
              weight: 0,
              count: 0,
            },
          ],
        },
      ]);
    });

   it('should add a weight repetition to the specified exerciseSet index', () => {
      let state = addExerciseSets(initialState, [
        barbellCurl.id,
        barbellHipThrust.id,
        barbellBenchPress.id,
      ]);
      state = routineReducer(state, addWeightRepetition(1));

      expect(state.exerciseSets).toEqual([
        {
          exerciseId: barbellCurl.id,
          repetitions: [],
        },
        {
          exerciseId: barbellHipThrust.id,
          repetitions: [
            {
              type: RepetitionType.WEIGHT,
              unit: WeightUnit.POUNDS,
              weight: 0,
              count: 0,
            },
          ],
        },
        {
          exerciseId: barbellBenchPress.id,
          repetitions: [],
        },
      ]);
    });

    it('should not add a weight repetition when index < 0', () => {
      let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
      state = routineReducer(state, addWeightRepetition(-1));

      expect(state.exerciseSets).toEqual([
        {
          exerciseId: barbellCurl.id,
          repetitions: [],
        },
      ]);
    });

    it('should not add a weight repetition when index > max', () => {
      let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
      state = routineReducer(state, addWeightRepetition(1));

      expect(state.exerciseSets).toEqual([
        {
          exerciseId: barbellCurl.id,
          repetitions: [],
        },
      ]);
    });
  });

  describe('setRepetitionCount', () => {
    it('should set the count', () => {
      let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
      state = routineReducer(state, addCountRepetition(0));
      state = routineReducer(state, setRepetitionCount({
        exerciseSetIndex: 0,
        repetitionIndex: 0,
        count: 5,
      }));

      expect(state.exerciseSets).toEqual([
        {
          exerciseId: barbellCurl.id,
          repetitions: [
            {
              type: RepetitionType.COUNT,
              count: 5,
            },
          ],
        },
      ]);
    });

    it('should not set the count when new count is <0', () => {
      let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
      state = routineReducer(state, addCountRepetition(0));
      state = routineReducer(state, setRepetitionCount({
        exerciseSetIndex: 0,
        repetitionIndex: 0,
        count: 5
      }));
      state = routineReducer(state, setRepetitionCount({
        exerciseSetIndex: 0,
        repetitionIndex: 0,
        count: -1,
      }));

      expect(state.exerciseSets).toEqual([
        {
          exerciseId: barbellCurl.id,
          repetitions: [
            {
              type: RepetitionType.COUNT,
              count: 5,
            },
          ],
        },
      ]);
    });

    it('should not set the count when exerciseSetIndex is <0', () => {
      let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
      state = routineReducer(state, addCountRepetition(0));
      state = routineReducer(state, setRepetitionCount({
        exerciseSetIndex: -1,
        repetitionIndex: 0,
        count: 5,
      }));

      expect(state.exerciseSets).toEqual([
        {
          exerciseId: barbellCurl.id,
          repetitions: [
            {
              type: RepetitionType.COUNT,
              count: 0,
            },
          ],
        },
      ]);
    });

    it('should not set the count when exerciseSetIndex is >max', () => {
      let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
      state = routineReducer(state, addCountRepetition(0));
      state = routineReducer(state, setRepetitionCount({
        exerciseSetIndex: 1,
        repetitionIndex: 0,
        count: 5,
      }));

      expect(state.exerciseSets).toEqual([
        {
          exerciseId: barbellCurl.id,
          repetitions: [
            {
              type: RepetitionType.COUNT,
              count: 0,
            },
          ],
        },
      ]);
    });

    it('should not set the count when repetitionIndex is <0', () => {
      let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
      state = routineReducer(state, addCountRepetition(0));
      state = routineReducer(state, setRepetitionCount({
        exerciseSetIndex: 0,
        repetitionIndex: -1,
        count: 5,
      }));

      expect(state.exerciseSets).toEqual([
        {
          exerciseId: barbellCurl.id,
          repetitions: [
            {
              type: RepetitionType.COUNT,
              count: 0,
            },
          ],
        },
      ]);
    });

    it('should not set the count when repetitionIndex is >max', () => {
      let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
      state = routineReducer(state, addCountRepetition(0));
      state = routineReducer(state, setRepetitionCount({
        exerciseSetIndex: 0,
        repetitionIndex: 1,
        count: 5,
      }));

      expect(state.exerciseSets).toEqual([
        {
          exerciseId: barbellCurl.id,
          repetitions: [
            {
              type: RepetitionType.COUNT,
              count: 0,
            },
          ],
        },
      ]);
    });
  });
});
