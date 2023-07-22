export const ApiConfig = {
  BASE_URL: 'https://appkeynesttest.azurewebsites.net/api/', // api base url
  VERSION: 'v1',
  API_VERSION: '2.0', // api version
  UNIQUE_ID: '253d70e1011a2a52', //move outside the sdk
  CUSTOMER_ID: null,
  TOKEN: null,
};

export const ApiMethod = {
  GET: 'get',
  POST: 'POST'
}

export const ApiEndPoint = {
  GET_location: 'Store/GetNearestStore'
}

export const returnApiHeader = () => {
  let data = {
    "AppVersion": ApiConfig.API_VERSION,
    "UniqueId": ApiConfig.UNIQUE_ID,
    "customerId": ApiConfig.CUSTOMER_ID,
    "Content-Type": 'application/json',
    "Authorization": `Bearer ${ApiConfig.TOKEN}`
  }
  return data
}