import axios from "axios";
/*
const instance = axios.create({
  paintingsURL: "https://test-front.framework.team/paintings",
}); */

//BASE_URL = "https://test-front.framework.team";

// PAINTINGS_URL = "https://test-front.framework.team/paintings"

export const getDataAPI = async (url) => {
  const response = await axios.get(url);
  //console.log("response-api: ", response.data);
  return response.data;
};

/* export const getDataAPI = async (url) => {
  return async (dispatch) => {
    const response = await axios.get(url);
    console.log("response: ", response);
    return response;
  };
}; */
/* export const getRepos = (searchQuery = "stars:%3E1") => {
  return async (dispatch) => {
      const response = await axios.get(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars`)
      dispatch(setRepos(response.data))
  }
} */
//export default getDataAPI;
