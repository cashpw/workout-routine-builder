import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

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
  const dispatch = useAppDispatch();

  return (
    <Card
      variant="outlined"
    >
      <CardHeader
        title={t('routineTitle')}
      />
      {exerciseSets.length > 0 && (
        <CardContent>
          <RoutineItems
            exerciseSets={exerciseSets}
          />
        </CardContent>
      )}
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
      <CardActions>
        <Button
          size="small"
          onClick={() => {setAddExerciseDialogOpen(true)}}
          startIcon={<AddIcon />}
        >
          {t('addExerciseCallToAction')}
        </Button>
      </CardActions>
   </Card>
  );
}
