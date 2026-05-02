import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getMarketData = (symbol) => {
  return axios.get(
    `https://market-ai-functions.azurewebsites.net/api/get_market_data?symbol=${symbol}`
  );
};