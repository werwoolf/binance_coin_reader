import {WebSocket} from "ws";
import * as crypto from "node:crypto";
import "dotenv/config";
import {ConfigService} from "./services/ConfigService";
import {PrismaClient} from "@prisma/client";

const socket = new WebSocket(ConfigService.get("BINANCE_WS_API_PATH"));

// fetch('https://api.binance.com/api/v3/exchangeInfo')
//     .then(res=> res.json())
//     .then(res=> {
//         console.log(res?.symbols.map(({symbol}) => symbol))
//     });

socket.on("open", () => {
    console.log("SOCKET open")
    setInterval(() => {
        console.log()
        socket.send(JSON.stringify({
            "id": crypto.randomUUID(),
            "method": "ticker.price",
            "params": {
                "symbols": ConfigService.get("SYMBOLS_TO_WATCH").split(",")
            }
        }))
    }, 1000)

});

socket.on("close", () => {
    console.log("SOCKET closed")
});

socket.on("error", (...a) => {
    console.log("ERROR", a)
})

socket.on("message", (data) => {
    const result = JSON.parse(data.toString()).result; // todo: validate

    if (result) {
        const prisma = new PrismaClient();
        prisma.coinPrice.createMany({
            data: result.map(({price, ...rest}) => (
                {...rest, price: parseFloat(price)}
            ))
        }).then(console.log).catch(console.log)
    }
})


socket.on("ping", (message) => {
    console.log("PING", message.toString())
})
