import axios from "axios"

export function getArticles(){
 return axios.get('https://dev.to/api/articles');
}

export function getTags(){
    return axios.get('https://dev.to/api/tags');
   }




