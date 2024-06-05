import type { Session, SessionData } from 'express-session';

export interface Manga {
  id: number;
  title: string;
  cover: string;
  author: string;
  illustrator: string;
  publisher: {
    original: string;
    english: string;
  };
  demographic: string;
  genre: string[];
  originalRun: {
    start: string;
    end: string;
  };
  volumes: number;
  chapters: number;
  synopsis: string;
}

export interface CustomSessionData extends SessionData {
  visited?: boolean;
  passport?: {
    user: string;
  };
}
