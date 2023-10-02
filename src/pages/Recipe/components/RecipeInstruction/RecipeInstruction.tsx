import cn from 'classnames';
import * as React from 'react';
import Text from '@components/Text';
import { InstructionStep } from '@customTypes/RecipeData';
import { ColorType, TextViewType } from '@customTypes/common';
import styles from './styles.module.scss';

type RecipeInstructionProps = {
  steps: InstructionStep[];
  className?: string;
};
export const RecipeInstruction: React.FC<RecipeInstructionProps> = ({ steps, className }) => {
  return (
    <section className={cn(styles['instruction-section'], className)}>
      <Text view={TextViewType.p20} className={styles.title}>
        Instructions
      </Text>
      <ul className={styles.instructions}>
        {steps.map((step) => (
          <li key={step.number} className={styles['instructions-point']}>
            <Text view={TextViewType.p16} color={ColorType.primary}>
              Step {step.number}
            </Text>
            <p>{step?.step}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
