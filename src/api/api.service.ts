import axiosHelper from "./api.config";

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
};

const apiPath = {
    AUTH: {
        login: "/api/auth/login",
        register: "/api/auth/register",
        logout: "/auth/logout",
    },
    SONG: {
        create: "/api/song/create",
        update: "/api/song/update",
        delete: "/api/song/delete",
        get: "/api/song/get",
        getAll: "/api/song/getAll",
    },
    USER: {
        create: "/api/user/create",
        update: "/api/user/update",
        delete: "/api/user/delete",
        get: "/api/user/get",
        getAll: "/api/user/getAll",
    },
    ALBUM: {
        create: "/api/album/create",
        update: "/api/album/update",
        delete: "/api/album/delete",
        get: "/api/album/get",
        getAll: "/api/album/getAll",
    },
    ARTIST: {
        create: "/api/artist/create",
        update: "/api/artist/update",
        delete: "/api/artist/delete",
        get: "/api/artist/get",
        getAll: "/api/artist/getAll",
    },
    GENRE: {
        create: "/api/genre/create",
        update: "/api/genre/update",
        delete: "/api/genre/delete",
        get: "/api/genre/get",
        getAll: "/api/genre/getAll",
    },
    PLAYLIST: {
        create: "/api/playlist/create",
        update: "/api/playlist/update",
        delete: "/api/playlist/delete",
        get: "/api/playlist/get",
        getAll: "/api/playlist/getAll",
    },
    PLAYLIST_SONG: {
        create: "/api/playlistSong/create",
        update: "/api/playlistSong/update",
        delete: "/api/playlistSong/delete",
        get: "/api/playlistSong/get",
        getAll: "/api/playlistSong/getAll",
    },
};

const AUTH = {}

const SONG = {}

const USER = {}

const ALBUM = {}

const ARTIST = {}

const GENRE = {
    create: async (data: any) => {
        return await axiosHelper().post(apiPath.GENRE.create, data);
    },
    update: async (id: string, data: any) => {
        return await axiosHelper().put(`${apiPath.GENRE.update}/${id}`, data);
    },
    delete: async (id: string) => {
        return await axiosHelper().delete(`${apiPath.GENRE.delete}/${id}`);
    },
    get: async (id: string) => {
        return await axiosHelper().get(`${apiPath.GENRE.get}/${id}`);
    },
    getAll: async () => {
        return await axiosHelper().get(apiPath.GENRE.getAll);
    },
}

const PLAYLIST = {}

const PLAYLIST_SONG = {}

export const AXIOS_API = { AUTH, SONG, USER, ALBUM, ARTIST, GENRE, PLAYLIST, PLAYLIST_SONG };