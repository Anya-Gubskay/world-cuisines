export const getUnitLabel = (
  unit: string,
  dataMap: { value: string; label: string }[]
) => {
  const unitOption = dataMap.find((option) => option.value === unit);
  return unitOption ? unitOption.label : unit.toLowerCase();
};
