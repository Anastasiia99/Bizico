import axios from "axios";

export function getArticles(tag, page) {
  let url = "https://dev.to/api/articles";

  if (tag || page) {
    let params = [];
    url += "?";

    if (page) {
      params.push(`page=${page}`);
    }

    if (tag) {
      params.push(`tag=${tag}`);
    }

    url += params.join("&");
  }

  return axios.get(url);
}

export function getUser(username) {
  return axios.get(`https://dev.to/api/users/by_username?url=${username}`);
}
export function getTags() {
  return axios.get("https://dev.to/api/tags");
}

export function getArtByUser(username) {
  return axios.get(`https://dev.to/api/articles?username=${username}`);
}

export function getArtById(id) {
  return axios.get(`https://dev.to/api/articles/${id}`);
}
