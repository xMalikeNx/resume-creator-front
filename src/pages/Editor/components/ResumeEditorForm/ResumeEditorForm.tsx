import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import React, { FC, useCallback, useContext } from 'react';
import { Button } from '../../../../components/Button';
import { InfoBlock } from '../../../../components/InfoBlock';

import { Input } from '../../../../components/Input';
import { MultiInput } from '../../../../components/MultiInput';
import { FormCollection } from '../FormCollection';
import { ResumeEditContext } from '../ResumeEditContext';
import { EducationForm } from './components/EducationForm';
import { ExperienceForm } from './components/ExperienceForm';
import styles from './resumeEditorForm.module.scss';

export type TResumeEditorForm = {
  onSubmit: () => void;
};

export const ResumeEditorForm: FC<TResumeEditorForm> = observer(
  ({ onSubmit }) => {
    const resumeEditStore = useContext(ResumeEditContext);

    return (
      <div className={styles.content}>
        <InfoBlock title="Общая информация">
          <Input field={resumeEditStore.resume.name} title="Название резюме" />
          <Input
            field={resumeEditStore.resume.url}
            title="Публичное название резюме"
          />
          <MultiInput field={resumeEditStore.resume.skills} title="Навыки" />
        </InfoBlock>
        <div>
          <InfoBlock title="Опыт работы">
            <FormCollection
              buttonText="Добавить место работы"
              renderItem={ExperienceForm}
              items={resumeEditStore.resume.experience}
              onAdd={resumeEditStore.addExperienceItem}
            />
          </InfoBlock>
          <InfoBlock title="Образование">
            <FormCollection
              buttonText="Добавить место учебы"
              renderItem={EducationForm}
              items={resumeEditStore.resume.education}
              onAdd={resumeEditStore.addEducationItem}
            />
          </InfoBlock>
          <Button position="right" className={styles.submit} onClick={onSubmit}>
            Сохранить
          </Button>
        </div>
      </div>
    );
  },
);
