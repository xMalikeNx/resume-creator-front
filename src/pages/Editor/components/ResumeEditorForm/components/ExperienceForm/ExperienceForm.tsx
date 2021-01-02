import React, { FC } from 'react';
import { Input } from '../../../../../../components/Input';
import { MultiInput } from '../../../../../../components/MultiInput';
import { TCreatableExperienceModel } from './models/experience.model';

export type TExperienceForm = {
  item: TCreatableExperienceModel;
};

export const ExperienceForm: FC<TExperienceForm> = ({ item }) => (
  <div>
    <Input field={item.company} title="Название организации" />
    <Input field={item.position} title="Позиция" />
    <Input field={item.description} title="Описание" />
    <MultiInput field={item.duties} title="Обязанности" />
    <Input field={item.startDate} title="Начало работы" />
    <Input field={item.endDate} title="Окончание работы" />
  </div>
);
