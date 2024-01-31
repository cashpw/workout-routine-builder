import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'app/hooks';
import {
  addCountRepetition,
  addWeightRepetition,
} from 'components/Routine/routineSlice';
import SplitButton from 'components/SplitButton/SplitButton';

export interface AddRepetitionButtonProps {
  exerciseSetIndex: number;
}

export default function AddRepetitionButton(props: AddRepetitionButtonProps) {
  const { t } = useTranslation();
  const {
    exerciseSetIndex,
  } = props;
  const dispatch = useAppDispatch();

  return (
    <SplitButton
      options={[
        {
          label: t('addCountRepetitionLabel'),
          handler: () => dispatch(addCountRepetition(exerciseSetIndex)),
        },
        {
          label: t('addWeightRepetitionLabel'),
          handler: () => dispatch(addWeightRepetition(exerciseSetIndex)),
        }
      ]}
    />
  );
}
