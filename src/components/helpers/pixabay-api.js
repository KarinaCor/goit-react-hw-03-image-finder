import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39441457-7e0b81e04f2eb10af3ac9213f';

export default class PostsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;
  }

  async fetchPost() {
    const OPTIONS = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 12,
    });

    try {
      const response = await axios.get(`${BASE_URL}?${OPTIONS.toString()}`);
      this.incrementPage();
      return response.data;
    } catch (error) {
      console.error(error.toJSON());
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get hits() {
    return this.totalHits;
  }

  set hits(newTotalHits) {
    this.totalHits = newTotalHits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}


// import axios from 'axios';

// export class PixabayApi {
//   #BASE_URL = 'https://pixabay.com/';
//   #END_POINT = 'api/';
//   #API_KEY = '39441457-7e0b81e04f2eb10af3ac9213f';

//   constructor(perPage) {
//     this.per_page = perPage;
//     this.page = 1;
//     this.q = '';
//   }

//   async getImg() {
//     const options = {
//       params: {
//         key: this.#API_KEY,
//         q: this.q,
//         page: this.page,
//         per_page: this.per_page,
//         orientation: 'horizontal',
//         image_type: 'photo',
//         safesearch: true,
//       },
//     };
//     const { data } = await axios.get(
//       `${this.#BASE_URL}${this.#END_POINT}`,
//       options
//     );
//     return data;
//   }
// }