import type { ExerciseSet } from 'types';

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import Repetitions from 'components/Repetitions/Repetitions';
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
    repetitions,
  } = exerciseSet;
  const { t } = useTranslation();
  const exerciseName = t(exercisesById[exerciseId].name);

  return (
    <ListItem
      divider
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
        primary={exerciseName}
      >
      </ListItemText>
      <Repetitions
        repetitions={repetitions}
      />
    </ListItem>
  );
}
