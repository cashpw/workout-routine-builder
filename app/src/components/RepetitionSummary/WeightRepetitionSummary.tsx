import type { WeightRepetition } from 'types';

import { useTranslation } from 'react-i18next';

import { getWeightAbbreviationLabel } from 'utils';

export interface WeightRepetitionSummaryProps {
  repetition: WeightRepetition;
}

export default function WeightRepetitionSummary(props: WeightRepetitionSummaryProps) {
  const { repetition } = props;
  const {
    weight,
    unit,
    count,
  } = repetition;
  const { t } = useTranslation();

  const unitAbbreviation = t(getWeightAbbreviationLabel(unit));

  return (
    <>
      {`${count} x ${weight}${unitAbbreviation}`}
    </>
  );
}
