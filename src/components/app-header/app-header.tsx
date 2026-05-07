import { FC } from 'react';
import { useAppSelector } from '../../services/hooks';
import { AppHeaderUI } from '@ui';
import { getUser } from '@selectors';

export const AppHeader: FC = () => {
  const user = useAppSelector(getUser);
  return <AppHeaderUI userName={user?.name} />;
};
