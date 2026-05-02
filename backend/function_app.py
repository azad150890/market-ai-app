import azure.functions as func
import json
import requests

app = func.FunctionApp()

@app.function_name(name="get_market_data")
@app.route(route="get_market_data", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS)
def get_market_data(req: func.HttpRequest) -> func.HttpResponse:

    symbol = req.params.get("symbol")
    if not symbol:
        return func.HttpResponse(
            "Send symbol like RELIANCE, TCS, INFY",
            status_code=400
        )

    symbol = symbol.upper().strip()

    try:
        url = f"https://nse-api-ruby.vercel.app/stock?symbol={symbol}"
        response = requests.get(url)

        if response.status_code != 200:
            return func.HttpResponse("Failed to fetch market data", status_code=500)

        data = response.json()

        # Validate response
        if "price" not in data:
            return func.HttpResponse("Invalid symbol", status_code=400)

        last = float(data["price"])

        # Temporary synthetic history (replace later with real candles)
        prices = [
            last * 0.98,
            last * 0.99,
            last,
            last * 1.01,
            last * 1.02
        ]

        avg = sum(prices) / len(prices)
        short_avg = sum(prices[-3:]) / 3

        signal = "BUY" if short_avg > avg else "SELL"

        return func.HttpResponse(
            json.dumps({
                "symbol": symbol,
                "last": last,
                "avg": avg,
                "signal": signal,
                "prices": prices
            }),
            mimetype="application/json",
            headers={
                "Access-Control-Allow-Origin": "*"
            }
        )

    except Exception as e:
        return func.HttpResponse(
            f"Error: {str(e)}",
            status_code=500
        )
