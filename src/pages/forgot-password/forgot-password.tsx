import { FC, useState, SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordUI } from '@ui-pages';
import { forgotPassword } from '../../services/slices/userSlice';
import { getUserError } from '@selectors';
import { AppDispatch } from '../../services/store';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(getUserError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }))
      .unwrap()
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch(() => {});
  };

  return (
    <ForgotPasswordUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
