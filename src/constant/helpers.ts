// Debounce function for search and input handling
export const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
};
  
export const throttle = <T extends (...args: any[]) => void>(func: T, limit: number) => {
    let inThrottle = false;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => { inThrottle = false; }, limit);
      }
    };
};
  
  
// Deep clone object
export const deepClone = <T>(obj: T): T => {
    if (obj === null || typeof obj !== "object") return obj;
  
    if (obj instanceof Date) return new Date(obj.getTime()) as T;
    if (Array.isArray(obj)) return obj.map(item => deepClone(item)) as T;
  
    const clonedObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone((obj as any)[key]);
      }
    }
    return clonedObj as T;
};
  
  
// Generate unique ID
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
  
// Format time in seconds to MM:SS
export const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};  
  
// Calculate percentage
export const calculatePercentage = (value: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
};  
  
// Get file extension
export const getFileExtension = (filename: string): string => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};  
  
// Check if file is image
export const isImageFile = (file: File): boolean => {
    const imageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    return imageTypes.includes(file.type);
};
  
export const isAudioFile = (file: File): boolean => {
    const audioTypes = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp3"];
    return audioTypes.includes(file.type);
};
  
  
// Create object URL for file preview
export const createObjectURL = (file: File): string => URL.createObjectURL(file);

export const revokeObjectURL = (url: string): void => {
  if (url && url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
};
  
// Local storage helpers with error handling
export const storage = {
    get: <T>(key: string, defaultValue: T | null = null): T | null => {
      try {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : defaultValue;
      } catch (error) {
        console.error("Error reading from localStorage:", error);
        return defaultValue;
      }
    },
    set: (key: string, value: unknown): boolean => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error("Error writing to localStorage:", error);
        return false;
      }
    },
    remove: (key: string): boolean => {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error("Error removing from localStorage:", error);
        return false;
      }
    },
    clear: (): boolean => {
      try {
        localStorage.clear();
        return true;
      } catch (error) {
        console.error("Error clearing localStorage:", error);
        return false;
      }
    }
};  
  
// Error handling helper
export const handleError = (error: any, defaultMessage = "An error occurred"): string => {
    console.error("Error:", error);
    if (error.response) {
      return error.response.data?.message || error.response.statusText || defaultMessage;
    } else if (error.request) {
      return "Network error. Please check your connection.";
    } else {
      return error.message || defaultMessage;
    }
};  
  
// Retry function for API calls
export const retry = async <T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return retry(fn, retries - 1, delay * 2);
      }
      throw error;
    }
};  
  
// Check if device is mobile
export const isMobile = (): boolean => window.innerWidth <= 768;
export const isTablet = (): boolean => window.innerWidth > 768 && window.innerWidth <= 1024;
export const isDesktop = (): boolean => window.innerWidth > 1024;