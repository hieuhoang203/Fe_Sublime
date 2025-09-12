import { API_CONFIG, STORAGE_KEYS } from "@/constant";
import { handleError, retry } from "@/constant/helpers";
import axios from "axios";
import axiosRetry from "axios-retry";

const axiosHelper = () => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  axiosRetry(instance, {
    retries: API_CONFIG.RETRY_ATTEMPTS,
    retryDelay: () => 1000,
    retryCondition: (error) => error.response?.status === 401,
  });

  return instance;
};

// Request interceptor
axiosHelper().interceptors.request.use(
    (config) => {
        // Add auth token to requests
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Add timestamp to prevent caching
        if (config.method === 'get') {
            config.params = {
                ...config.params,
                _t: Date.now(),
            };
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Response interceptor
axiosHelper().interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config as any;
        
        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            // Clear stored auth data
            localStorage.removeItem(STORAGE_KEYS.ACCOUNT);
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
            
            // Redirect to login (handled by AxiosInterceptor component)
            return Promise.reject(error);
        }
        
        // Handle network errors with retry
        if (!error.response && error.code === 'ECONNABORTED') {
            if (originalRequest._retryCount < API_CONFIG.RETRY_ATTEMPTS) {
                originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
                
                try {
                    return await retry(() => axiosHelper().request(originalRequest));
                } catch (retryError) {
                    return Promise.reject(retryError);
                }
            }
        }
        
        return Promise.reject(error);
    }
);

// Enhanced error handling
export const apiRequest = async (config: any) => {
    try {
        const response = await axiosHelper().request(config);
        return response;
    } catch (error) {
        const errorMessage = handleError(error as any);
        throw new Error(errorMessage);
    }
};

export default axiosHelper;