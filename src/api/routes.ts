export const routes = {
  breeds: () => `${import.meta.env.VITE_CATS_API_URL}/breeds`,
  cats: (breedIds: string[] = []) =>
    `${import.meta.env.VITE_CATS_API_URL}/images/search?limit=10${
      breedIds.length > 0 ? `&breed_ids=${breedIds!.join(',')}` : ''
    }`,
};
