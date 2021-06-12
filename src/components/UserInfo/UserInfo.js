import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';

import routes from '../../routes';
import { authOperations, authSelectors } from '../../redux/auth';
import { ReactComponent as SignOutIcon } from '../../assets/icons/svg/signOut.svg';
import { ReactComponent as AddIcon } from '../../assets/icons/svg/checkmark.svg';
import defaultAvatar from '../../assets/images/default-avatar.png';
import styles from './UserInfo.module.css';

function UserInfo({ onOpenMobileMenu }) {
  const dispatch = useDispatch();
  const userName = useSelector(authSelectors.getUserName);
  const avatar = defaultAvatar;
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();

  const toggleModal = useCallback(() => {
    setShowModal(prevShowModal => !prevShowModal);
  }, []);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'kyhvjqja');
    setLoading(true);
    const res = await fetch(
      '	https://api.cloudinary.com/v1_1/andray838/image/upload',
      {
        method: 'POST',
        body: data,
        api_key: 914256646727944,
      },
    );

    const file = await res.json();

    setImage(file.secure_url);
    setLoading(false);
  };

  const handleChange = useCallback(e => {
    setName(e.currentTarget.value);
  }, []);

  const onChangeName = () => {
    setNewName(name.length < 12 ? name : name.slice(0, 12) + '...');
    setName('');
  };

  const handleSubmit = useCallback(e => {
    e.preventDefault();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.avatar} onClick={toggleModal}>
          {loading ? (
            <h3 className={styles.loading}>Loading...</h3>
          ) : (
            <img
              src={image || avatar}
              alt="avatar"
              width="40"
              className={styles.avatarImg}
            />
          )}
          <span className={styles.dropdownCaret}></span>
          <div
            className={
              !showModal ? styles.userInfoModal : styles.userInfoModalActive
            }
          >
            <label
              htmlFor="fileUpload"
              name="file"
              className={styles.customFileUpload}
            >
              Change avatar
            </label>
            <input
              type="file"
              name="file"
              id="fileUpload"
              placeholder="Upload an image"
              onChange={uploadImage}
              onClick={toggleModal}
            />

            <form onSubmit={handleSubmit}>
              <label
                htmlFor="nameUpload"
                name="name"
                className={styles.customNameUpload}
              >
                Change name
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="name"
                  name="name"
                  id="nameUpload"
                  value={name}
                  placeholder="Change name"
                  onClick={toggleModal}
                  onChange={handleChange}
                  className={styles.nameUpload}
                  autoComplete="off"
                  autoFocus
                />
                {name && (
                  <button
                    className={styles.addBtn}
                    type="submit"
                    onClick={onChangeName}
                  >
                    <AddIcon className={styles.addIcon} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <span className={styles.name}>{newName || userName} </span>
      </div>

      <NavLink to={routes.AUTH_VIEW} onClick={() => onOpenMobileMenu(false)}>
        <SignOutIcon
          className={styles.signOutBtnLg}
          width="16px"
          height="16px"
          onClick={() => dispatch(authOperations.logOut())}
        />
      </NavLink>
    </div>
  );
}

export default UserInfo;
