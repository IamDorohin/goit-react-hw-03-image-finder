import axios from 'axios';

const KEY = '30234526-30dbaada1436fb2bf1e0a6a2b';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchAPI = async (searchQuery, queryPage) => {
  const response = await axios.get('', {
    params: {
      q: searchQuery,
      page: queryPage,
      key: KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return response.data;
};
