import { useContext } from "react";
import GeocodeContext from "../context/GeocodeContext";

const InputForm = () => {
  const {
    startLocation,
    setStartLocation,
    destination,
    setDestination,
    handleCalculate,
  } = useContext(GeocodeContext);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="startLocation" className="form-label fw-bold">
              Start Location
            </label>
            <input
              type="text"
              className="form-control"
              id="startLocation"
              placeholder="Enter start address (e.g., Paris, France)"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="destination" className="form-label fw-bold">
              Destination
            </label>
            <input
              type="text"
              className="form-control"
              id="destination"
              placeholder="Enter destination address (e.g., London, UK)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <button 
            onClick={handleCalculate}
            className="btn btn-primary w-100 py-2"
          >
            Calculate Distance
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputForm;