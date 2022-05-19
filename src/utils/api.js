import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://test-front.framework.team/',
});

async function getDataAPI(url) {
  const response = await instance.get(url);
  return response.data;
}

export default getDataAPI;
