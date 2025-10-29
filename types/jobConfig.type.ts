export interface JobConfig {
  application_form: ApplicationForm;
}

export interface ApplicationForm {
  sections: Section[];
}

export interface Section {
  title: string;
  fields: Field[];
}

export interface Field {
  key: string;
  label: string;
  validation: Validation;
}

export interface Validation {
  required: boolean;
}
