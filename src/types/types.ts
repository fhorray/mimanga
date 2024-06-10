import type { Request } from "express";
import type { Session, SessionData } from "express-session";

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
  passport?: {
    user: string;
  };
}

export interface CustomRequestData extends Request {
  session: Session & Partial<CustomSessionData>;
}

export interface TypeError extends Error {}
