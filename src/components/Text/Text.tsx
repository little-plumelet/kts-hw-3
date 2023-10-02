import cn from 'classnames';
import * as React from 'react';
import { ColorType, TextTagType, TextViewType, TextWeightType } from '@customTypes/common';
import styles from './styles.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: TextViewType;
  /** Html-тег */
  tag?: TextTagType;
  /** Начертание шрифта */
  weight?: TextWeightType;
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: ColorType;
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  children,
  tag = TextTagType.p,
  view = TextViewType.p16,
  weight,
  className,
  color = ColorType.primary,
  maxLines,
}) => {
  const Tag = tag;
  const minHeight = (maxLines ?? 2) * 20 + 'px';

  return (
    <Tag
      className={cn(styles[view], className, styles[color], styles.common)}
      style={{
        fontWeight: weight,
        maxLines,
        WebkitLineClamp: maxLines,
        minHeight,
      }}
    >
      {children}
    </Tag>
  );
};

export default Text;
