export const API_URL: { [key: string]: string } = {
  development: 'https://kharcha-paani.herokuapp.com',
  production: 'https://kharcha-paani.herokuapp.com',
};

export const getEnv = (): string => {
  return import.meta.env.MODE;
};

export const getApiUrl = (): string => {
  return import.meta.env.VITE_API_URL || API_URL[getEnv()];
};
