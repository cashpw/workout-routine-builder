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
  setRepetitionWeight,
  removeExerciseSet,
  removeRepetition,
  selectExerciseSets,
  selectExerciseSet,
  selectRepetition,
  MINIMUM_COUNT,
  MINIMUM_WEIGHT,
} from './routineSlice';

describe('routine reducer', () => {
  const initialState: RoutineState = {
    exerciseSets: [],
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
    });
  });

  describe('selectors', () => {
    describe('selectExerciseSet', () => {
      it('should return exercise set', () => {
        const routineState = addExerciseSets(initialState, [
          barbellCurl.id,
          barbellHipThrust.id,
          barbellBenchPress.id,
        ]);
        const rootState = {
          routine: {
            ...routineState,
          },
        };

        expect(selectExerciseSet(1)(rootState)).toEqual({
          exerciseId: barbellHipThrust.id,
          repetitions: [],
        });
      });

      it('should return undefined when index <0', () => {
        const routineState = addExerciseSets(initialState, [
          barbellCurl.id,
          barbellHipThrust.id,
          barbellBenchPress.id,
        ]);
        const rootState = {
          routine: {
            ...routineState,
          },
        };

        expect(selectExerciseSet(-1)(rootState)).toBeUndefined();
      });

     it('should return undefined when index > max', () => {
        const routineState = addExerciseSets(initialState, [
          barbellCurl.id,
          barbellHipThrust.id,
          barbellBenchPress.id,
        ]);
        const rootState = {
          routine: {
            ...routineState,
          },
        };

        expect(selectExerciseSet(3)(rootState)).toBeUndefined();
      });
    });

    describe('selectRepetition', () => {
      it('should return a repetition', () => {
        let routineState = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        routineState = routineReducer(routineState, addCountRepetition(0));
        const rootState = {
          routine: {
            ...routineState,
          },
        };

        expect(selectRepetition(/*exerciseSetIndex=*/0, /*repetitionIndex=*/0)(rootState)).toEqual({
          type: RepetitionType.COUNT,
          count: MINIMUM_COUNT,
        });
      });

      it('should return undefined when exerciseSetIndex < 0', () => {
        let routineState = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        routineState = routineReducer(routineState, addCountRepetition(0));
        const rootState = {
          routine: {
            ...routineState,
          },
        };

        expect(selectRepetition(/*exerciseSetIndex=*/-1, /*repetitionIndex=*/0)(rootState)).toBeUndefined();
      });

      it('should return undefined when exerciseSetIndex > max', () => {
        let routineState = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        routineState = routineReducer(routineState, addCountRepetition(0));
        const rootState = {
          routine: {
            ...routineState,
          },
        };

        expect(selectRepetition(/*exerciseSetIndex=*/1, /*repetitionIndex=*/0)(rootState)).toBeUndefined();
      });

     it('should return undefined when repetitionIndex < 0', () => {
        let routineState = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        routineState = routineReducer(routineState, addCountRepetition(0));
        const rootState = {
          routine: {
            ...routineState,
          },
        };

        expect(selectRepetition(/*exerciseSetIndex=*/0, /*repetitionIndex=*/-1)(rootState)).toBeUndefined();
      });

      it('should return undefined when repetitionIndex > max', () => {
        let routineState = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        routineState = routineReducer(routineState, addCountRepetition(0));
        const rootState = {
          routine: {
            ...routineState,
          },
        };

        expect(selectRepetition(/*exerciseSetIndex=*/0, /*repetitionIndex=*/1)(rootState)).toBeUndefined();
      });
    });

    describe('selectExerciseSets', () => {
      it('should return all exercise sets', () => {
        const routineState = addExerciseSets(initialState, [
          barbellCurl.id,
          barbellHipThrust.id,
          barbellBenchPress.id,
        ]);
        const rootState = {
          routine: {
            ...routineState,
          },
        };

        expect(selectExerciseSets(rootState)).toEqual([
          { exerciseId: barbellCurl.id, repetitions: [] },
          { exerciseId: barbellHipThrust.id, repetitions: [] },
          { exerciseId: barbellBenchPress.id, repetitions: [] },
        ]);
      });
    });
  });

  describe('reducers', () => {
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

    describe('removeRepetition', () => {
      it('should remove an exercise set', () => {
        let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        state = routineReducer(state, addCountRepetition(0));
        state = routineReducer(state, removeRepetition({
          exerciseSetIndex: 0,
          repetitionIndex: 0,
        }));

        expect(state.exerciseSets[0].repetitions).toStrictEqual([]);
      });

      it('should not remove an repetition set when exerciseSetIndex < 0', () => {
        let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        state = routineReducer(state, addCountRepetition(0));
        state = routineReducer(state, removeRepetition({
          exerciseSetIndex: -1,
          repetitionIndex: 0,
        }));

        expect(state.exerciseSets[0].repetitions.length).toEqual(1);
      });

      it('should not remove an repetition set when exerciseSetIndex > max', () => {
        let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        state = routineReducer(state, addCountRepetition(0));
        state = routineReducer(state, removeRepetition({
          exerciseSetIndex: 1,
          repetitionIndex: 0,
        }));

        expect(state.exerciseSets[0].repetitions.length).toEqual(1);
      });

      it('should not remove an repetition set when repetitionIndex < 0', () => {
        let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        state = routineReducer(state, addCountRepetition(0));
        state = routineReducer(state, removeRepetition({
          exerciseSetIndex: 0,
          repetitionIndex: -1,
        }));

        expect(state.exerciseSets[0].repetitions.length).toEqual(1);
      });


      it('should not remove an repetition set when repetitionIndex > max', () => {
        let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        state = routineReducer(state, addCountRepetition(0));
        state = routineReducer(state, removeRepetition({
          exerciseSetIndex: 0,
          repetitionIndex: 1,
        }));

        expect(state.exerciseSets[0].repetitions.length).toEqual(1);
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
                count: MINIMUM_COUNT,
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
                count: MINIMUM_COUNT,
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
                weight: MINIMUM_WEIGHT,
                count: MINIMUM_COUNT,
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
                weight: MINIMUM_WEIGHT,
                count: MINIMUM_COUNT,
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
      it('should set the count for a count repetition', () => {
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

      it('should set the count for a weight repetition', () => {
        let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        state = routineReducer(state, addWeightRepetition(0));
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
                type: RepetitionType.WEIGHT,
                unit: WeightUnit.POUNDS,
                weight: MINIMUM_WEIGHT,
                count: 5,
              },
            ],
          },
        ]);
      });

      it('should not set the count when new count is < MINIMUM_COUNT', () => {
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
          count: MINIMUM_COUNT - 1,
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

      it('should not set the count when exerciseSetIndex is < 0', () => {
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
                count: MINIMUM_COUNT,
              },
            ],
          },
        ]);
      });

      it('should not set the count when exerciseSetIndex is > max', () => {
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
                count: MINIMUM_COUNT,
              },
            ],
          },
        ]);
      });

      it('should not set the count when repetitionIndex is < 0', () => {
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
                count: MINIMUM_COUNT,
              },
            ],
          },
        ]);
      });

      it('should not set the count when repetitionIndex is > max', () => {
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
                count: MINIMUM_COUNT,
              },
            ],
          },
        ]);
      });
    });

    describe('setRepetitionWeight', () => {
      it('should set the weight for a weight repetition', () => {
        let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        state = routineReducer(state, addWeightRepetition(0));
        state = routineReducer(state, setRepetitionWeight({
          exerciseSetIndex: 0,
          repetitionIndex: 0,
          weight: 5,
        }));

        expect(state.exerciseSets).toEqual([
          {
            exerciseId: barbellCurl.id,
            repetitions: [
              {
                type: RepetitionType.WEIGHT,
                unit: WeightUnit.POUNDS,
                weight: 5,
                count: MINIMUM_COUNT,
              },
            ],
          },
        ]);
      });

      it('should not set the weight for a count repetition', () => {
        let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        state = routineReducer(state, addCountRepetition(0));
        state = routineReducer(state, setRepetitionWeight({
          exerciseSetIndex: 0,
          repetitionIndex: 0,
          weight: 5,
        }));

        expect(state.exerciseSets).toEqual([
          {
            exerciseId: barbellCurl.id,
            repetitions: [
              {
                type: RepetitionType.COUNT,
                count: MINIMUM_COUNT,
              },
            ],
          },
        ]);
      });

      it('should not set the weight when new weight is < MINIMUM_WEIGHT', () => {
        let state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        state = routineReducer(state, addWeightRepetition(0));
        const expectedState = routineReducer(state, setRepetitionWeight({
          exerciseSetIndex: 0,
          repetitionIndex: 0,
          weight: 5
        }));
        const actualState = routineReducer(expectedState, setRepetitionWeight({
          exerciseSetIndex: 0,
          repetitionIndex: 0,
          weight: MINIMUM_WEIGHT - 1,
        }));

        expect(expectedState).toEqual(actualState);
      });

      it('should not set the weight when exerciseSetIndex is < 0', () => {
        const state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        const expectedState = routineReducer(state, addWeightRepetition(0));
        const actualState = routineReducer(expectedState, setRepetitionWeight({
          exerciseSetIndex: -1,
          repetitionIndex: 0,
          weight: 5,
        }));

        expect(expectedState).toEqual(actualState);
      });

      it('should not set the weight when exerciseSetIndex is > max', () => {
        const state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        const expectedState = routineReducer(state, addWeightRepetition(0));
        const actualState = routineReducer(expectedState, setRepetitionWeight({
          exerciseSetIndex: 1,
          repetitionIndex: 0,
          weight: 5,
        }));

        expect(expectedState).toEqual(actualState);
      });

      it('should not set the weight when repetitionIndex is < 0', () => {
        const state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        const expectedState = routineReducer(state, addWeightRepetition(0));
        const actualState = routineReducer(expectedState, setRepetitionWeight({
          exerciseSetIndex: 0,
          repetitionIndex: -1,
          weight: 5,
        }));

        expect(expectedState).toEqual(actualState);
      });

      it('should not set the weight when repetitionIndex is > max', () => {
        const state = routineReducer(initialState, addExerciseSet(barbellCurl.id));
        const expectedState = routineReducer(state, addWeightRepetition(0));
        const actualState = routineReducer(expectedState, setRepetitionWeight({
          exerciseSetIndex: 0,
          repetitionIndex: 1,
          weight: 5,
        }));

        expect(expectedState).toEqual(actualState);
      });
    });
  });
});
