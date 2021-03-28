export interface Person {
  id: string;
  birthday: string;
  name: string;
}

export interface PersonData {
  birthday: string;
  id: string;
  person_name: string;
}

export interface PersonUIData {
  birthday: string; // should be date
  id: string;
  person_name: string;
  offsetX?: number;
  offsetY?: number;
}

export type AddPersonFormData = {
  birthday: string;
  name: string;
};
