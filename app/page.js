"use client";
import { useState } from "react";

// 기본 버스 및 정류장 정보 데이터
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

  const handleAsk = () => {
    if (!question.trim()) return;
    setLoading(true);
    
    // AI 질문 안내 예시 처리 (간단 시뮬레이션)
    setTimeout(() => {
      if (question.includes("한경대") && question.includes("평택역")) {
        setAnswer("🚌 **한경대 → 평택역 추천 경로**\n\n1150번 버스를 타시면 직통으로 이동할 수 있습니다.\n• 예상 소요 시간: 약 35~40분\n• 배차 간격: 15~20분\n• 팁: 출퇴근 시간에는 중앙대 주변 차가 막힐 수 있으니 10분 여유 있게 탑승하세요!");
      } else {
        setAnswer(`🔍 '${question}'에 대한 대중교통 안내:\n\n1150번 버스 노선(한경대 ↔ 중앙대 ↔ 평택역)을 이용하시거나, 목적지에 맞춰 가까운 버스 정류장을 확인해 주세요!`);
      }
      setLoading(false);
    }, 800);
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
          placeholder="예: 한경대에서 평택역 가는 법 알려줘"
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", boxSizing: "border-box", marginBottom: "10px" }}
        />
        <button
          onClick={handleAsk}
          style={{ width: "100%", padding: "12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
        >
          {loading ? "AI 분석 중..." : "경로 및 정보 물어보기"}
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
