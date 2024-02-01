import exercises from 'data/exercises.json';

const muscleList: string[] = Object.keys(exercises.all.reduce((acc: {[key: string]: boolean}, { targetMuscles }) => {
  targetMuscles.forEach(muscle => {
    acc[muscle] = true;
  });

  return acc;
}, {}));

export default muscleList;
