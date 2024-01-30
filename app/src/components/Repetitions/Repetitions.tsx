import type { Repetition } from 'types';

import React from 'react';
import {
  List,
  ListItem,
} from '@mui/material';

export interface RepetitionsProps {
  repetitions: Repetition[];
}

export default function Repetitions(props: RepetitionsProps) {
  const {
    repetitions,
  } = props;

  return (
    <List>
      {repetitions.map((repetition, index) => (
        <ListItem
          key={index}
          divider={true}
        >
          {repetition.toString()}
        </ListItem>
      ))}
    </List>
  );
}
