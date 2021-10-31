const express = require('express');
const app = express();
app.use(express.json());

const vehicles = [
    { "type":"Taxi", "carPlateNo":"SHA1111Z" }
];

const garages = [
    { "garageNo":1, "address":"Address 1" }
];

app.post("/vehicle", function (req, res) {
    if (vehicles.length > 0 && vehicles.some((v) => v.carPlateNo === req.body.carPlateNo)) {
      res.status(409);
      return res.send(`Vehicle ${req.body.carPlateNo} exists in the database.`);
    }
    vehicles.push(req.body);
    res.json(req.body);
});

app.get("/vehicle", function (req, res) {
    res.json(vehicles);
});

app.put("/vehicle/:carPlateNo", function (req, res) {
    for (v of vehicles) {
      if (v.carPlateNo === req.body.carPlateNo) {
        v.type = req.body.type
        res.status(200);
        return res.send("Car plate number updated successfully");
      }
    }
    res.status(404);
    res.send("Car plate number not found.");
});

app.post("/garage", function (req, res) {
    if (garages.length > 0 && garages.some((g) => g.garageNo === req.body.garageNo)) {
        res.status(200);
        return res.send("Success");
      }
    garages.push(req.body);
    res.json(req.body);
});

app.get("/garage/:garageNo", function (req, res) {
    res.json(garages);
});

app.listen(3000);