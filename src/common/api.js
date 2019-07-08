import axios from "axios";

export function getArticles(tag) {
  if (tag) {
    return axios.get(`https://dev.to/api/articles?tag=${tag}`);
  }
  return axios.get("https://dev.to/api/articles");
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
