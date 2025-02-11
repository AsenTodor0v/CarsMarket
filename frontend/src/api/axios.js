import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/", // Adjust this to your backend's base URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401 && error.response.data.code === "token_not_valid") {
            // Token expired, attempt to refresh
            const refreshToken = localStorage.getItem("refreshToken");

            try {
                const response = await axios.post("/token/refresh/", { refresh: refreshToken });
                localStorage.setItem("accessToken", response.data.access); // Store new access token
                error.config.headers["Authorization"] = `Bearer ${response.data.access}`; // Retry original request with new token
                return axios(error.config); // Retry the failed request
            } catch (err) {
                // Handle refresh token expiration or failure
                console.log("Refresh token expired or invalid.");
                // Redirect to login page or clear localStorage
                localStorage.clear();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
