import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from 'components/Button';
import Text from 'components/Text';
import { URLS } from 'configs/urls';
import { ColorType, TextTagType } from 'types/common';
import styles from './styles.module.scss';

export type ErrorCpProps = {
  errorMessage?: string;
};
export const ErrorCp: React.FC<ErrorCpProps> = ({ errorMessage }) => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <Text tag={TextTagType.h4} color={ColorType.accent} className={styles.message}>
          {errorMessage}
        </Text>
        {location.pathname !== URLS['/'] && (
          <Link to={URLS['/']} style={{ textDecoration: 'none' }}>
            <Button>Go Home</Button>
          </Link>
        )}
      </div>
    </div>
  );
};
