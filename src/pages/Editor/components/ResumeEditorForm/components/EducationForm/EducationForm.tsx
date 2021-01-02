import React, { FC } from 'react';
import { Input } from '../../../../../../components/Input';
import { TCreatableEducationModel } from './models/education.model';

export type TEducationForm = {
  item: TCreatableEducationModel;
};

export const EducationForm: FC<TEducationForm> = ({ item }) => (
  <div>
    <Input
      field={item.institution}
      title="Название образовательной организации"
    />
    <Input field={item.speciality} title="Специальность" />
    <Input field={item.startDate} title="Начало обучения" />
    <Input field={item.endDate} title="Окончание обучения" />
  </div>
);
