import * as cn from 'classnames';
import * as React from 'react';
import { ColorType, TextTagType, TextViewType, TextWeightType } from 'types/common';
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

const Text: React.FC<TextProps> = ({ children, tag = TextTagType.p, view, weight, className, color, maxLines }) => {
  const Tag = tag;
  const lineHeight = (maxLines ?? 2) * 20 + 'px';

  return (
    <Tag
      className={cn(styles[view ?? ''], className, styles[color ?? ''], styles.common)}
      style={{
        fontWeight: weight,
        maxLines,
        WebkitLineClamp: maxLines,
        lineHeight,
      }}
    >
      {children}
    </Tag>
  );
};

export default Text;
