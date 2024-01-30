import React from 'react';
import {
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

export interface RoutineItemProps {
  name: string;
  key: string;
  handleRemoveExercise: () => void;
}

export default function RoutineItem(props: RoutineItemProps) {
  const {
    name,
    key,
    handleRemoveExercise,
  } = props;

  return (
    <ListItem
      key={key}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={handleRemoveExercise}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={name}
      >
      </ListItemText>
    </ListItem>
  );
}
