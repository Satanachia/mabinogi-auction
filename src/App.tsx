import MabinogiAuctionPage from "./components/MabiAuctionPage"
import { Analytics } from '@vercel/analytics/next';

function App() {

  return (
    <div className="font-sans max-w-[1440px] mx-auto bg-white shadow-xl">
      <h1 className="max-w-screen-xl mx-auto text-3xl font-bold p-4">마비노기 경매장 검색</h1>
      <MabinogiAuctionPage />
      <Analytics />
    </div>
  )
}

export default App
