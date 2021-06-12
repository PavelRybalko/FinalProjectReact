import React from 'react';
import { actionSetNameTest } from '../../redux/questions/questions-actions';
import { useDispatch } from 'react-redux';
import MainButton from '../../components/MainPage/MainButton';
import s from './MainPage.module.css';

const TEXT_BUTTON = ['QA technical training', 'Testing theory'];
const BUTTON_COLOR = ['orange', 'blue'];

const MainPage = () => {
  const dispatch = useDispatch();

  const handleSetReduxQuery = e => {
    const {
      currentTarget: { dataset },
    } = e;
    if (dataset?.nameTest) {
      return dispatch(actionSetNameTest(dataset.nameTest));
    }
  };

  return (
    <section className={s.mainPage}>
      <div className={s.container}>
        <h2 className={s.mainPage_quote}>
          “Regression testing. What is it? <br /> If the system compiles, that's
          good, if it boots, that's great!”
        </h2>
        <h3 className={s.mainPage_author}>Linus Torvalds</h3>
        <p className={s.mainPage_descr}>Linux kernel creator, hacker, 1969</p>
        <div className={s.mainPage_buttons}>
          <ul className={s.mainPage_buttonItems}>
            <MainButton
              onClick={handleSetReduxQuery}
              dataSet="tech-questions"
              text={TEXT_BUTTON[0]}
              bg={BUTTON_COLOR[1]}
            />

            <MainButton
              onClick={handleSetReduxQuery}
              dataSet="theory-questions"
              text={TEXT_BUTTON[1]}
              bg={BUTTON_COLOR[0]}
            />
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MainPage;
