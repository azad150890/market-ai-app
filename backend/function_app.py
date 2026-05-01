import azure.functions as func
import json
import random

app = func.FunctionApp()

@app.function_name(name="get_market_data")
@app.route(route="get_market_data", auth_level=func.AuthLevel.ANONYMOUS)
def get_market_data(req: func.HttpRequest) -> func.HttpResponse:

    symbol = req.params.get("symbol")

    if not symbol:
        return func.HttpResponse(
            "Send symbol like BTC",
            status_code=400
        )

    prices = [random.randint(60000, 65000) for _ in range(10)]
    
    avg = sum(prices) / len(prices)
    last = prices[-1]

    signal = "BUY" if last > avg else "SELL"

    return func.HttpResponse(
        json.dumps({
            "symbol": symbol,
            "prices": prices,
            "avg": avg,
            "signal": signal
        }),
        mimetype="application/json",
        headers={
        "Access-Control-Allow-Origin": "*"
    }
    )