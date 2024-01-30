import type { ExerciseId } from 'types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface RoutineState {
  exercises: ExerciseId[];
  name: string;
}

const initialState: RoutineState = {
  name: "",
  exercises: [],
};

export const routineSlice = createSlice({
  name: 'routine',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addExercise: (state, action: PayloadAction<ExerciseId>) => {
      state.exercises.push(action.payload);
    },
    removeExercise: (state, action: PayloadAction<number>) => {
      state.exercises.splice(action.payload, 1);
    },
  },
});

export const selectExercises = (state: RootState) => state.routine.exercises;
export const selectName = (state: RootState) => state.routine.name;
export const {
  addExercise,
  removeExercise,
} = routineSlice.actions;
export default routineSlice.reducer;
