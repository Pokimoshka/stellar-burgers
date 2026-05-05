import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../services/hooks';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../services/slices/userSlice';
import { AppDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch(() => {});
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
