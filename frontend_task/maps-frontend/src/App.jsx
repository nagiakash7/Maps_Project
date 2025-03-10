import { GeocodeProvider } from "./context/GeocodeContext";
import InputForm from "./components/InputForm";
import ResultsDisplay from "./components/ResultsDisplay";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <GeocodeProvider>
      <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center", padding: "20px" }}>
        <h2>Distance Calculator</h2>
        <InputForm />
        <ResultsDisplay />
      </div>
    </GeocodeProvider>
  );
}

export default App;
