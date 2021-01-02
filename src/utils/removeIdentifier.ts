export const removeIdentifier = <T extends Record<string, any>>(data: T) => {
  if (!data) {
    return data;
  }

  if (data._id) {
    delete data._id;
  }

  if (data.id) {
    delete data.id;
  }

  return data;
};
