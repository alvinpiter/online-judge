interface Config {
  backendAPIURL: string;
  contestStartTimeInMilliseconds: number;
}

export const config: Config = {
  backendAPIURL:
    process.env.REACT_APP_BACKEND_API_URL || "http://localhost:7777/api",
  contestStartTimeInMilliseconds: parseInt(
    process.env.REACT_APP_CONTEST_START_TIME_IN_MILLISECONDS || "1672502400000"
  ),
};
