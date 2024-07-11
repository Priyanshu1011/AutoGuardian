export function generateVehicleData() {
  return {
    "engine_rpm": parseFloat((Math.random() * (2239.0 - 61.0) + 61.0).toFixed(2)),
    "lub_oil_pressure": parseFloat(
      (Math.random() * (7.265566 - 0.003384) + 0.003384).toFixed(6)
    ),
    "fuel_pressure": parseFloat(
      (Math.random() * (21.138326 - 0.003187) + 0.003187).toFixed(6)
    ),
    "coolant_pressure": parseFloat(
      (Math.random() * (7.478505 - 0.002483) + 0.002483).toFixed(6)
    ),
    "lub_oil_temp": parseFloat(
      (Math.random() * (89.580796 - 71.321974) + 71.321974).toFixed(6)
    ),
    "coolant_temp": parseFloat(
      (Math.random() * (195.527912 - 61.673325) + 61.673325).toFixed(6)
    ),
    "temp_difference": parseFloat(
      (Math.random() * (119.008526 - -22.669427) + -22.669427).toFixed(6)
    ),
  };
}
