import { WeightUnit } from 'types.d';

import { getWeightAbbreviationLabel } from 'utils';

describe('utility functions', () => {
  describe('getWeightAbbreviationLabel', () => {
    it('returns expected when unit=POUNDS', () => {
      expect(getWeightAbbreviationLabel(WeightUnit.POUNDS)).toEqual('poundsAbbreviation');
    });

    it('returns expected when unit=KILOGRAMS', () => {
      expect(getWeightAbbreviationLabel(WeightUnit.KILOGRAMS)).toEqual('kilogramsAbbreviation');
    });
  });
});
