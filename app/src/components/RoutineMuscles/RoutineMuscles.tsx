import { selectTargetMuscles } from 'components/Routine/routineSlice';
import { useAppSelector } from 'app/hooks';

export default function RoutineMuscles() {
  const targetMuscles = useAppSelector(selectTargetMuscles);
  return (
    <>
      Target muscles:
      <ul>
        {targetMuscles.map((muscle, index) => (
          <li
            key={index}
          >
            {muscle}
          </li>
        ))}
      </ul>
    </>
  )
}
