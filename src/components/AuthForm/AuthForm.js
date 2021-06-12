import {
  useState,
  // useCallback, useEffect
} from 'react';
import {
  useDispatch,
  // useSelector
} from 'react-redux';
import { authOperations } from '../../redux/auth';
import s from './AuthForm.module.css';
import gIcon from '../../assets/icons/google-logo.png';
// import Modal from '../Modal';
// import { authSelectors } from '../../redux/auth';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  // const [showModal, setShowModal] = useState(false);
  // const userEmail = useSelector(state => state);
  // const userCode = useSelector(authSelectors.getCode);
  // const formatUserEmail = 'https://' + userEmail;
  // const toggleModal = useCallback(() => {
  //   setShowModal(prevShowModal => !prevShowModal);
  // }, []);
  // useEffect(() => {
  //   toggleModal();
  // }, [toggleModal, userCode]);
  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const reset = () => {
    setEmail('');
    setPassword('');
  };

  const isEmailAndPasswordFill = (email, password) => {
    if (!email.trim() && !password.trim()) {
      return alert('Please write email and password!');
    }
    return true;
  };

  const handleClick = event => {
    event.preventDefault();
    const buttonName = event.target.dataset.auth;
    if (isEmailAndPasswordFill(email, password)) {
      switch (buttonName) {
        case 'login':
          dispatch(authOperations.logIn({ email, password }));
          return;
        case 'reg':
          dispatch(authOperations.register({ email, password }));
          return;
        default:
          return;
      }
    }
    reset();
  };

  // const handleRegister = event => {
  //   event.preventDefault();
  //   if (isEmailAndPasswordFill(email, password)) {
  //     dispatch(authOperations.register({ email, password }));
  //   }
  //   reset();
  // };

  return (
    <div className={s.form}>
      <p className={s.para}>For authorization you can use Google Account:</p>
      <div className={s.btnWrapper}>
        <a href="https://final-group-project-node.herokuapp.com/auth/google">
          <button className={s.gBtn} type="submit">
            Google
          </button>
          <img className={s.gLogo} src={gIcon} alt={'gIcon'} />
        </a>
      </div>
      <p className={s.secondPara}>Or using e-mail and password:</p>
      <form className={s.innerForm}>
        <label>
          <input
            className={s.input}
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            value={email}
          />
        </label>
        <label>
          <input
            className={s.input}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            value={password}
          />
        </label>
        <div className={s.btnWrapperBottom}>
          <button data-auth="login" className={s.regBtn} onClick={handleClick}>
            Log in
          </button>
          <button data-auth="reg" className={s.regBtn} onClick={handleClick}>
            Register
          </button>
        </div>
      </form>
      {/* {userCode === 201 && (
        <Modal onClose={toggleModal}>
          <p>
            confirm registration on your{' '}
            <a href={formatUserEmail}>{userEmail}</a>
          </p>
        </Modal>
      )} */}
    </div>
  );
}
