import React from 'react';

type CheckboxProps = {
  idx: number;
  isChecked: boolean;
  socketHandler: (checkboxId: number) => void;
};

const Checkbox = ({ idx, isChecked, socketHandler }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={() => socketHandler(idx)}
    />
  );
};

export default Checkbox;
