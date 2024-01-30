import type { Repetition } from 'types';

import {
  ListItem,
} from '@mui/material';

export interface RepetitionItemProps {
  repetition: Repetition;
}

export default function RepetitionItem(props: RepetitionItemProps) {
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
