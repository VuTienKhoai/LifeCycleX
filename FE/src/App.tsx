import { BrowserRouter } from "react-router-dom";
import { useInitializeApp } from "./hook/useInitializeApp";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useInitializeApp();
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
