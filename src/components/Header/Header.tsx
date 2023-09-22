import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import AccountIcon from '@components/icons/AccountIcon';
import FavouriteIcon from '@components/icons/FavouriteIcon';
import { urls } from '@configs/urls';
import { ColorType } from '@customTypes/common';
import { Logo } from './components/Logo';
import styles from './styles.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <nav className={styles.block}>
        <NavLink to={urls.root} className={({ isActive }) => cn(isActive ? styles.active : styles.pending, styles.nav)}>
          Home
        </NavLink>
        <NavLink
          to={urls.ingredients}
          className={({ isActive }) => cn(isActive ? styles.active : styles.pending, styles.nav)}
        >
          Ingredients
        </NavLink>
        <NavLink
          to={urls.products}
          className={({ isActive }) => cn(isActive ? styles.active : styles.pending, styles.nav)}
        >
          Products
        </NavLink>
      </nav>
      <div className={styles.block}>
        <AccountIcon color={ColorType.accent} className={styles['icon-block']} />
        <FavouriteIcon color={ColorType.accent} className={styles['icon-block']} />
      </div>
    </header>
  );
};
