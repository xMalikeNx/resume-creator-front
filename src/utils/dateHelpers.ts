import { format } from 'date-fns';

export const formatDate = (date: string | undefined) => {
  if (!date) {
    return '';
  }

  return format(new Date(date), 'dd.mm.yyyy');
};
