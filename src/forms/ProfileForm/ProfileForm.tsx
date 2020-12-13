import { observer } from 'mobx-react';
import React, { FC, FormEvent, useCallback, useContext } from 'react';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import { useStores } from '../../mst/rootStoreContext';
import { ProfileFormContext } from '../../pages/Profile/components/ProfileFormContext';

import styles from './profileForm.module.scss';

export const ProfileForm: FC = observer(() => {
  const { ui } = useStores();
  const profileFormStore = useContext(ProfileFormContext);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    profileFormStore.validate();
    if (profileFormStore.isValid()) {
      profileFormStore
        .updateProfile()
        .then(() => {
          ui.createNotification('Профиль успешно обновлен', 'success');
        })
        .catch(() => {
          ui.createNotification('Не удалось обновить профиль', 'error');
        });
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <Form bordered title="Редактирование профиля" onSubmit={handleSubmit}>
        <div className={styles.formWrapper}>
          <Input field={profileFormStore.firstName} title="Имя" required />
          <Input field={profileFormStore.lastName} title="Фамилия" required />
          <Input
            field={profileFormStore.birthDate}
            title="Дата рождения"
            required
          />
          <Input
            field={profileFormStore.profession}
            title="Текущая позиция"
            required
          />
          <Input field={profileFormStore.email} required title="Email" />
          <Input field={profileFormStore.phone} title="Телефон" />
          <Input field={profileFormStore.address} title="Адрес" />
        </div>
        <Button className={styles.submit} position="left" type="submit">
          Сохранить
        </Button>
      </Form>
    </div>
  );
});
