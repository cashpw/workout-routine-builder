import type { Repetition as RepetitionType } from 'types';

import {
  List,
} from '@mui/material';

import RepetitionItem from 'components/RepetitionItem/RepetitionItem';

export interface RepetitionListProps {
  repetitions: RepetitionType[];
}

export default function RepetitionList(props: RepetitionListProps) {
  const {
    repetitions,
  } = props;

  return (
    <List>
      {repetitions.map((repetition, index) => (
        <RepetitionItem
          key={index}
          repetition={repetition}
        />
      ))}
    </List>
  );
}
