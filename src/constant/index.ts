// API Configuration
export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:8903",
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
};

// User Roles
export const USER_ROLES = {
    ADMIN: 'ADMIN',
    ARTIS: 'ARTIS',
    USER: 'USER',
};

// Song Status
export const SONG_STATUS = {
    WAIT: 'Wait',
    ACTIVATE: 'Activate',
    SHUTDOWN: 'ShutDown',
};

// File Upload Limits
export const FILE_LIMITS = {
    IMAGE_MAX_SIZE: 1000000,
    AUDIO_MAX_SIZE: 19000000,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
    ALLOWED_AUDIO_TYPES: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
};

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 5,
    DEFAULT_PAGE: 1,
};

// Local Storage Keys
export const STORAGE_KEYS = {
    ACCOUNT: 'account',
    TOKEN: 'token'
};