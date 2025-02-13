export interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  dateOfDeath?: string | null;
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
