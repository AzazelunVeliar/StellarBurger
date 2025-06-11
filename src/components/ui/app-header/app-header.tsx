import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const getClassName = (isActive: boolean) =>
    [styles.link, isActive ? styles.link_active : null]
      .filter(Boolean)
      .join(' ');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <NavLink
              to='/'
              className={({ isActive }) => getClassName(isActive)}
              data-cy='profile-link'
            >
              <BurgerIcon type={'primary'} className={styles.icon} />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </NavLink>
          </>
          <>
            <NavLink
              to='/feed'
              className={({ isActive }) => getClassName(isActive)}
            >
              <ListIcon type={'primary'} className={styles.icon} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </NavLink>
          </>
        </div>
        <div className={styles.logo}>
          <Link to='/' className={styles.link}>
            <Logo className='' />
          </Link>
        </div>
        <div className={styles.link_position_last}>
          <NavLink
            to='/profile'
            className={({ isActive }) => getClassName(isActive)}
          >
            <ProfileIcon type={'primary'} className={styles.icon} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
