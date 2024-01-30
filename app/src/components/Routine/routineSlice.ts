import type {
  ExerciseId,
  ExerciseSet,
} from 'types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface RoutineState {
  name: string;
  exerciseSets: ExerciseSet[];
}

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
      state.exerciseSets.push({
        exerciseId: action.payload,
        repetitions: [],
      });
    },
    removeExerciseSet: (state, action: PayloadAction<number>) => {
      state.exerciseSets.splice(action.payload, 1);
    },
  },
});

export const selectExerciseSets = (state: RootState) => state.routine.exerciseSets;
export const selectName = (state: RootState) => state.routine.name;
export const {
  addExerciseSet,
  removeExerciseSet,
} = routineSlice.actions;
export default routineSlice.reducer;
