export interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  dateOfDeath: string;
  shortMessage: string;
  birthLastName: string;
  birthPlace: string;
  birthTime: string;
  gender: string;
  religion: string;
  deceased: boolean;
  shortDescription: string;
  deathTime: string;
  deathPlace: string;
  causeOfDeath: string;
  burialPlace: string;
  burialDate: string;
  intermentPlace: string;
}

export interface FamilyMemberResponse {
  id: string;
  type: string;
  links: {
    self: string;
  };
  attributes: {
    'first-name': string;
    'last-name': string;
    'date-of-birth'?: string;
    'date-of-death'?: string | null;
    'created-at': string;
    'updated-at': string;
    'short-message': string;
    'birth-last-name': string;
    'birth-place': string;
    'birth-time': string;
    gender: string;
    religion: string;
    deceased: boolean;
    'short-description': string;
    'death-time': string;
    'death-place': string;
    'cause-of-death': string;
    'burial-place': string;
    'burial-date': string;
    'interment-place': string;
  };
}

export interface FamilyMembersResponse {
  data: FamilyMemberResponse[];
}

export interface NewFamilyMemberPayload {
  data: {
    attributes: {
      first_name: string;
      last_name: string;
      date_of_birth?: string;
      date_of_death?: string;
    };
  };
}
