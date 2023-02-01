import db from "../db.js";
import { faker } from "@faker-js/faker";

export const getPassengers = async (req, res) => {
  try {
    const passengers = await db.select("*").from("passengers");
    res.json(passengers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPassenger = async (req, res) => {
  try {
    const passenger = await db
      .select("*")
      .from("passengers")
      .where({ ticketNum: req.params.id });
    res.json(passenger);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPassenger = async (req, res) => {
  try {
    db.select("*")
      .from("passengers")
      .where({ ticketNum: req.body.ticketNum })
      .first()
      .then((passenger) => {
        if (passenger) {
          res.json("already exists");
        } else {
          db("passengers")
            .insert({
              ticketNum: req.body.ticketNum,
              name: req.body.name,
              seatType: faker.helpers.arrayElement([
                "window",
                "aisle",
                "middle",
              ]),
              seatClass: faker.helpers.arrayElement([
                "economy",
                "business",
                "first",
              ]),
              neighbors: null,
              exactSeat: null,
              veteran: faker.helpers.arrayElement([0, 1]),
              disabled: faker.helpers.arrayElement([0, 1]),
              elderly: faker.helpers.arrayElement([0, 1]),
            })
            .then(() => {
              res.json("success");
            })
            .catch((err) => {
              res.status(500).json({ message: err.message });
            });
        }
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
