import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import MabinogiAuctionContainer from "./features/auction/components/MabinogiAuctionContainer"
import SturdyBagContainer from "./features/sturdyBag/components/SturdyBagContainer";

function AppWrapper() {
  const location = useLocation();

  const isAuctionPage = location.pathname === "/";
  const containerClass = `font-sans ${isAuctionPage ? "h-screen overflow-hidden" : "min-h-screen overflow-auto"}`;

  return (
    <div className={containerClass}>
      <div className="max-w-[1440px] mx-auto bg-white shadow-xl">
        <Routes>
          <Route path="/" element={<MabinogiAuctionContainer />} />
          <Route path="/sturdy-bag" element={<SturdyBagContainer />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  )
}

export default App
