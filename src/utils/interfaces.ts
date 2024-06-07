export interface CommitmentFile {
  secret: string;
  addr: string;
  commitment: string;
}

export interface PassFile extends RegDataToSend {
  root: string;
}

export interface AgeInput {
  birthdayTimestamp: string;
  nowTimestamp: string;
  pathElements: string[3];
  pathIndices: string[3];
  root: string;
}

export interface RegFormData {
  evmAddress: string;
  lastName: string;
  firstName: string;
  middleName: string;
  country: string;
  snils: string;
  passport: string;
  birthDate: Date | null;
  gender: string;
}

export interface RegFormDataErrors {
  evmAddress: string;
  lastName: string;
  firstName: string;
  middleName: string;
  country: string;
  snils: string;
  passport: string;
  birthDate: string;
  gender: string;
}

export interface RegDataToSend extends Omit<RegFormData, "birthDate"> {
  birthDate: number | null;
}
