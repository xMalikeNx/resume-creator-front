export type UpdateProfileDto = {
  firstName: string;
  lastName: string;
  about: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  profession: string;
  birthDate: string;
};

export type LoginDto = {
  login: string;
  password: string;
};

export type RegistrationDto = LoginDto;
