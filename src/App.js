import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./Component/Home";
import Header from "./Component/Header";
import Coin from "./Component/Coin";
import Exchanges from "./Component/Exchanges";
import Coins_Details from "./Component/Coins_Details";
import Footrr from "./Component/Footrr";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coin />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/coins/:id" element={<Coins_Details/>} />
      </Routes>
      <Footrr />
    </Router>
  );
}

export default App;
