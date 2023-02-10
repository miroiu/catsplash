import { routes } from './routes';

export interface CatBreed {
  id: string;
  name: string;
  description: string;
}

export const catsClient = {
  getBreeds: (): Promise<CatBreed[]> =>
    fetch(routes.breeds).then(x => x.json()),
};
