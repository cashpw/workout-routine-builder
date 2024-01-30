import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import {
  DialogContent,
  DialogTitle,
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import type { Exercise } from 'exercises/exercise';

export interface AddExerciseDialogProps {
  open: boolean;
  exercises: Exercise[];
  onClose: (id: number|undefined) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddExerciseDialog(props: AddExerciseDialogProps) {
  const {
    open,
    exercises,
    onClose,
  } = props;
  const { t } = useTranslation();

  function handleClose() {
    onClose(/*id=*/undefined);
  }

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      aria-labelledby="add-exercise-dialog-title"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle
     sx={{ m: 0, p: 2 }}
        id="add-exercise-dialog-title"
      >
        {t('addExerciseDialogTitle')}
      </DialogTitle>
      <IconButton
        aria-label="Close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <List>
        {exercises.map((exercise, index) => (
          <ListItem
            disablePadding
            key={index}
          >
            <ListItemButton
              onClick={() => onClose(exercise.id)}
            >
              <ListItemText
                primary={t(exercise.name)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </BootstrapDialog>
  )
}
