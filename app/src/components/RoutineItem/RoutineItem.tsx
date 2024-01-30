import type { ExerciseSet } from 'types';

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import exercisesById from 'exercises/byId';

export interface RoutineItemProps {
  exerciseSet: ExerciseSet;
  handleRemoveExercise: () => void;
}

export default function RoutineItem(props: RoutineItemProps) {
  const {
    handleRemoveExercise,
    exerciseSet,
  } = props;
  const {
    exerciseId,
  } = exerciseSet;
  const { t } = useTranslation();

  return (
    <ListItem
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
        primary={t(exercisesById[exerciseId].name)}
      >
      </ListItemText>
    </ListItem>
  );
}
