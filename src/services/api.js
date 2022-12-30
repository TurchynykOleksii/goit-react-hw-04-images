import axios from 'axios';

const API_KEY = '31333113-bd66c453b27bf0e534c1413fe';
axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 12,
  image_type: 'photo',
};
export const getImages = async (query, page) => {
  const { data } = await axios.get(`/?q=${query}&page=${page}&key=${API_KEY}`);
  const { hits, totalHits, total } = data;
  const parsedHits = hits.map(({ id, webformatURL, tags, largeImageURL }) => ({
    id,
    webformatURL,
    tags,
    largeImageURL,
  }));
  return { hits: parsedHits, totalHits, total };
};


