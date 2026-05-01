import axios from "axios";

export const getMarketData = (symbol) => {
  return axios.get(
    `http://localhost:7071/api/get_market_data?symbol=${symbol}`
  );
};