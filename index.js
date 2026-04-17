require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const BASE_URL = "https://www.nellobytesystems.com/APIAirtimeV1.asp";

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("INKOTASUB BACKEND WORKING 🚀");
});

const axios = require("axios");

app.get('/ip', async (req, res) => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    res.send(response.data.ip);
  } catch (error) {
    res.status(500).send("Error fetching IP");
  }
});

// BUY AIRTIME
app.post("/buy-airtime", async (req, res) => {
  try {
    const { network, phone, amount } = req.body;

    const response = await axios.get(BASE_URL, {
      params: {
        UserID: process.env.CLUBKONNECT_USERID,
        APIKey: process.env.CLUBKONNECT_APIKEY,
        MobileNetwork: network,
        Amount: amount,
        MobileNumber: phone
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "Airtime purchase failed",
      details: error.message
    });
  }
});

// BUY DATA (example)
app.post("/buy-data", async (req, res) => {
  try {
    const { network, phone, plan } = req.body;

    const response = await axios.get(
      "https://www.nellobytesystems.com/APIDatabundleV1.asp",
      {
        params: {
          UserID: process.env.CLUBKONNECT_USERID,
          APIKey: process.env.CLUBKONNECT_APIKEY,
          MobileNetwork: network,
          DataPlan: plan,
          MobileNumber: phone
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "Data purchase failed",
      details: error.message
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});