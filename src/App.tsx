import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MabinogiAuctionContainer from "./components/MabinogiAuctionContainer"
import SturdyBagContainer from "./components/SturdyBagContainer";

function App() {

  return (
    <BrowserRouter>
    <div className="h-screen overflow-hidden font-sans">
      <div className="max-w-[1440px] mx-auto bg-white shadow-xl">
        <Routes>
          <Route path="/" element={<MabinogiAuctionContainer />} />
          <Route path="/sturdy-bag" element={<SturdyBagContainer />} />
        </Routes>
      </div>
    </div>      
    </BrowserRouter>
  )
}

export default App
