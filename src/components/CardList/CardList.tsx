import * as React from 'react';
import Card, { CardProps } from 'components/Card';

type CardListProps = {
  cards: CardProps[];
};

export const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <>
      {cards.map((card) => (
        <Card {...card} key={card.key} />
      ))}
    </>
  );
};
