import type { Repetition as RepetitionType } from 'types';

import {
  Grid,
  List,
} from '@mui/material';

import RepetitionItem from 'components/RepetitionItem/RepetitionItem';
import AddRepetitionButton from 'components/AddRepetitionButton/AddRepetitionButton';

export interface RepetitionListProps {
  exerciseSetIndex: number;
  repetitions: RepetitionType[];
}

export default function RepetitionList(props: RepetitionListProps) {
  const {
    exerciseSetIndex,
    repetitions,
  } = props;

  return (
    <>
      <Grid
        item
        xs={12}
      >
        <List>
          {repetitions.map((repetition, index) => (
            <RepetitionItem
              key={index}
              exerciseSetIndex={exerciseSetIndex}
              repetitionIndex={index}
            />
          ))}
        </List>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <AddRepetitionButton
          exerciseSetIndex={exerciseSetIndex}
        />
      </Grid>
    </>
  );
}
