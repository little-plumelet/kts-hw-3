import * as cn from 'classnames';
import * as React from 'react';
import Text from '../Text';
import styles from './styles.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  /** Ключ */
  key: string;
};

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  image,
  className,
  captionSlot,
  contentSlot,
  actionSlot,
  onClick,
  ...rest
}) => {
  return (
    <div className={cn(styles.card, className)} onClick={onClick} {...rest}>
      <header className={styles.header}>
        <img width={'100%'} height={'100%'} src={image} alt="" />
      </header>
      <div className={styles.body}>
        <div className={styles.content}>
          {captionSlot && <div className={styles['above-title']}>{captionSlot}</div>}
          <Text className={styles.title} view="p-20" maxLines={2} color="primary">
            {title}
          </Text>
          <Text view="p-16" maxLines={3} color="secondary">
            {subtitle}
          </Text>
        </div>
        <footer className={styles.footer}>
          <span className={styles['content-slot']}>{contentSlot}</span>
          {actionSlot}
        </footer>
      </div>
    </div>
  );
};

export default Card;
