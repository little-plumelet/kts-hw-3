import * as React from 'react';
import styles from './styles.module.scss';

type RecipeDescriptionProps = {
  description: string;
  className?: string;
};
export const RecipeDescription: React.FC<RecipeDescriptionProps> = ({ description, className }) => {
  return (
    <section className={className}>
      <div className={styles.description} dangerouslySetInnerHTML={{ __html: description ?? '' }} />
    </section>
  );
};
