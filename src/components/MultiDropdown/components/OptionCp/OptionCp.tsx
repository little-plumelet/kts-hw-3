import * as React from 'react';
import { Option } from '@customTypes/MultiDropdownOption';

type OptionProps = Option & {
  id: string;
  onClick: (key: string, value: string) => void;
  className?: string;
};
export const OptionCp: React.FC<OptionProps> = ({ onClick, value, id, className }) => {
  return (
    <li onClick={() => onClick(id, value)} id={id} className={className}>
      {value}
    </li>
  );
};
