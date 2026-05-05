import { FC, useState, SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { LoginUI } from '@ui-pages';
import { loginUser } from '../../services/slices/userSlice';
import { getUserError } from '@selectors';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const error = useAppSelector(getUserError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {})
      .catch(() => {});
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
