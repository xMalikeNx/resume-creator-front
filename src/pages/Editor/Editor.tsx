import { observer } from 'mobx-react';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Preloader } from '../../components/Preloader';
import { useStores } from '../../mst/rootStoreContext';
import { ResumeEditContext } from './components/ResumeEditContext';
import { ResumeEditorForm } from './components/ResumeEditorForm';
import { createResumeEditStoreModel } from './models/resume.edit.model';

export const Editor: FC = observer(() => {
  const {
    params: { resumeId },
  } = useRouteMatch<{ resumeId: string }>();
  const { ui } = useStores();
  const resumeEditStore = useMemo(() => createResumeEditStoreModel(), []);

  useEffect(() => {
    if (resumeId) {
      resumeEditStore
        .fetchResume(resumeId)
        .catch(() =>
          ui.createNotification('Не удалось получить данные о резюме'),
        );
    }
  }, [resumeEditStore, resumeId]);

  const handleSubmitForm = useCallback(() => {
    resumeEditStore.validate();
    if (resumeEditStore.isFormValid) {
      resumeEditStore
        .postResume(resumeId)
        .then(() =>
          ui.createNotification(
            resumeId ? 'Резюме успешно обновлено' : 'Резюме успешно создано',
            'success',
          ),
        )
        .catch(() =>
          ui.createNotification(
            resumeId
              ? 'Не удалось обновить резюме'
              : 'Не удалось создать резюме',
            'error',
          ),
        );
    }
  }, [resumeEditStore]);

  return (
    <ResumeEditContext.Provider value={resumeEditStore}>
      <Layout>
        {resumeEditStore.loading && <Preloader />}
        {!resumeEditStore.loading && (
          <ResumeEditorForm onSubmit={handleSubmitForm} />
        )}
      </Layout>
    </ResumeEditContext.Provider>
  );
});
