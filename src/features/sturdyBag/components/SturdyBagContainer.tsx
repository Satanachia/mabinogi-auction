import { useState } from "react";
import SturdyBagPage from "../../../pages/SturdyBagPage";
import HornBugleModal from "../../../shared/components/HornBugleModal";
import { getHornBugleHistory } from "../../../services/mabinogiApi";
import type { HornBugleMessage } from "../../../services/mabinogiApi";

export default function SturdyBagContainer() {
  const [messages, setMessages] = useState<HornBugleMessage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedServer, setSelectedServer] = useState<string>("");

  const handleHornBugleFetch = async (server: string) => {
    try {
      setSelectedServer(server);
      const data = await getHornBugleHistory(server);
      setMessages(data);
      setShowModal(true);
    } catch (err) {
      console.error("API 호출 실패:", err);
      alert("거대한 뿔피리 데이터를 불러올 수 없습니다.");
    }
  };

  const handleHornRefresh = async () => {
    if (!selectedServer) {
      alert("서버 정보가 없습니다.");
      return;
    }
    try {
      const data = await getHornBugleHistory(selectedServer);
      setMessages(data);
    } catch (err) {
      console.error("새로고침 실패:", err);
      alert("새로운 데이터를 불러오지 못했습니다.");
    }
  };

  return (
    <>
      <SturdyBagPage onHornBugleFetch={handleHornBugleFetch} />
      {showModal && (
        <HornBugleModal
          messages={messages}
          onClose={() => setShowModal(false)}
          onRefresh={handleHornRefresh}
        />
      )}
    </>
  );
}
