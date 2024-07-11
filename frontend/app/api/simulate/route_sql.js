import axios from "axios";
import mysql from "mysql2";
import { NextResponse } from "next/server";
import { generateVehicleData } from "@/lib/utils/simulator";

require("dotenv").config();

// MySQL Database Configuration from environment variables
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "predictions_db",
};

// Create MySQL Connection Pool
const pool = mysql.createPool(dbConfig);

export async function POST(req, res) {
  try {
    const data = generateVehicleData();

    // Simulating sending data to an ML model API endpoint
    // const response = await axios.post('http://localhost:8000/recommendations', data);
    const response = { data: { prediction: Math.floor(Math.random() * 2) } };
    const currentDate = new Date();

    // Store prediction in MySQL database
    const insertQuery = `INSERT INTO engine_predictions (prediction, date) VALUES (?, ?)`;
    const values = [response.data.prediction, currentDate];

    pool.query(insertQuery, values, (error, results, fields) => {
      if (error) {
        console.error("Error storing prediction in MySQL:", error);
        return NextResponse.json(
          {
            success: false,
            message: "Failed to store prediction in database.",
          },
          { status: 500 }
        );
      }
      console.log("Prediction stored in MySQL:", results);
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to send data to the ML model." },
      { status: 500 }
    );
  }
}
