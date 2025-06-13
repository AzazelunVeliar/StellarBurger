import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { getAuthError, login } from '../../services/slices/user-slice';

export const Login: FC = () => {
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const emailStorage = localStorage.getItem('email') as string;

  const [email, setEmail] = useState(emailStorage);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    dispatch(
      login({
        email: email,
        password: password
      })
    );
  };

  return (
    <LoginUI
      errorText={useSelector(getAuthError)}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
