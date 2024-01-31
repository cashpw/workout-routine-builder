import {
  Action,
  ThunkAction,
  createListenerMiddleware,
  isAnyOf,
  configureStore,
} from '@reduxjs/toolkit';
import history from 'history/browser';

import routineReducer, {
  addExerciseSet,
  addCountRepetition,
  addWeightRepetition,
  removeExerciseSet,
  removeRepetition,
  setRepetitionCount,
  setRepetitionWeight,
} from 'components/Routine/routineSlice';

function getStateFromQueryParameters() {
  if (history.location.search && history.location.search.startsWith("?")) {
    const encodedQueryString = history.location.search.slice(1);
    console.log(encodedQueryString);
    return JSON.parse(decodeURIComponent(encodedQueryString));
  }

  return {}
}

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(
    addExerciseSet,
    addCountRepetition,
    addWeightRepetition,
    removeExerciseSet,
    removeRepetition,
    setRepetitionCount,
    setRepetitionWeight),
  effect: async (_, listenerApi) => {
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
  const queryString = encodeURIComponent(JSON.stringify(state));
  // qs.stringify(state, {});
  history.replace(`/?${queryString}`);
}
