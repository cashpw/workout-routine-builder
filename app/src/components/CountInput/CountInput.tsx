import {
  IconButton,
  TextField,
} from '@mui/material';
import {
  AddBox as AddBoxIcon,
  IndeterminateCheckBox as MinusSquareIcon,
} from '@mui/icons-material';

export interface CountInputProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function CountInput(props: CountInputProps) {
  const {
    value,
    onIncrement,
    onDecrement,
  } = props;

  const inputWidth: number = (() => {
    const baseWidth = 3;
    const digitWidth = 4;

    return baseWidth + digitWidth;
  })();

  return (
    <>
      <IconButton
        onClick={onDecrement}
      >
        <MinusSquareIcon />
      </IconButton>
      <TextField
        label="Count"
        value={value}
        size="small"
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
