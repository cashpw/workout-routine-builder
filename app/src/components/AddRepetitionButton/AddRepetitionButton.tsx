import { useTranslation } from 'react-i18next';

import { RepetitionType } from 'types.d';
import {
  useAppDispatch,
  useAppSelector,
} from 'app/hooks';
import {
  addCountRepetition,
  addWeightRepetition,
  selectExerciseSet,
} from 'components/Routine/routineSlice';
import exercisesById from 'exercises/byId';
import SplitButton, { SplitButtonOption } from 'components/SplitButton/SplitButton';

export interface AddRepetitionButtonProps {
  exerciseSetIndex: number;
}

export default function AddRepetitionButton(props: AddRepetitionButtonProps) {
  const { t } = useTranslation();
  const {
    exerciseSetIndex,
  } = props;
  const exerciseSet = useAppSelector(selectExerciseSet(exerciseSetIndex));
  const dispatch = useAppDispatch();
  if (!exerciseSet) {
    // TODO: Handle error
    return (<></>);
  }
  const repetitionTypes = exercisesById[exerciseSet.exerciseId].repetitionTypes;
  const options: SplitButtonOption[] = [];

  const weightRepetitionOption = {
    label: t('addWeightRepetitionLabel'),
    handler: () => dispatch(addWeightRepetition(exerciseSetIndex)),
  };
  if (RepetitionType.WEIGHT in repetitionTypes) {
    options.push(weightRepetitionOption);
  }

  const countRepetitionOption = {
    label: t('addCountRepetitionLabel'),
    handler: () => dispatch(addCountRepetition(exerciseSetIndex)),
  };
  if (RepetitionType.COUNT in repetitionTypes) {
    options.push(countRepetitionOption);
  }

  return (
    <SplitButton
      options={options}
    />
  );
}
