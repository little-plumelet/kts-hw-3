import * as classNames from 'classnames';
import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import styles from '../styles.module.scss';

const CheckIcon: React.FC<IconProps> = ({ color = 'primary', className, ...props }) => {
  return (
    <Icon {...props} className={classNames(styles[color], className)}>
      <path d="M4 11.6129L9.87755 18L20 7" stroke="currentColor" strokeWidth="2" />
    </Icon>
  );
};

export default CheckIcon;
