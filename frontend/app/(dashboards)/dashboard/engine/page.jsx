"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import NavBar from "@/components/NavBar";
import { useUser } from "@auth0/nextjs-auth0/client";

const Engine = () => {
  const secondsIncrement = 5;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [isEngineMaintenanceNeeded, setIsEngineMaintenanceNeeded] =
    useState(false);
  const { user, error, isLoading } = useUser();

  const handleSimulateData = async () => {
    try {
      const response = await axios.post("/api/simulate");
      setData((prevData) => [
        ...prevData,
        { name: `t=${count}s`, ...response.data },
      ]);
      console.log(data[data.length-1]);
      

      if (data[data.length - 1]["prediction"] == 1) {
        setIsEngineMaintenanceNeeded(true);
      }
      else {
        setIsEngineMaintenanceNeeded(false);
      }
      // setData((prevData) => [...prevData, response.data.data]);
      setCount((count) => count + secondsIncrement);
    } catch (error) {
      console.error(error);
    }
  };

  // Simulate data generation every second
  useEffect(() => {
    const interval = setInterval(handleSimulateData, secondsIncrement*1000);
    return () => clearInterval(interval);
  }, [count]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) {
    return (
      <div>
        <NavBar />
        <h1 className="flex items-center justify-center pt-4 lg:pt-8 text-xl font-semibold">
          Login to get access to your dashboard.
        </h1>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <section className="flex flex-col px-4 py-4 md:px-6 lg:px-48 lg:py-10">
        <section className="flex flex-col gap-y-2 mb-4 md:mb-6 lg:mb-10">
          <h1 className="text-3xl font-bold text-primary-color">Engine</h1>
          <h2 className="text-2xl font-semibold">
            Get to know your vehicles engine health in real-time
          </h2>
        </section>
        <section>
          {isEngineMaintenanceNeeded ? (
            <div className="flex items-center justify-center text-red-500">
              Engine Maintenance Needed!
            </div>
          ) : (
            <div className="flex items-center justify-center text-green-600">
              Engine Maintenance NOT Needed
            </div>
          )}
        </section>
        {/* Displaying the charts of engine metrics v/s Time */}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="engine_rpm" stroke="#8884d8" />
            <Line type="monotone" dataKey="lub_oil_pressure" stroke="#82ca9d" />
            <Line type="monotone" dataKey="fuel_pressure" stroke="#ff7300" />
            <Line type="monotone" dataKey="coolant_pressure" stroke="#387908" />
            <Line type="monotone" dataKey="lub_oil_temp" stroke="#fc5a03" />
            <Line type="monotone" dataKey="coolant_temp" stroke="#8884d8" />
            <Line
              type="monotone"
              dataKey="temperature_difference"
              stroke="#d8bf39"
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default Engine;
