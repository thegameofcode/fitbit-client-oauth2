const FITBIT_BASE_API_URL = 'https://fitbit.com';
const FITBIT_BASE_API_URL_TOKEN = 'https://api.fitbit.com';
const FITBIT_AUTH_PATH = '/oauth2/authorize';
const FITBIT_TOKEN_PATH = '/oauth2/token';
const FITBIT_DEFAULT_SCOPE = [ 'activity', 'nutrition', 'profile', 'settings', 'sleep', 'social', 'weight' ];

module.exports = {
  FITBIT_BASE_API_URL: FITBIT_BASE_API_URL,
  FITBIT_AUTH_PATH: FITBIT_AUTH_PATH,
  FITBIT_TOKEN_PATH: FITBIT_TOKEN_PATH,
  FITBIT_DEFAULT_SCOPE: FITBIT_DEFAULT_SCOPE,
  FITBIT_BASE_API_URL_TOKEN: FITBIT_BASE_API_URL_TOKEN
};
