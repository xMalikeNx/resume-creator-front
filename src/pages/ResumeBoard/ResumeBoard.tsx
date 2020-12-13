import { observer } from 'mobx-react';
import React, { FC, useEffect, useMemo } from 'react';
import { Layout } from '../../components/Layout';
import { Preloader } from '../../components/Preloader';
import { useStores } from '../../mst/rootStoreContext';
import { ResumeBoardItem } from './components/ResumeBoardItem';
import { createResumeBoardModel } from './stores/resumeBoard.store';

import styles from './resumeBoard.module.scss';
import { CreateResumeItem } from './components/CreateResumeItem/CreateResumeItem';

export const ResumeBoard: FC = observer(() => {
  const { ui } = useStores();
  const resumeBoardModel = useMemo(() => createResumeBoardModel(), []);

  if (!resumeBoardModel) {
    return null;
  }

  useEffect(() => {
    resumeBoardModel
      .fetchResumes()
      .catch(() =>
        ui.createNotification('Не удалось получить список резюме', 'error'),
      );
  }, [resumeBoardModel]);

  return (
    <Layout>
      {resumeBoardModel.isLoading && (
        <Preloader style={{ paddingTop: '200px' }} />
      )}
      {!resumeBoardModel.isLoading && (
        <div className={styles.resumeBoard}>
          {resumeBoardModel.resumes.map((resume) => (
            <ResumeBoardItem key={resume._id} item={resume} />
          ))}
          <CreateResumeItem />
        </div>
      )}
    </Layout>
  );
});
