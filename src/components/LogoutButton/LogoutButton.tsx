import React, { FC } from 'react';
import { useStores } from '../../mst/rootStoreContext';
import { Button } from '../Button';
import { TButtonProps } from '../Button/Button';

export const LogoutButton: FC<TButtonProps> = (props) => {
  const { auth } = useStores();

  return (
    <Button {...props} type="button" onClick={auth.logout}>
      Выйти
    </Button>
  );
};
