import { useState } from "react";
import { getMarketData } from "./api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function App() {
  const [symbol, setSymbol] = useState("BTC");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setData(null);

    try {
      const res = await getMarketData(symbol);
      setData(res.data);
    } catch (err) {
      console.log("API Error:", err);
      alert("Failed to fetch data");
    }

    setLoading(false);
  };

  // Convert prices to chart format
  const chartData = data?.prices
    ? data.prices.map((price, index) => ({
        index,
        price
      }))
    : [];

  return (
    <div
      style={{
        padding: 30,
        fontFamily: "Arial",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white"
      }}
    >
      <h1>📊 AI Market Dashboard</h1>

      {/* INPUT SECTION */}
      <div style={{ marginBottom: 20 }}>
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter symbol (BTC, AAPL...)"
          style={{
            padding: 10,
            marginRight: 10,
            borderRadius: 5,
            border: "none"
          }}
        />

        <button
          onClick={fetchData}
          style={{
            padding: 10,
            borderRadius: 5,
            cursor: "pointer",
            background: "#38bdf8",
            border: "none",
            fontWeight: "bold"
          }}
        >
          Analyze
        </button>
      </div>

      {/* LOADING */}
      {loading && <p>Loading data...</p>}

      {/* DATA DASHBOARD */}
      {data && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            marginTop: 20
          }}
        >
          {/* SYMBOL */}
          <div
            style={{
              background: "#1e293b",
              padding: 20,
              borderRadius: 10
            }}
          >
            <h3>Symbol</h3>
            <p>{data.symbol}</p>
          </div>

          {/* AI SIGNAL */}
          <div
            style={{
              background: "#1e293b",
              padding: 20,
              borderRadius: 10
            }}
          >
            <h3>AI Signal</h3>
            <p
              style={{
                color: data.signal === "BUY" ? "limegreen" : "red",
                fontSize: 20,
                fontWeight: "bold"
              }}
            >
              {data.signal}
            </p>
          </div>

          {/* AVERAGE */}
          <div
            style={{
              background: "#1e293b",
              padding: 20,
              borderRadius: 10
            }}
          >
            <h3>Average Price</h3>
            <p>{data.avg}</p>
          </div>

          {/* LATEST PRICE */}
          <div
            style={{
              background: "#1e293b",
              padding: 20,
              borderRadius: 10
            }}
          >
            <h3>Latest Price</h3>
            <p>{data.prices[data.prices.length - 1]}</p>
          </div>

          {/* CHART */}
          <div
            style={{
              gridColumn: "span 2",
              background: "#1e293b",
              padding: 20,
              borderRadius: 10
            }}
          >
            <h3>Price Chart</h3>

            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <XAxis dataKey="index" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#38bdf8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;