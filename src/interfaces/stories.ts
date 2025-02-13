export interface StoryResource {
  id: string;
  type: string;
  links: {
    self: string;
  };
  attributes: {
    title: string;
    content: string;
    "date-type": 'exact' | 'year';
    "story-date": string | null;
    "story-year": string | null;
    "is-date-approx": boolean;
    "created-at": string;
    "updated-at": string;
  };
}

export interface StoriesResponse {
  data: StoryResource[];
}


export interface Story {
  id: string;
  title: string;
  date: string;
}

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
