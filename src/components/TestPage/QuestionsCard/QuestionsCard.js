import s from './QuestionCard.module.css';

const QuestionsCard = ({ counter, handleSet, apiData, answers }) => {
  return (
    <ul onClick={handleSet}>
      {apiData[counter].answers.map((el, index) => {
        const resultedClass = () => {
          if (apiData[counter]?.questionId === answers[counter]?.questionId) {
            return answers[counter]?.answerId === index.toString()
              ? `${s.item} ${s.item__checked}`
              : s.item;
          } else {
            return s.item;
          }
        };
        return (
          <li
            key={index}
            name="radioButton"
            className={resultedClass()}
            id={index}
            data-answer={el}
            // data-index={index}
            data-question-id={apiData[counter].questionId}
          >
            {el}
          </li>
        );
      })}
    </ul>
  );
};

export default QuestionsCard;
