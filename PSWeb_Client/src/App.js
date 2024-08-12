import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShopContextProvider } from "./context/shop-context";
import { routes } from "./routes";
import { Navbar } from "./components/navbar";
function App() {

  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          {/* <Navbar />  */}
          <Routes>
            {routes.map((route, index) => (
              <Route
                key = {index}
                path={route.path} 
                element={<route.page />}
              />
            ))}
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;