import React, { FC, useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Layout } from '../../components/Layout';

export const Editor: FC = () => {
  const match = useRouteMatch<{ resumeId: string }>();
  const resumeEditStore = useMemo(() => {}, []);

  return <Layout>Editor</Layout>;
};
