"use client";
import { useState } from "react";

// 안성 주요 대중교통 및 1150번 버스 데이터
const busData = {
  stops: [
    { id: "1", name: "한경국립대" },
    { id: "2", name: "중앙대 안성캠퍼스" },
    { id: "3", name: "평택역" },
  ],
  routes: [
    { name: "1150번 버스", path: ["한경국립대", "중앙대 안성캠퍼스", "평택역"], interval: "15~20분" }
  ]
};

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // ⚠️ 아래 빈 따옴표 안에 Google AI Studio에서 발급받은 본인의 API 키를 통째로 넣어주세요!
  // 예: "AIzaSyD-..."
  const GEMINI_API_KEY = "AQ.Ab8RN6KC0RnRgeM1gyOLm8YFk3R9l2Hp_KeCTnEMaDRAuqi8dA";

  const handleAsk = async () => {
    if (!question.trim()) return;
    
    if (GEMINI_API_KEY === "AQ.Ab8RN6KC0RnRgeM1gyOLm8YFk3R9l2Hp_KeCTnEMaDRAuqi8dA" || !GEMINI_API_KEY) {
      setAnswer("⚠️ 코드 상단의 GEMINI_API_KEY 변수에 본인의 실제 Google API 키를 입력해 주세요!");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `당신은 안성 대중교통(특히 1150번 버스: 한경국립대 - 중앙대 안성캠퍼스 - 평택역 노선) 전문 AI 안내원입니다.\n` +
                          `다음 사용자의 질문에 친절하고 상세하게 답변해주세요.\n` +
                          `소요시간, 배차간격(1150번 기준 15~20분), 환승 및 이용 팁 등을 포함해서 답변해주세요.\n\n` +
                          `질문: ${question}`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await res.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setAnswer(data.candidates[0].content.parts[0].text);
      } else {
        setAnswer("🤖 AI 답변을 불러오는 중 오류가 발생했습니다. API 키가 올바른지 확인해 주세요.");
      }
    } catch (err) {
      setAnswer(" 네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", fontFamily: "sans-serif", lineHeight: "1.6" }}>
      <h1 style={{ color: "#2563eb", textAlign: "center" }}>🚌 안성 대중교통 AI 가이드</h1>
      
      {/* 노선 시각화 영역 */}
      <div style={{ background: "#f3f4f6", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
        <h3 style={{ marginTop: 0 }}>📍 주요 노선 시각화 (1150번)</h3>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px" }}>
          {busData.stops.map((stop, idx) => (
            <div key={stop.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ background: "#2563eb", color: "#fff", padding: "8px 12px", borderRadius: "20px", fontSize: "14px", fontWeight: "bold", textAlign: "center", minWidth: "80px" }}>
                {stop.name}
              </div>
              {idx < busData.stops.length - 1 && (
                <div style={{ flex: 1, height: "3px", background: "#cbd5e1", margin: "0 8px" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI 질문 입력 영역 */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "20px", borderRadius: "12px" }}>
        <h3>🤖 AI 대중교통 질문하기</h3>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="예: 중앙대에서 평택역까지 어떻게 가나요?"
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", boxSizing: "border-box", marginBottom: "10px" }}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          style={{ width: "100%", padding: "12px", background: loading ? "#93c5fd" : "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
        >
          {loading ? "AI 분석 중..." : "AI에게 물어보기"}
        </button>

        {/* AI 답변 결과 */}
        {answer && (
          <div style={{ marginTop: "20px", padding: "15px", background: "#eff6ff", borderRadius: "8px", whiteSpace: "pre-wrap" }}>
            {answer}
          </div>
        )}
      </div>
    </div>
  );
}
