export type ExerciseId = number;
export type ExerciseName = string;

export interface JsonExercise {
  id: number;
  name: string;
  repetitionTypes: RepetitionTypeStrings[];
}

export interface Exercise {
  // A unique identifier for the entire Exercise
  id: ExerciseId;

  // A unique identifier for i18n
  name: ExerciseName;

  // TODO: Define Muscle enum type
  targetMuscles: string[];

  // Valid repetition types for this exercise
  repetitionTypes: RepetitionType[];
}

export enum WeightUnit {
  KILOGRAMS,
  POUNDS,
}

export interface RepetitionBase {
  type: RepetitionType;
}

export enum RepetitionType {
  COUNT,
  WEIGHT,
}
export type RepetitionTypeStrings = keyof typeof RepetitionType;

export interface WeightRepetition extends RepetitionBase {
  unit: WeightUnit;
  weight: number;
  count: number;
}

export interface CountRepetition extends RepetitionBase {
  count: number
}

export type Repetition = WeightRepetition | CountRepetition;

export interface ExerciseSet {
  exerciseId: ExerciseId;
  repetitions: Repetition[];
}

export interface Routine {
  exerciseSets: ExerciseSet[];
}
