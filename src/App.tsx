import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MabinogiAuctionContainer from "./components/MabinogiAuctionContainer"
import SturdyBagPage from './pages/SturdyBagPage';

function App() {

  return (
    <BrowserRouter>
      <div className="font-sans max-w-[1440px] mx-auto bg-white shadow-xl">
        <Routes>
          <Route path="/" element={<MabinogiAuctionContainer />} />
          <Route path="/sturdy-bag" element={<SturdyBagPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
