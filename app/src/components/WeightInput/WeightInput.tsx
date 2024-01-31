import { useTranslation } from 'react-i18next';
import {
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  AddBox as AddBoxIcon,
  IndeterminateCheckBox as MinusSquareIcon,
} from '@mui/icons-material';

import { getWeightAbbreviationLabel } from 'utils';
import { WeightUnit } from 'types.d';

export interface WeightInputProps {
  weight: number;
  onIncrement: () => void;
  onDecrement: () => void;
  unit: WeightUnit;
}

export default function WeightInput(props: WeightInputProps) {
  const {
    weight,
    onIncrement,
    onDecrement,
    unit,
  } = props;
  const { t } = useTranslation();

  const unitAbbreviation = t(getWeightAbbreviationLabel(unit));
  const inputWidth: number = (() => {
    const baseWidth = 3;
    const digitWidth = 4;
    const endAdornmentWidth = unitAbbreviation.length;

    return baseWidth + digitWidth + endAdornmentWidth;
  })();

  return (
    <>
      <IconButton
        onClick={onDecrement}
      >
        <MinusSquareIcon />
      </IconButton>
      <TextField
        variant="outlined"
        label={t('weightLabel')}
        value={weight}
        size="small"
        InputProps={{
          endAdornment: <InputAdornment position="end">{unitAbbreviation}</InputAdornment>
        }}
        sx={{
          width: `${inputWidth}ch`,
        }}
      />
      <IconButton
        onClick={onIncrement}
      >
        <AddBoxIcon />
      </IconButton>
    </>
  );
}
