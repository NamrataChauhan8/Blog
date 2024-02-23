import axios from 'axios';
import { API_NOTIFICATION_MESSAGE, SERVICE_URLS } from '../constants/config';
import { getAccessToken ,getType  } from '../utils/common-utils';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(   
    function(config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(processError(error));
    }
);

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status || 'Unknown',
            msg: 'Request failed with status code ' + (response?.status || 'Unknown'),
            code: response?.status || 'Unknown'
        };
    }
};

const processError = (error) => {
    if (error.response) {
        console.log('ERROR IN RESPONSE: ', error.response.status);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGE.responseFailure,
            code: error.response.status
        };
    } else if (error.request) {
        console.log('ERROR IN REQUEST: ', error.request);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGE.requestFailure,
            code: ''
        };
    } else {
        console.log('ERROR IN NETWORK: ', error.message);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGE.networkError,
            code: ''
        };
    }
};


const API = {
    signupUser: async (userData) => {
        try {
            const response = await axiosInstance.post('/signup', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            }
        });
}

export default API; // Export API as default
