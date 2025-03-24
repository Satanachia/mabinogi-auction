import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // 1. 서버용 환경 변수를 가져옵니다.
    const API_KEY = process.env.NEXON_API_KEY; 
    if (!API_KEY) {
      return res.status(500).json({ error: "API key not configured" });
    }

    // 2. 클라이언트가 보내준 파라미터를 확인
    const { keyword } = req.query;

    // 3. 실제 Nexon API를 호출
    const response = await fetch(`https://api.nexon.com/...&apikey=${API_KEY}&keyword=${keyword}`);
    const data = await response.json();

    // 4. 결과를 클라이언트에 그대로 반환
    return res.status(200).json(data);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
