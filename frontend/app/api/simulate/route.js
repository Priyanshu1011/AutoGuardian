import axios from "axios";
import { NextResponse } from "next/server";
import { generateVehicleData } from "@/lib/utils/simulator";

require("dotenv").config();


export async function POST(req, res) {
  try {
    const data = generateVehicleData();
    // const data= {"engine_rpm": parseFloat(700.00),
    //             "lub_oil_pressure":parseFloat(2.4916),
    //             "fuel_pressure": parseFloat(16.193866),
    //             "coolant_pressure": parseFloat(2.464504),
    //             "lub_oil_temp": parseFloat(77.640934),
    //             "coolant_temp": parseFloat(72.445724),
    //             "temp_difference": parseFloat(-4.80479)};
    // Simulating sending data to an ML model API endpoint
    const response = await axios.post('http://127.0.0.1:8000/predict', data);
    // const response = { data: { prediction: Math.floor(Math.random() * 2) } };
    const currentDate = new Date();
    
    data['prediction'] = response.data.result;
    console.log(data)
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to send data to the ML model." },
      { status: 500 }
    );
  }
}
