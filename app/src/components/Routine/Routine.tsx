import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

import {
  useAppSelector,
  useAppDispatch,
} from 'app/hooks';
import {
  addExerciseSet,
  selectExerciseSets,
  selectName,
} from './routineSlice';
// import styles from './Routine.module.css';
import exercisesAsList from 'exercises/asList';
import AddExerciseDialog from 'components/AddExerciseDialog/AddExerciseDialog';
import RoutineItems from 'components/RoutineItems/RoutineItems';

export default function Routine() {
  const { t } = useTranslation();
  const [addExerciseDialogOpen, setAddExerciseDialogOpen] = useState(false);
  const exerciseSets = useAppSelector(selectExerciseSets);
  const name = useAppSelector(selectName);
  const dispatch = useAppDispatch();

  return (
    <Card
      variant="outlined"
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Name: {name}
        </Typography>
        <RoutineItems
          exerciseSets={exerciseSets}
        />
        <Button
          variant="contained"
          onClick={() => {setAddExerciseDialogOpen(true)}}
        >
          {t('addExerciseCallToAction')}
        </Button>
        <AddExerciseDialog
          open={addExerciseDialogOpen}
          exercises={exercisesAsList}
          onClose={(id: number|undefined) => {
            if (id !== undefined) {
              dispatch(addExerciseSet(id));
            }
            setAddExerciseDialogOpen(false);
          }}
        />
      </CardContent>
   </Card>
  );
}
