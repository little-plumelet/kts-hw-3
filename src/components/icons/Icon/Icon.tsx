import * as classNames from 'classnames';
import * as React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  width?: string;
  height?: string;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  children,
  className,
  width = '24px',
  height = '24px',
  ...props
}) => {
  return (
    <svg className={classNames(className)} width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
      {children}
    </svg>
  );
};

export default Icon;
