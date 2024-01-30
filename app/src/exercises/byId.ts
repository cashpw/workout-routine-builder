import type {
  Exercise,
  ExerciseId,
} from 'types';
import exercisesAsList from './asList';

const exercisesById = exercisesAsList.reduce((acc: {[key: ExerciseId]: Exercise}, exercise) => {
  acc[exercise.id] = exercise;

  return acc
}, {});

export default exercisesById;
