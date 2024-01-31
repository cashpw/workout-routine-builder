import type {
  ExerciseId,
  ExerciseSet,
} from 'types';

import {
  RepetitionType,
  WeightUnit,
} from 'types.d';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import exercisesById from 'exercises/byId';

export interface RoutineState {
  name: string;
  exerciseSets: ExerciseSet[];
}

const exerciseIds = Object.keys(exercisesById).map(id => +id);
const initialState: RoutineState = {
  name: "",
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
    addCountRepetition: (state, action: PayloadAction<number>) => {
      const exerciseSetsIndex = action.payload;
      if (!isValidIndex(exerciseSetsIndex, state.exerciseSets)) {
        // TODO: Handle error
        return;
      }

      state.exerciseSets[exerciseSetsIndex].repetitions.push({
        type: RepetitionType.COUNT,
        count: 0,
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
        weight: 0,
        count: 0,
      })
    },
    setRepetitionCount: (state, action: PayloadAction<SetRepetitionCountAction>) => {
      const {
        exerciseSetIndex,
        repetitionIndex,
        count,
      } = action.payload;
      if (count < 0) {
        return;
      }

      if (!isValidIndex(exerciseSetIndex, state.exerciseSets) || !isValidIndex(repetitionIndex, state.exerciseSets[exerciseSetIndex].repetitions)) {
        // TODO: Handle error
        return;
      }

      if (!('count' in state.exerciseSets[exerciseSetIndex].repetitions[repetitionIndex])) {
        // TODO: Handle error
        return;
      }

      state.exerciseSets[exerciseSetIndex].repetitions[repetitionIndex].count = count;
    },
    setRepetitionWeight: (state, action: PayloadAction<SetRepetitionWeightAction>) => {
      const {
        exerciseSetIndex,
        repetitionIndex,
        weight,
      } = action.payload;
      if (weight < 0) {
        return;
      }

      if (!isValidIndex(exerciseSetIndex, state.exerciseSets) || !isValidIndex(repetitionIndex, state.exerciseSets[exerciseSetIndex].repetitions)) {
        // TODO: Handle error
        return;
      }

      if (!('weight' in state.exerciseSets[exerciseSetIndex].repetitions[repetitionIndex])) {
        // TODO: Handle error
        return;
      }

      state.exerciseSets[exerciseSetIndex].repetitions[repetitionIndex].weight = weight;
    },


  },
});

export const selectExerciseSets = (state: RootState) => state.routine.exerciseSets;
export const selectName = (state: RootState) => state.routine.name;
export const {
  addExerciseSet,
  addCountRepetition,
  addWeightRepetition,
  removeExerciseSet,
  setRepetitionCount,
  setRepetitionWeight,
} = routineSlice.actions;
export default routineSlice.reducer;
