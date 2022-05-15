import axios from 'axios';
/*
const instance = axios.create({
  paintingsURL: "https://test-front.framework.team/paintings",
}); */

// BASE_URL = "https://test-front.framework.team";

// PAINTINGS_URL = "https://test-front.framework.team/paintings"

async function getDataAPI(url) {
  const response = await axios.get(url);
  // console.log('response-api: ', response.data);
  return response.data;
}

export default getDataAPI;
