import musclesAsList from './asList';

describe('muscles as list', () => {
  it('contains expected muscles', () => {
    expect(musclesAsList.sort()).toEqual([
      'biceps',
      'glutes',
      'chest',
    ].sort());
  });
});
