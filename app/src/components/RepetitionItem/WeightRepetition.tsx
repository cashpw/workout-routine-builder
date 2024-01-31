import type { WeightRepetition as WeightRepetitionType } from 'types';
import { useTranslation } from 'react-i18next';
import { WeightUnit } from 'types.d';

import { Stack } from '@mui/material';

export interface WeightRepetitionProps {
  repetition: WeightRepetitionType;
}

export default function WeightRepetition(props: WeightRepetitionProps) {
  const { t } = useTranslation();
  const {
    repetition,
  } = props;
  const {
    weight,
    count,
    unit: weightUnit,
  } = repetition;

  const weightUnitAbbreviation: string = (() => {
    switch (weightUnit) {
      case WeightUnit.KILOGRAMS:
        return t('kilogramsAbbreviation');
      case WeightUnit.POUNDS:
        return t('poundsAbbreviation');
    }

    // TODO Handle error case
    return ""
  })();

  return (
    <Stack
      direction="row"
    >
      <span>Weight: {weight} {weightUnitAbbreviation}</span>
      <span>Count: {count}</span>
    </Stack>
  );
}
