export interface Manga {
  id: number;
  title: string;
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
