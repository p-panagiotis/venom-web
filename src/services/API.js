import axios from 'axios';
import { invalidateSession } from '../contexts/Session';

const client = axios.create({
  method: 'GET',
  headers: {
    Accept: 'application/json'
  },
  data: null,
  qs: null,
  responseType: 'json'
})

const getQueryString = params => {
  return Object.keys(params).map(p => encodeURIComponent(p) + '=' + encodeURIComponent(params[p])).join('&');
}

const getFormData = options => {
  if (!options || !options.data) {
    return null;
  }

  let formData = new FormData();
  for (let key in options.data) {
    if (options.data.hasOwnProperty(key)) {
      formData.append(key, options.data[key] !== null ? options.data[key] : '');
    }
  }
  
  return formData;
}

const onSuccess = response => response.data;

const onError = error => {
  throw error.response.data;
}

const request = async (url, options) => {
  let props = { url, ...options };

  if (props.qs) {
    props.url = url + '?' + getQueryString(props.qs);
  }
  
  // process form data
  props.data = getFormData(options);

  // register response interceptor
  client.interceptors.response.use(response => {
    // any status code that lie within the range of 2xx cause this function to trigger
    return response;
  }, error => {
    // any status codes that falls outside the range of 2xx cause this function to trigger
    // invalidate session on unauthorized requests
    if (error.response.status === 401) {
      invalidateSession();
    }

    if (error.response.status === 500) {
      window.location.replace('/500');
      return;
    }

    throw error;
  });
  
  return await client({...props}).then(onSuccess).catch(onError);
}

const API = {
  get: (url, options) => request(url, { ...options, method: 'GET' }),
  post: (url, options) => request(url, { ...options, method: 'POST' }),
  put: (url, options) => request(url, { ...options, method: 'PUT' }),
  delete: (url, options) => request(url, { ...options, method: 'DELETE' }),
  patch: (url, options) => request(url, { ...options, method: 'PATCH' }),
  request: (url, options) => request(url, { ...options })
}

export default API;
