import { fetchUtil } from './fetcher';

const post = (url, body) => {
  return fetchUtil(url, { 
    method: 'POST', 
    body: JSON.stringify(body) 
  });
}

export { post };
