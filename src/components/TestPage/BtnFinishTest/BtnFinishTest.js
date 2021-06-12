import { Link } from 'react-router-dom';
import routes from '../../../routes';
import s from './BtnFinishTest.module.css';

const BtnFinishTest = ({ checkData }) => {
  // const handleTryTest = e => {
  //   console.log(`go to result view`);
  // };
  // console.log(checkData);

  return checkData ? (
    <div className={s.testPage__btnFinish}>
      <Link to={routes.RESULT_VIEW}>Finish test</Link>
    </div>
  ) : (
    <div className={s.testPage__btnFinish__disactive}>Finish test</div>
  );
};

export default BtnFinishTest;
