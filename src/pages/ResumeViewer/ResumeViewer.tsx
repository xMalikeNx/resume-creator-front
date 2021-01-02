import { observer } from 'mobx-react';
import React, { FC, useEffect, useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Avatar } from '../../components/Avatar/Avatar';
import { Container } from '../../components/Container';
import { List } from '../../components/List';
import { Preloader } from '../../components/Preloader';
import { ResumeEducationItem } from './components/ResumeEducationItem';
import { ResumeExperienceItem } from './components/ResumeExperienceItem';
import { ResumeSection } from './components/ResumeSection';
import { UserContacts } from './components/UserContacts';
import { createResumeViewModel } from './model/resume.view.model';
import styles from './resumeViewer.module.scss';

export const ResumeViewer: FC = observer(() => {
  const {
    params: { userLogin, resumeId },
  } = useRouteMatch<{ userLogin: string; resumeId: string }>();
  const resumeStore = useMemo(() => createResumeViewModel(), []);
  const { resume } = resumeStore;

  useEffect(() => {
    resumeStore.fetchResume(userLogin, resumeId);
  }, []);

  if (resumeStore.loading) {
    return <Preloader />;
  }

  if (resumeStore.isFailed || !resume.user) {
    return <div>Resume not found</div>;
  }

  console.log(resume);

  return (
    <Container>
      <div className={styles.content}>
        <div className={styles.left}>
          <Avatar url={resume.user.avatar} className={styles.avatar} />
          <h1 className={styles.userName}>
            {`${resume.user.firstName} ${resume.user.lastName}`}
          </h1>
          <div className={styles.position}>{resume.user.profession}</div>
          <UserContacts user={resume.user} />
          {resume.user.about && (
            <div className={styles.about}>
              <p className={styles.title}>О себе</p>
              {resume.user.about}
            </div>
          )}
        </div>
        <div className={styles.right}>
          <ResumeSection title="Опыт работы">
            {resume.experience.map((experience) => (
              <ResumeExperienceItem
                key={experience._id}
                experience={experience}
              />
            ))}
          </ResumeSection>
          <ResumeSection title="Образование">
            <div className={styles.education}>
              {resume.education.map((education) => (
                <ResumeEducationItem
                  key={education._id}
                  education={education}
                />
              ))}
            </div>
          </ResumeSection>
          <ResumeSection title="Навыки">
            <List className={styles.skills}>
              {resume.skills.map((skill) => (
                <List.Item key={skill}>{skill}</List.Item>
              ))}
            </List>
          </ResumeSection>
        </div>
      </div>
    </Container>
  );
});
