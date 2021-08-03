import { Link } from 'react-router-dom';
import s from './Results.module.css';
import routes from '../../routes';
import cat176 from '../../assets/images/cat176.png';
import cat120 from '../../assets/images/cat120.png';
import defaultImg from '../../assets/images/cat120default.png';
import Diagram from './Chart/Chart.js';
import { postUserAnswers } from '../../data/apiQueries';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionResetAnswers } from '../../redux/questions/questions-actions';

const Results = () => {
  const { answers, nameTest } = useSelector(state => state.questions);
  const [dataAnswers, setDataAnswers] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAnswers() {
      try {
        const { data } = await postUserAnswers(nameTest, answers);
        await setDataAnswers(data);
      } catch (error) {
        console.error(error);
      }
    }
    getAnswers();
  }, [nameTest, answers]);

  const handleTryAgain = () => {
    dispatch(actionResetAnswers([]));
  };

  return (
    <>
      {dataAnswers !== undefined && dataAnswers !== null && (
        <section>
          <div className={s.container}>
            <h2 className={s.sectionTitle}>Results</h2>
            <h3 className={s.sectionSubtitle}>[TESTING THEORY_]</h3>
            <Diagram
              correctAnswers={dataAnswers.right}
              allAnswers={dataAnswers.total}
            />
            <div className={s.resultsWrapper}>
              <p className={s.resultData}>
                Current answers- {dataAnswers.right}
              </p>
              <p className={s.resultData}>
                Total questions- {dataAnswers.total}
              </p>
            </div>
            <picture>
              <source
                srcSet={cat176}
                media="(min-width:768px)"
                alt="cat with a heart"
              />
              <source
                srcSet={cat120}
                media="(min-width:320px)"
                alt="cat with a heart"
              />
              <img src={defaultImg} alt="cat with a heart" />
            </picture>
            {dataAnswers.right === dataAnswers.total && (
              <>
                <p className={s.testResult}>Very Good!</p>
                <p className={s.testResultDescription}>Don't stop there!</p>
              </>
            )}
            {dataAnswers.total / 2 < dataAnswers.right ? (
              <>
                <p className={s.testResult}>Not bad!</p>
                <p className={s.testResultDescription}>
                  But you still need to learn some materials.
                </p>
              </>
            ) : (
              <>
                <p className={s.testResult}>Not very good :(</p>
                <p className={s.testResultDescription}>
                  Your result is below average.
                </p>
              </>
            )}
            <button>
              <Link
                to={routes.TEST_VIEW}
                onClick={handleTryAgain}
                className={s.sectionButton}
              >
                Try again
              </Link>
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Results;
