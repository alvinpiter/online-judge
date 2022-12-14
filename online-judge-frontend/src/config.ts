interface Config {
  backendAPIURL: string;
}

export const config: Config = {
  backendAPIURL:
    process.env.REACT_APP_BACKEND_API_URL || "http://localhost:5000/api",
};
