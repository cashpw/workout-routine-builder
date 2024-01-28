import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ExerciseId } from 'exercises/exercise';
import exercisesById from 'exercises/byId';

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
  },
});

export const selectExercises = (state: RootState) => state.routine.exercises;
export const selectName = (state: RootState) => state.routine.name;
export const { addExercise } = routineSlice.actions;
export default routineSlice.reducer;
