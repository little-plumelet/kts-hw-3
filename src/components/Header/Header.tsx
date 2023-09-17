import * as cn from 'classnames';
import { NavLink } from 'react-router-dom';
import AccountIcon from 'components/icons/AccountIcon';
import FavouriteIcon from 'components/icons/FavouriteIcon';
import { urls } from 'configs/urls';
import { ColorType } from 'types/common';
import styles from './styles.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles['logo-block']}>
        <svg
          className={styles.logo}
          width="60px"
          height="60px"
          viewBox="0 0 72 72"
          id="emoji"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="color">
            <path fill="#FFFFFF" stroke="none" d="M7,36c0,16.0166,12.9834,29,29,29s29-12.9834,29-29H7z" />
            <path fill="#d0cfce" stroke="none" d="M49,36c0,16.0156-4,29-13,29c16.0166,0,29-12.9844,29-29H49z" />
          </g>
          <g id="hair" />
          <g id="skin" />
          <g id="skin-shadow" />
          <g id="line">
            <path
              fill="none"
              stroke="#B5460F"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M7,36c0,16.0166,12.9834,29,29,29s29-12.9834,29-29H7z"
            />
            <line
              x1="7"
              x2="14"
              y1="25.1406"
              y2="32.1406"
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <path
              fill="none"
              stroke="#B5460F"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M29.043,7.8457c0.1015,1.125,0.5605,2.2236,1.4209,3.084c1.9521,1.9512,1.9521,5.1172,0,7.0703 c-1.9522,1.9531-1.9522,5.1191,0,7.0703c1.9521,1.9512,1.9521,5.1172,0,7.0703c1.9521-1.9531,1.9521-5.1191,0-7.0703 c-1.9522-1.9512-1.9522-5.1172,0-7.0703c1.9521-1.9531,1.9521-5.1191,0-7.0703C29.6035,10.0693,29.1445,8.9707,29.043,7.8457"
            />
            <path
              fill="none"
              stroke="#B5460F"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M34.5703,7.0361C34.4697,8.4336,34.9316,9.8623,36,10.9297c1.9521,1.9512,1.9521,5.1172,0,7.0703 c-1.9521,1.9531-1.9521,5.1191,0,7.0703c1.9521,1.9512,1.9521,5.1172,0,7.0703c1.9521-1.9531,1.9521-5.1191,0-7.0703 c-1.9521-1.9512-1.9521-5.1172,0-7.0703c1.9521-1.9531,1.9521-5.1191,0-7.0703C34.9316,9.8623,34.4697,8.4336,34.5703,7.0361"
            />
            <path
              fill="none"
              stroke="#B5460F"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M40.0107,7.2832c-0.0302,1.3164,0.4483,2.6426,1.4532,3.6465c1.9521,1.9512,1.9521,5.1172,0,7.0703 c-1.9522,1.9531-1.9522,5.1191,0,7.0703c1.9521,1.9512,1.9521,5.1172,0,7.0703c1.9521-1.9531,1.9521-5.1191,0-7.0703 c-1.9522-1.9512-1.9522-5.1172,0-7.0703c1.9521-1.9531,1.9521-5.1191,0-7.0703C40.459,9.9258,39.9805,8.5996,40.0107,7.2832"
            />
          </g>
        </svg>
        <h1 className={styles['logo-title']}>Stonesoup</h1>
      </div>
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
