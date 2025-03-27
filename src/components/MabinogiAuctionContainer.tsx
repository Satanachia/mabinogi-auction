import { useState } from "react";
import Header from "./Header";
import MabinogiAuctionPage from "./MabiAuctionPage";
import HornBugleModal from "./HornBugleModal";
import { getHornBugleHistory } from "../services/mabinogiApi";
import type { HornBugleMessage } from "../services/mabinogiApi";

export default function MabinogiAuctionContainer() {
  const [messages, setMessages] = useState<HornBugleMessage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const handleHornBugleFetch = async (server: string) => {
    try {
      const data = await getHornBugleHistory(server);
      setMessages(data);
      setShowModal(true);
    } catch (err) {
      console.error("API 호출 실패:", err);
      alert("거대한 뿔피리 데이터를 불러올 수 없습니다.");
    }
  };
  return (
    <div>
      <Header 
        onHornBugleFetch={handleHornBugleFetch}
        />
      <MabinogiAuctionPage />
      {showModal && (
        <HornBugleModal
          messages={messages}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}