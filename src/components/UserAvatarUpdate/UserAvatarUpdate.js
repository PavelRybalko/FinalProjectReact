import { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import s from './UserAvatarUpdate.module.css';

export const UPLOAD_AVATAR = 'http://localhost:3000/users/avatars';

const UserAvatarUpdate = () => {
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(event => {
    event.preventDefault();
    const fetchData = async uint8Array => {
      try {
        const response = await axios.patch(UPLOAD_AVATAR, {
          data: [...uint8Array],
        });
        setLoading(false);
      } catch (e) {
        console.error(e.message, 'function handleSubmit');
      }
    };

    if (!fileRef.current) {
      return void null;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const uint8Array = new Uint8Array(reader.result);
      setLoading(true);
      fetchData(uint8Array);
    };

    reader.readAsArrayBuffer(fileRef.current[0]);
  }, []);

  return (
    <form className={s.chooseAvatar} onSubmit={handleSubmit}>
      <div>
        <label className={s.chooseAvatar_btn} htmlFor="button-file">
          Choose your avatar
        </label>
        <input
          onChange={e => (fileRef.current = e.target.files)}
          className={s.chooseAvatar_input}
          accept="image/*"
          type="file"
          id="button-file"
        />
      </div>
      <button className={s.chooseAvatar_btnSaveAvatar} type="submit">
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default UserAvatarUpdate;
