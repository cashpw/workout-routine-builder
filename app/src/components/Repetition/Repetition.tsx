import type { Repetition as RepetitionType } from 'types';

import {
  ListItem,
} from '@mui/material';

export interface RepetitionProps {
  repetition: RepetitionType;
}

export default function Repetition(props: RepetitionProps) {
  const {
    repetition,
  } = props;

  return (
    <ListItem
      divider
    >
      {repetition.toString()}
    </ListItem>
  );
}
