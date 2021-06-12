import { ReactComponent as Arrow } from '../../../assets/icons/svg/arrow.svg';
import s from './BtnPrevNext.module.css';

const BtnPrevNext = ({ handleClick, prev, next }) => {
  return (
    <div className={s.testPage__btnPrevNext}>
      <button
        // disabled={!prev}
        onClick={handleClick}
        className={prev ? s.testPage__btn : s.disactive}
        type="button"
        data-flag="prev"
      >
        <Arrow className={s.arrowLeft} width="25px" alt="arrow" />
        <span className={s.testPage__btnPrevNextText}> Previous question </span>
      </button>
      <button
        // disabled={!next}
        onClick={handleClick}
        className={next ? s.testPage__btn : s.disactive}
        type="button"
        data-flag="next"
      >
        <span className={s.testPage__btnPrevNextText}> Next question </span>
        <Arrow className={s.arrowRight} width="25px" alt="arrow" />
      </button>
    </div>
  );
};

export default BtnPrevNext;
