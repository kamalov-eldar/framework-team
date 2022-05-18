import axios from 'axios';

async function getDataAPI(url) {
  const response = await axios.get(url);
  return response.data;
}

export default getDataAPI;
