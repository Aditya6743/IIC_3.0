export interface MentorSocials {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
  instagram?: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  headline: string;
  image: string;
  socials?: MentorSocials;
}
