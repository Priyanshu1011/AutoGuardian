import axios from "axios";
import { NextResponse } from "next/server";
import { generateVehicleData } from "@/lib/utils/simulator";

require("dotenv").config();


export async function POST(req, res) {
  try {
    const data = generateVehicleData();

    // Simulating sending data to an ML model API endpoint
    // const response = await axios.post('http://localhost:8000/recommendations', data);
    const response = { data: { prediction: Math.floor(Math.random() * 2) } };
    const currentDate = new Date();


    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to send data to the ML model." },
      { status: 500 }
    );
  }
}
