export const API_URL: { [key: string]: string } = {
  development: 'http://localhost:5000',
  production: 'https://kharcha-paani.herokuapp.com/',
};

export const getEnv = (): string => {
  return process.env.NODE_ENV;
};

export const getApiUrl = (): string => {
  const env = getEnv();
  return API_URL[env];
};
