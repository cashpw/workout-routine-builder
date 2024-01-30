import type {
  ExerciseId,
  ExerciseSet,
} from 'types';

import { RepetitionType } from 'types.d';

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
      if (exerciseSetsIndex < 0 || exerciseSetsIndex >= state.exerciseSets.length) {
        // TODO: Handle error
        return;
      }

      state.exerciseSets.splice(exerciseSetsIndex, 1);
    },
    addCountRepetition: (state, action: PayloadAction<number>) => {
      const exerciseSetsIndex = action.payload;
      if (exerciseSetsIndex < 0 || exerciseSetsIndex >= state.exerciseSets.length) {
        // TODO: Handle error
        return;
      }

      state.exerciseSets[exerciseSetsIndex].repetitions.push({
        type: RepetitionType.COUNT,
        count: 0,
      })
    },
  },
});

export const selectExerciseSets = (state: RootState) => state.routine.exerciseSets;
export const selectName = (state: RootState) => state.routine.name;
export const {
  addExerciseSet,
  addCountRepetition,
  removeExerciseSet,
} = routineSlice.actions;
export default routineSlice.reducer;
