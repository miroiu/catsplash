import { routes } from './routes';

export interface CatBreed {
  id: string;
  name: string;
  description: string;
}

export interface CatImage {
  id: string;
  url: string;
  height: number;
  width: number;
}

export const catsClient = {
  getBreeds: (): Promise<CatBreed[]> =>
    fetch(routes.breeds()).then(x => x.json()),
  getCats: (breedIds: string[] = []): Promise<CatImage[]> =>
    fetch(routes.cats(breedIds)).then(x => x.json()),
};
