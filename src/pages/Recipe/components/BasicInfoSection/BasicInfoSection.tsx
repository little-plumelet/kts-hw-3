import * as React from 'react';
import Text from 'components/Text';
import { ColorType } from 'types/common';
import styles from './styles.module.scss';

type BasicInfoSectionProps = {
  maxLines: number;
  title: string;
  subtitle: string;
};

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ maxLines, title, subtitle }) => {
  return (
    <div className={styles['basic-info-section']}>
      <Text maxLines={maxLines}>{title}</Text>
      <Text maxLines={maxLines} color={ColorType.accent}>
        {subtitle}
      </Text>
    </div>
  );
};
