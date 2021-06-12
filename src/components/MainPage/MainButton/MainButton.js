import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../../routes';
import { ReactComponent as Arrow } from '../../../assets/icons/svg/arrow.svg';
import s from './MainButton.module.css';

const MainButton = ({ text, bg, onClick, dataSet }) => {
  return (
    <li className={s.listButton}>
      <Link
        data-name-test={dataSet}
        onClick={onClick}
        to={routes.TEST_VIEW}
        className={bg === 'orange' ? s.buttonOrange : s.buttonBlue}
      >
        {text}
        <Arrow className={s.arrow} width="25px" alt="arrow" />
      </Link>
    </li>
  );
};

MainButton.propTypes = {
  text: T.string.isRequired,
  bg: T.string.isRequired,
};

export default MainButton;
