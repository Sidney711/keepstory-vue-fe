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
  internmentPlace: string;
  profession: string;
  hobbiesAndInterests: string;
  relationShipTree: FamilyRelationship[];
  marriageDetails: MarriageDetails[];
  educationDetails: EducationDetails[];
  employmentDetails: EmploymentDetails[];
  residenceAddressDetails: ResidenceAddressDetails[];
  additionalAttributeDetails: AdditionalAttributeDetails[];
  profilePictureUrl?: string;
  signatureUrl?: string;
}

export interface FamilyRelationship {
  id: string;
  firstName: string;
  lastName: string;
  relationship: 'mother' | 'father' | 'grandparent' | 'descendant' | 'sibling';
}

export interface MarriageDetails {
  id: string;
  partnerId: string;
  firstName: string;
  lastName: string;
  period: string;
}

export interface EducationDetails {
  id: string;
  schoolName: string;
  address: string;
  period: string;
}

export interface EmploymentDetails {
  id: string;
  employer: string;
  address: string;
  period: string;
}

export interface FamilyRelationshipResponse {
  id: string;
  'first-name': string;
  'last-name': string;
  relationship: 'mother' | 'father' | 'grandparent' | 'descendant' | 'sibling';
}

export interface MarriageDetailsResponse {
  id: string;
  'partner-id': string;
  'first-name': string;
  'last-name': string;
  period: string;
}

export interface EducationDetailsResponse {
  id: string;
  'school-name': string;
  'address': string;
  'period': string;
}

export interface AdditionalAttributeResponse {
  id: string;
  'attribute-name': string;
  'long-text': string;
}

export interface ResidenceAddressDetails {
  id: string;
  address: string;
  period: string;
}

export interface AdditionalAttributeDetails {
  id: string;
  attributeName: string;
  longText: string;
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
    'internment-place': string;
    profession: string;
    'hobbies-and-interests': string;
    'relationship-tree': FamilyRelationshipResponse[];
    'marriage-details': MarriageDetailsResponse[];
    'education-details': EducationDetailsResponse[];
    'employment-details': EmploymentDetails[];
    'residence-address-details': ResidenceAddressDetails[];
    'additional-attribute-details': AdditionalAttributeResponse[];
    'profile_picture_url'?: string;
    'signature_url'?: string;
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

export interface UpdateFamilyMemberPayload {
  data: {
    type: 'family-members';
    id: string;
    attributes: {
      'first-name': string;
      'last-name': string;
      'date-of-birth': string;
      deceased: boolean;
      'date-of-death'?: string | null;
      'death-date'?: string;
      'birth-last-name': string;
      'birth-place': string;
      'birth-time': string;
      gender: string;
      religion: string;
      'death-time'?: string;
      'death-place'?: string;
      'cause-of-death'?: string;
      'burial-date'?: string;
      'burial-place'?: string;
      'internment-place'?: string;
      profession?: string;
      'hobbies-and-interests': string;
      'short-description': string;
      'short-message': string;
      'mother-id': string;
      'father-id': string;
    },
    relationships: {
      mother: {
        data: { type: "family-members", id: number }
      },
      father: {
        data: { type: "family-members", id: number }
      }
    }
  }
}
