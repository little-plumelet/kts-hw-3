import * as React from 'react';
import { Option } from 'types/MultiDropdownOption';

type OptionProps = Option & {
  id: string;
  onClick: (key: string, value: string) => void;
  className?: string;
  key: string;
};
export const OptionCp: React.FC<OptionProps> = ({ key, onClick, value, id, className }) => {
  return (
    <li key={key} onClick={() => onClick(id, value)} id={id} className={className}>
      {value}
    </li>
  );
};
