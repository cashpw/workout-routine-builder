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

  // Valid repetition types for this exercise
  repetitionTypes: RepetitionType[];
}

export enum WeightUnit {
  KILOGRAMS,
  POUNDS,
}

export enum RepetitionType {
  COUNT,
  WEIGHT,
}
export type RepetitionTypeStrings = keyof typeof RepetitionType;

export interface WeightRepetition extends Repetition {
  unit: WeightUnit;
  weight: number;
  count: number;
}

export interface CountRepetition extends Repetition {
  count: number
}

export interface Repetition {
  type: RepetitionType;
}

export interface ExerciseSet {
  exerciseId: ExerciseId;
  repetitions: Repetition[];
}
