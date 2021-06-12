import s from './QuestionCard.module.css';

const QuestionsCard = ({ counter, handleSet, apiData, currentAnswer }) => {
  return (
    <ul onClick={handleSet}>
      {apiData[counter].answers.map((el, index) => {
        const resultedClass = () => {
          if (
            apiData[counter]?.questionId === currentAnswer[counter]?.questionId
          ) {
            return currentAnswer[counter]?.idx === index.toString()
              ? `${s.item} ${s.item__checked}`
              : s.item;
          } else {
            return s.item;
          }
        };
        return (
          <li
            key={index}
            name="check"
            className={resultedClass()}
            id={index}
            data-answer={el}
            data-index={index}
            data-index-answer={apiData[counter].questionId}
          >
            {el}
          </li>
        );
      })}
    </ul>
  );
};

export default QuestionsCard;
