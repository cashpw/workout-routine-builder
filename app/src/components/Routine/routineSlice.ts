import type {
  ExerciseId,
  Routine,
  ExerciseSet,
  WeightRepetition,
} from 'types';

import {
  RepetitionType,
  WeightUnit,
} from 'types.d';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import exercisesById from 'exercises/byId';

export interface RoutineState {
  exerciseSets: ExerciseSet[];
}

export const MINIMUM_WEIGHT = 0;
export const MINIMUM_COUNT = 1;

const exerciseIds = Object.keys(exercisesById).map(id => +id);
const initialState: RoutineState = {
  exerciseSets: [],
};

function isValidIndex(index: number, arr: Array<any>) {
  return index >= 0 && index < arr.length;
}

export interface SetRepetitionCountAction {
  exerciseSetIndex: number;
  repetitionIndex: number;
  count: number;
}

export interface SetRepetitionWeightAction {
  exerciseSetIndex: number;
  repetitionIndex: number;
  weight: number;
}

export interface RemoveRepetitionAction {
  exerciseSetIndex: number;
  repetitionIndex: number;
}

export const routineSlice = createSlice({
  name: 'routine',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addExerciseSet: (state, action: PayloadAction<ExerciseId>) => {
      const exerciseId = action.payload;
      if (!exerciseIds.includes(exerciseId)) {
        return;
      }

      state.exerciseSets.push({
        exerciseId: exerciseId,
        repetitions: [],
      });
    },
    removeExerciseSet: (state, action: PayloadAction<number>) => {
      const exerciseSetsIndex = action.payload;
      if (!isValidIndex(exerciseSetsIndex, state.exerciseSets)) {
        // TODO: Handle error
        return;
      }

      state.exerciseSets.splice(exerciseSetsIndex, 1);
    },
    removeRepetition: (state, action: PayloadAction<RemoveRepetitionAction>) => {
      const {
        exerciseSetIndex,
        repetitionIndex,
      } = action.payload;

      if (!isValidIndex(exerciseSetIndex, state.exerciseSets) || !isValidIndex(repetitionIndex, state.exerciseSets[exerciseSetIndex].repetitions)) {
        // TODO: Handle error
        return;
      }

      state.exerciseSets[exerciseSetIndex].repetitions.splice(repetitionIndex, 1);
    },
    addCountRepetition: (state, action: PayloadAction<number>) => {
      const exerciseSetsIndex = action.payload;
      if (!isValidIndex(exerciseSetsIndex, state.exerciseSets)) {
        // TODO: Handle error
        return;
      }

      state.exerciseSets[exerciseSetsIndex].repetitions.push({
        type: RepetitionType.COUNT,
        count: MINIMUM_COUNT,
      })
    },
    addWeightRepetition: (state, action: PayloadAction<number>) => {
      const exerciseSetsIndex = action.payload;
      if (!isValidIndex(exerciseSetsIndex, state.exerciseSets)) {
        // TODO: Handle error
        return;
      }

      state.exerciseSets[exerciseSetsIndex].repetitions.push({
        type: RepetitionType.WEIGHT,
        unit: WeightUnit.POUNDS,
        weight: MINIMUM_WEIGHT,
        count: MINIMUM_COUNT,
      })
    },
    setRepetitionCount: (state, action: PayloadAction<SetRepetitionCountAction>) => {
      const {
        exerciseSetIndex,
        repetitionIndex,
        count,
      } = action.payload;
      if (count < MINIMUM_COUNT) {
        return;
      }

      if (!isValidIndex(exerciseSetIndex, state.exerciseSets) || !isValidIndex(repetitionIndex, state.exerciseSets[exerciseSetIndex].repetitions)) {
        // TODO: Handle error
        return;
      }

      const validRepetitionTypes = [
        RepetitionType.COUNT,
        RepetitionType.WEIGHT,
      ];
      if (!validRepetitionTypes.includes(state.exerciseSets[exerciseSetIndex].repetitions[repetitionIndex].type)) {
        // TODO: Handle error
        return;
      }

      (state.exerciseSets[exerciseSetIndex].repetitions[repetitionIndex] as {count: number}).count = count;
    },
    setRepetitionWeight: (state, action: PayloadAction<SetRepetitionWeightAction>) => {
      const {
        exerciseSetIndex,
        repetitionIndex,
        weight,
      } = action.payload;
      if (weight < MINIMUM_WEIGHT) {
        return;
      }

      if (!isValidIndex(exerciseSetIndex, state.exerciseSets) || !isValidIndex(repetitionIndex, state.exerciseSets[exerciseSetIndex].repetitions)) {
        // TODO: Handle error
        return;
      }

      if (state.exerciseSets[exerciseSetIndex].repetitions[repetitionIndex].type !== RepetitionType.WEIGHT) {
        // TODO: Handle error
        return;
      }

      (state.exerciseSets[exerciseSetIndex].repetitions[repetitionIndex] as WeightRepetition).weight = weight;
    },
  },
});

function getTargetMuscles(routine: Routine) {
  const muscleMap =  routine.exerciseSets.reduce((
    acc: {[key: string]: boolean},
    { exerciseId }
  ) => {
    exercisesById[exerciseId].targetMuscles.forEach((muscle) => {
      acc[muscle] = true;
    });

    return acc;
  }, {});

  return Object.keys(muscleMap);
}
export const selectTargetMuscles = (state: RootState) => {
  return getTargetMuscles(state.routine);
};
export const selectExerciseSets = (state: RootState) => state.routine.exerciseSets;
export const selectExerciseSet = (index: number) => (state: RootState) => {
  if (!isValidIndex(index, state.routine.exerciseSets)) {
    return undefined;
  }

  return state.routine.exerciseSets[index];
};
export const selectRepetition = (exerciseSetIndex: number, repetitionIndex: number) => (state: RootState) => {
  if (!isValidIndex(exerciseSetIndex, state.routine.exerciseSets) || !isValidIndex(repetitionIndex, state.routine.exerciseSets[exerciseSetIndex].repetitions)) {
    return undefined;
  }

  return state.routine.exerciseSets[exerciseSetIndex].repetitions[repetitionIndex];
};
export const {
  addExerciseSet,
  addCountRepetition,
  addWeightRepetition,
  removeExerciseSet,
  removeRepetition,
  setRepetitionCount,
  setRepetitionWeight,
} = routineSlice.actions;
export default routineSlice.reducer;
