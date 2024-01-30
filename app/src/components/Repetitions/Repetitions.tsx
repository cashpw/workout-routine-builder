import type { Repetition as RepetitionType } from 'types';

import {
  List,
} from '@mui/material';

import Repetition from 'components/Repetition/Repetition';

export interface RepetitionsProps {
  repetitions: RepetitionType[];
}

export default function Repetitions(props: RepetitionsProps) {
  const {
    repetitions,
  } = props;

  return (
    <List>
      {repetitions.map((repetition, index) => (
        <Repetition
          key={index}
          repetition={repetition}
        />
      ))}
    </List>
  );
}
