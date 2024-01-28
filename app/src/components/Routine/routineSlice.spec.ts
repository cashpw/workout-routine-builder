import routineReducer, {
  RoutineState,
  addExercise,
} from './routineSlice';

describe('routine reducer', () => {
  const initialState: RoutineState = {
    exercises: [],
    name: "",
  };

  it('should handle initial state', () => {
    expect(routineReducer(undefined, { type: 'unknown' })).toEqual({
      exercises: [],
      name: "",
    });
  });

  it('should handle adding an exercise', () => {
    const actual = routineReducer(initialState, addExercise("Foo"));

    expect(actual.exercises).toEqual(["Foo"]);
  });

  it('should handle adding more than one exercise', () => {
    let actual = routineReducer(initialState, addExercise("Foo"));
    actual = routineReducer(actual, addExercise("Bar"));
    actual = routineReducer(actual, addExercise("Baz"));

    expect(actual.exercises).toEqual(["Foo", "Bar", "Baz"]);
  });
});
