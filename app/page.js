"use client";
import { useState } from "react";

// 🔑 1번째 줄 여기에 본인의 구글 API 키를 쌍따옴표("") 사이에 넣어주세요!
const GEMINI_API_KEY = "AQ.Ab8RN6KC0RnRgeM1gyOLm8YFk3R9l2Hp_KeCTnEMaDRAuqi8dA";

// 1150번 버스 주요 정류장 데이터
const route1150Stops = [
  { id: "1", name: "안성종합버스터미널", type: "기점" },
  { id: "2", name: "한경국립대학교", type: "주요정류장" },
  { id: "3", name: "중앙대학교 안성캠퍼스", type: "주요정류장" },
  { id: "4", name: "공도버스터미널", type: "환승거점" },
  { id: "5", name: "진사리", type: "일반정류장" },
  { id: "6", name: "평택대학교", type: "주요정류장" },
  { id: "7", name: "평택역", type: "종점" },
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStop, setSelectedStop] = useState(null);

  const handleAsk = async () => {
    if (!question.trim()) return;

    if (GEMINI_API_KEY === "여기에_내_구글_API키_입력" || !GEMINI_API_KEY) {
      setAnswer("⚠️ 코드 맨 윗줄(1번째 줄)의 GEMINI_API_KEY에 본인의 구글 API 키를 입력해 주세요!");
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
                    text: `당신은 안성 대중교통(1150번 버스: 안성터미널 - 한경국립대 - 중앙대 - 평택역 노선) 전문 AI 안내원입니다.\n` +
                          `사용자의 질문에 대해 배차간격(15~20분), 소요시간, 환승 팁 등을 포함하여 친절하고 상세하게 답변해주세요.\n\n` +
                          `사용자 질문: ${question}`
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
        setAnswer("🤖 AI 응답 생성 중 오류가 발생했습니다. API 키를 다시 확인해 주세요.");
      }
    } catch (err) {
      setAnswer(" 네트워크 통신 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "24px", fontFamily: "sans-serif", backgroundColor: "#f8fafc", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
      <h1 style={{ color: "#1e40af", textAlign: "center", marginBottom: "8px" }}>🚌 안성 1150번 버스 AI 안내 & 노선 도서관</h1>
      <p style={{ textAlign: "center", color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
        Gemini AI와 연동하여 실시간으로 대중교통 경로를 안내받고 전체 노선을 확인하세요.
      </p>

      {/* AI 질문 입력 섹션 */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", marginBottom: "24px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ marginTop: 0, color: "#334155", fontSize: "16px" }}>🤖 AI 대중교통 길찾기 가이드</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="예: 한경대에서 평택역까지 어떻게 가나요?"
            style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            style={{ padding: "10px 20px", background: loading ? "#93c5fd" : "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
          >
            {loading ? "분석 중..." : "AI 질문하기"}
          </button>
        </div>

        {answer && (
          <div style={{ marginTop: "16px", padding: "14px", background: "#eff6ff", borderRadius: "8px", color: "#1e3a8a", whiteSpace: "pre-wrap", fontSize: "14px", lineHeight: "1.5" }}>
            {answer}
          </div>
        )}
      </div>

      {/* 1150번 전체 노선 시각화 섹션 */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ marginTop: 0, color: "#334155", fontSize: "16px" }}>📍 1150번 버스 전체 노선도</h3>
        <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "20px" }}>정류장 버튼을 클릭해 보세요.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {route1150Stops.map((stop, index) => (
            <div key={stop.id} style={{ display: "flex", alignItems: "flex-start", position: "relative" }}>
              {index < route1150Stops.length - 1 && (
                <div style={{ position: "absolute", left: "15px", top: "30px", width: "4px", height: "calc(100% + 12px)", backgroundColor: "#93c5fd", zIndex: 1 }} />
              )}
              
              <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: stop.type === "기점" || stop.type === "종점" ? "#dc2626" : "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px", zIndex: 2, marginRight: "16px", flexShrink: 0 }}>
                {index + 1}
              </div>

              <div
                onClick={() => setSelectedStop(stop)}
                style={{ flex: 1, backgroundColor: selectedStop?.id === stop.id ? "#eff6ff" : "#f8fafc", border: selectedStop?.id === stop.id ? "2px solid #2563eb" : "1px solid #e2e8f0", padding: "12px 16px", borderRadius: "10px", cursor: "pointer" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "bold", color: "#1e293b", fontSize: "15px" }}>{stop.name}</span>
                  <span style={{ fontSize: "11px", backgroundColor: "#e0f2fe", color: "#0369a1", padding: "2px 8px", borderRadius: "6px", fontWeight: "600" }}>
                    {stop.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
