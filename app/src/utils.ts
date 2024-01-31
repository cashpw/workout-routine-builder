import { WeightUnit } from 'types.d';

export function getWeightAbbreviationLabel(unit: WeightUnit): string {
  switch (unit) {
    case WeightUnit.KILOGRAMS:
      return 'kilogramsAbbreviation';
    case WeightUnit.POUNDS:
      return 'poundsAbbreviation';
  }

  // TODO Handle error case
  return ""
}
