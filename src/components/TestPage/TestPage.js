import BtnFinishTest from './BtnFinishTest/BtnFinishTest';
import BtnPrevNext from './BtnPrevNext/BtnPrevNext';
import QuestionsCard from './QuestionsCard/QuestionsCard';
import {
  actionAddResult,
  actionUpdateResult,
} from '../../redux/questions/questions-actions';
import { getQuestions } from '../../data/apiQueries';
import { useSelector, useDispatch } from 'react-redux';
import s from './TestPage.module.css';
import { useState, useEffect } from 'react';

const TestPage = () => {
  const dispatch = useDispatch();
  const { answers, nameTest } = useSelector(state => state.questions);
  const [data, setData] = useState(null);
  const [i, setI] = useState(null);
  const [activePrev, setActivePrev] = useState(false);
  const [activeNext, setActiveNext] = useState(true);

  useEffect(() => {
    setI(0);
  }, []);

  useEffect(() => {
    async function getAnswers() {
      try {
        const { data } = await getQuestions(nameTest);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
    getAnswers();
  }, [nameTest]);

  const handleTestList = e => {
    const {
      target: { dataset, id, nodeName },
    } = e;
    if (nodeName !== 'LI') return;

    const check = answers.some(el => el.answer !== undefined);
    const newAnswer = {
      questionId: Number(dataset.indexAnswer),
      answer: dataset.answer,
      idx: dataset.index,
    };
    const allLi = document.getElementsByName('check');
    allLi.forEach(item => {
      item.classList.remove(s.item__checked);
    });
    const currentLi = document.getElementById(id);
    currentLi.classList.add(s.item__checked);
    if (!check) {
      dispatch(actionAddResult(newAnswer));
      return;
    }
    if (check) {
      dispatch(actionUpdateResult(newAnswer));
      return;
    }
  };

  const handleNextPrevClick = e => {
    const {
      currentTarget: {
        dataset: { flag },
      },
    } = e;
    const allLi = document.getElementsByName('check');

    if (flag === 'next') {
      allLi.forEach(item => {
        item.classList.remove(s.item__checked);
      });
      if (i === 10) {
        setI(() => i + 1);
        return setActiveNext(false);
      }
      setI(() => i + 1);
      setActivePrev(true);
      return;
    }
    if (flag === 'prev') {
      allLi.forEach(item => {
        item.classList.remove(s.item__checked);
      });
      if (i === 1) {
        setActivePrev(false);
        return setI(() => i - 1);
      }
      setActiveNext(true);
      setActivePrev(true);
      return setI(() => i - 1);
    }
  };

  return (
    data !== null &&
    data.length === 12 && (
      <section className={s.testPage}>
        <div className={s.container}>
          <div className={s.container__head}>
            <h2 className={s.testPage__testName}>
              <span className={s.testPage__testNameText}>
                {' '}
                [ Testing <br />
                {nameTest === 'theory-questions' ? 'theoretical' : 'technic'}_ ]{' '}
              </span>
            </h2>
            <BtnFinishTest checkData={answers.length === 12 ? true : false} />
          </div>
          <div className={s.testPage__question}>
            <h1 className={s.testPage__questionsNumber}>
              Question
              <span className={s.testPage__currentQuestionNum}>
                &#160; {i + 1}&#160;
              </span>
              / 12
            </h1>
            <h4 className={s.testPage__titleQuestions}>{data[i].question}</h4>

            <QuestionsCard
              counter={i}
              handleSet={handleTestList}
              apiData={data}
              currentAnswer={answers}
            />
          </div>

          <BtnPrevNext
            prev={activePrev}
            next={activeNext}
            handleClick={handleNextPrevClick}
          />
        </div>
      </section>
    )
  );
};
export default TestPage;
