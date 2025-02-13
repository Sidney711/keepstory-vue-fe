export interface NewStoryPayload {
  data: {
    type: 'stories';
    attributes: {
      title: string;
      content: string;
      date_type: 'exact' | 'year';
      story_date?: string;
      story_year?: string;
      "is_date-approx": boolean;
    };
    relationships: {
      family_members: {
        data: {
          type: 'family_members';
          id: string;
        }[];
      };
    };
  };
}
