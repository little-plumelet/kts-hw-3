import * as React from 'react';
import { Link, useMatch } from 'react-router-dom';
import Button from '@components/Button';
import Text from '@components/Text';
import { urls } from '@configs/urls';
import { ColorType, TextTagType } from '@customTypes/common';
import styles from './styles.module.scss';

export type ErrorCpProps = {
  errorMessage?: string;
};
export const ErrorCp: React.FC<ErrorCpProps> = ({ errorMessage }) => {
  const match = useMatch(urls.root);

  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <Text tag={TextTagType.h4} color={ColorType.accent} className={styles.message}>
          {errorMessage}
        </Text>
        {!match && (
          <Link to={urls.root} style={{ textDecoration: 'none' }}>
            <Button>Go Home</Button>
          </Link>
        )}
      </div>
    </div>
  );
};
