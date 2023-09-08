import * as cn from 'classnames';
import * as React from 'react';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({ children, tag = 'p', view, weight, className, color, maxLines }) => {
  const Tag = tag;
  const classes = cn(view, className);
  const minHeight = (maxLines ?? 2) * 24;

  return (
    <Tag
      className={classes}
      style={{
        fontWeight: weight,
        color: `var(--${color})`,
        maxLines,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: maxLines,
        overflow: 'hidden',
        minHeight,
      }}
    >
      {children}
    </Tag>
  );
};

export default Text;
