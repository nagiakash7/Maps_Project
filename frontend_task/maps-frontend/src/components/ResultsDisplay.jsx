import { useContext, useEffect } from "react";
import GeocodeContext from "../context/GeocodeContext";

const ResultsDisplay = () => {
    const { formattedStart, formattedDestination, distance, loading, error } = useContext(GeocodeContext);

    useEffect(() => {
        if (distance !== null) {
            console.log('Distance updated:', distance);
        }
    }, [distance]);

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body text-center">
                    {loading && (
                        <div className="d-flex align-items-center justify-content-center gap-2 my-3">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mb-0">Calculating route...</p>
                        </div>
                    )}
                    
                    {error && (
                        <div className="alert alert-danger mt-3">
                            {error}
                        </div>
                    )}

                    {formattedStart && (
                        <p className="mb-3">
                            <strong className="fw-bold">Start Address:</strong> 
                            <span className="ms-2 text-muted">{formattedStart}</span>
                        </p>
                    )}

                    {formattedDestination && (
                        <p className="mb-3">
                            <strong className="fw-bold">Destination Address:</strong> 
                            <span className="ms-2 text-muted">{formattedDestination}</span>
                        </p>
                    )}

                    {distance !== null && (
                        <div className="mt-2 p-2 bg-light rounded">
                            <h4 className="text-success fw-bold">
                                Distance: {distance} km
                            </h4>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultsDisplay;