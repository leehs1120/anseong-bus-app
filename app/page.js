"use client";
import { useState } from "react";

// 🔑 1번째 줄: 본인의 구글 API 키
const GEMINI_API_KEY = "AQ.Ab8RN6JOWN8GN2RINOgU1UIS2Eo5-fxZb3juosQwZuI5i6oSvg";

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

  const handleAsk = async () => {
    if (!question.trim()) return;

    if (GEMINI_API_KEY === "여기에_내_구글_API키_입력" || !GEMINI_API_KEY) {
      setAnswer("⚠️ 맨 첫 번째 줄의 GEMINI_API_KEY에 본인의 실제 Google API 키를 입력해 주세요!");
      return;
    }

    setLoading(true);
    setAnswer("");

    // 지원되는 최신 모델 목록 순차적 시도 (gemini-2.0-flash -> gemini-1.5-flash-latest)
    const modelsToTry = ["gemini-2.0-flash", "gemini-1.5-flash-latest"];
    let success = false;

    for (const modelName of modelsToTry) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY.trim()}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `당신은 안성 대중교통(특히 1150번 버스: 안성터미널 - 한경대 - 중앙대 - 평택역 노선) 전문 AI 안내원입니다.\n` +
                            `사용자의 질문에 대해 배차간격(15~20분), 소요시간, 환승 팁 등을 포함해서 친절하고 구체적으로 답변해 주세요.\n\n` +
                            `사용자 질문: ${question}`
                    }
                  ]
                }
              ]
            })
          }
        );

        const data = await res.json();

        if (res.ok && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          setAnswer(data.candidates[0].content.parts[0].text);
          success = true;
          break; // 성공 시 반복문 종료
        }
      } catch (err) {
        console.error(`Model ${modelName} call failed:`, err);
      }
    }

    if (!success) {
      setAnswer("🤖 AI 응답 생성에 실패했습니다. API 키의 권한이나 Google Cloud project 설정을 확인해 주세요.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "24px", fontFamily: "sans-serif", backgroundColor: "#f8fafc", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
      <h1 style={{ color: "#1e40af", textAlign: "center", marginBottom: "8px" }}>🚌 안성 1150번 버스 AI 안내 가이드</h1>
      <p style={{ textAlign: "center", color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
        Google Gemini AI와 연동된 안성 대중교통 안내 서비스
      </p>

      {/* AI 질문 영역 */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", marginBottom: "24px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ marginTop: 0, color: "#334155", fontSize: "16px" }}>🤖 AI에게 길찾기/소요시간 물어보기</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="예: 한경대에서 평택역 종점까지 얼마나 걸려요?"
            style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            style={{ padding: "10px 20px", background: loading ? "#93c5fd" : "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
          >
            {loading ? "AI 생각 중..." : "AI 질문하기"}
          </button>
        </div>

        {answer && (
          <div style={{ marginTop: "16px", padding: "14px", background: "#eff6ff", borderRadius: "8px", color: "#1e3a8a", whiteSpace: "pre-wrap", fontSize: "14px", lineHeight: "1.6" }}>
            {answer}
          </div>
        )}
      </div>

      {/* 노선 시각화 */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ marginTop: 0, color: "#334155", fontSize: "16px" }}>📍 1150번 버스 주요 정류장 노선도</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
          {route1150Stops.map((stop, index) => (
            <div key={stop.id} style={{ display: "flex", alignItems: "center", position: "relative" }}>
              {index < route1150Stops.length - 1 && (
                <div style={{ position: "absolute", left: "15px", top: "28px", width: "4px", height: "calc(100% + 12px)", backgroundColor: "#93c5fd", zIndex: 1 }} />
              )}
              <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: stop.type === "기점" || stop.type === "종점" ? "#dc2626" : "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px", zIndex: 2, marginRight: "16px", flexShrink: 0 }}>
                {index + 1}
              </div>
              <div style={{ flex: 1, backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", padding: "12px 16px", borderRadius: "10px" }}>
                <span style={{ fontWeight: "bold", color: "#1e293b", fontSize: "15px" }}>{stop.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
