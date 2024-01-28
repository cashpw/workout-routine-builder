import type {
  Exercise,
  ExerciseId,
} from './exercise';
import * as exercises from './exercises';

const exercisesById = Object.values(exercises).reduce((acc: {[key: ExerciseId]: Exercise}, exercise) => {
  acc[exercise.id] = exercise;

  return acc
}, {});

export default exercisesById;
