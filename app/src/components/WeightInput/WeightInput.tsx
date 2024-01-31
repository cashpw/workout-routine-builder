import { useTranslation } from 'react-i18next';
import {
  IconButton,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import {
  AddBox as AddBoxIcon,
  IndeterminateCheckBox as MinusSquareIcon,
} from '@mui/icons-material';

import { WeightUnit } from 'types.d';

export interface WeightInputProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  weightUnit: WeightUnit;
}

export default function WeightInput(props: WeightInputProps) {
  const {
    value,
    onIncrement,
    onDecrement,
    weightUnit,
  } = props;
  const { t } = useTranslation();

  const translatedWeightUnitAbbreviation: string = (() => {
    switch (weightUnit) {
      case WeightUnit.KILOGRAMS:
        return t('kilogramsAbbreviation');
      case WeightUnit.POUNDS:
        return t('poundsAbbreviation');
    }

    // TODO Handle error case
    return ""
  })();
  const inputWidth: number = (() => {
    const baseWidth = 3;
    const digitWidth = 4;
    const endAdornmentWidth = translatedWeightUnitAbbreviation.length;

    return baseWidth + digitWidth + endAdornmentWidth;
  })();

  return (
    <>
      <IconButton
        onClick={onIncrement}
      >
        <AddBoxIcon />
      </IconButton>
      <OutlinedInput
        value={value}
        size="small"
        endAdornment={<InputAdornment position="end">{translatedWeightUnitAbbreviation}</InputAdornment>}
        sx={{
          width: `${inputWidth}ch`,
        }}
      />
      <IconButton
        onClick={onDecrement}
      >
        <MinusSquareIcon />
      </IconButton>
    </>
  );
}
