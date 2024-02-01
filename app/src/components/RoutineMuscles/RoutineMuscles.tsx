import { useTranslation } from 'react-i18next';

import { MuscleType } from 'types.d';
import { selectTargetMuscles } from 'components/Routine/routineSlice';
import { useAppSelector } from 'app/hooks';

export default function RoutineMuscles() {
  const targetMuscles = useAppSelector(selectTargetMuscles);
  const { t } = useTranslation();

  return (
    <>
      Target muscles:
      <ul>
        {targetMuscles.map((muscleType, index) => (
          <li
            key={index}
          >
            {t(`muscleType${MuscleType[muscleType]}`)}
          </li>
        ))}
      </ul>
    </>
  )
}
