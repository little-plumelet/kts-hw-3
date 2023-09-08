import * as React from 'react';
import Card, { CardProps } from 'components/Card';

export const CardList: React.FC<{ cards: Array<CardProps> }> = ({ cards }) => {
  return (
    <>
      {cards.map((card) => (
        <Card {...card} key={card.key} />
      ))}
    </>
  );
};
