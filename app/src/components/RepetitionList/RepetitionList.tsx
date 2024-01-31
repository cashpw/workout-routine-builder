import type { Repetition as RepetitionType } from 'types';

import {
  Button,
  Stack,
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
    <Stack>
      {repetitions.map((repetition, index) => (
        <RepetitionItem
          key={index}
          repetition={repetition}
        />
      ))}
      <Button
        variant="outlined"
      >
        Add repetition
      </Button>
    </Stack>
  );
}
