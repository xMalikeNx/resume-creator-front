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

export type ResumeDto = {
  name: string;
  url?: string;
  skills?: string[];
  experience?: {
    company: string;
    position?: string;
    startDate: string;
    endDate?: string;
    duties?: string[];
    description?: string;
  };
  education?: {
    institution: string;
    speciality: string;
    startDate: string;
    endDate?: string;
  };
};
