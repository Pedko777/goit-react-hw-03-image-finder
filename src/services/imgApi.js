import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const apiKey = '15374361-4cc1c871c88fd85287a24e6ed';

const fetchImagesWithQuery = (searchQuery, page = 1) => {
  return axios(
    `/?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => response.data.hits);
};

export default { fetchImagesWithQuery };