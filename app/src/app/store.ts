import {
  Action,
  ThunkAction,
  createListenerMiddleware,
  isAnyOf,
  configureStore,
} from '@reduxjs/toolkit';
import history from 'history/browser';
import qs from 'qs';

import routineReducer, {
  addExerciseSet,
  removeExerciseSet,
} from 'components/Routine/routineSlice';

function getStateFromQueryParameters() {
  return qs.parse(history.location.search);
}

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(addExerciseSet, removeExerciseSet),
  effect: async (action, listenerApi) => {
    storeStateInQueryParameters(listenerApi.getState() as {});
  },
});

export const store = configureStore({
  reducer: {
    routine: routineReducer,
  },
  preloadedState: getStateFromQueryParameters(),
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

function storeStateInQueryParameters(state: {}) {
  const queryString = qs.stringify(state);
  history.replace(`/?${queryString}`);
}
