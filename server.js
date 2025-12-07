const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/pagar", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.mercadopago.com/instore/orders/qr/seller/collectors/" +
        process.env.MP_USER_ID +
        "/pos/" +
        process.env.MP_POS_ID +
        "/qrs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          title: "Produto JD STORE",
          description: "Compra no site JD STORE",
          total_amount: 10,
          external_reference: "JD1234"
        }),
      }
    );

    const data = await response.json();

    res.json({
      qr: data.qr_data,
      copiar_cola: data.toll_info?.qr_code ?? null
    });
  } catch (e) {
    res.json({ erro: e.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
