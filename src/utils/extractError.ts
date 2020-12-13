export const extractError = (error: any) => {
  console.dir(error);
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.message
  ) {
    return error.response.data.message;
  }
  return '';
};
