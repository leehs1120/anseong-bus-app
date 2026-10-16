"use client";
import { useState } from "react";

// 🔑 1번째 줄: 본인의 Google Gemini API 키 입력
const GEMINI_API_KEY = "AQ.Ab8RN6JOWN8GN2RINOgU1UIS2Eo5-fxZb3juosQwZuI5i6oSvg";

// 1150번 버스 전체 노선 데이터
const route1150Stops = [
  { id: "1", name: "안성종합버스터미널", type: "기점", info: "첫차 05:00 / 막차 22:30 | 시외/시내버스 기점" },
  { id: "2", name: "한경국립대학교", type: "주요정류장", info: "대학생 및 시민 주요 이용 구간" },
  { id: "3", name: "중앙대학교 안성캠퍼스", type: "주요정류장", info: "내리 대학가 연계" },
  { id: "4", name: "공도버스터미널", type: "환승거점", info: "공도읍 중심지 및 평택 경계" },
  { id: "5", name: "진사리(주공아파트)", type: "일반정류장", info: "주거 단지 및 상권 인접" },
  { id: "6", name: "평택대학교", type: "주요정류장", info: "출퇴근 및 통학 수요 집중" },
  { id: "7", name: "평택역", type: "종점", info: "지하철 1호선 환승 및 평택 시내" },
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStop, setSelectedStop] = useState(null);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    // 1. Google Gemini API 직접 호출 시도 (최신 모델 순차 시도)
    const modelsToTry = ["gemini-2.0-flash", "gemini-1.5-flash-latest", "gemini-1.5-flash"];
    let aiSuccess = false;

    if (GEMINI_API_KEY && GEMINI_API_KEY !== "여기에_내_구글_API키_입력") {
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
                        text: `당신은 안성 1150번 버스(안성터미널-한경대-중앙대-공도-평택역) 전문 안내 AI입니다.\n` +
                              `질문에 맞춰 배차간격(15~20분), 예상 소요시간, 혼잡시간대 팁, 환승 정보 등을 다양하고 상세하게 친절하게 설명해주세요.\n\n` +
                              `질문: ${question}`
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
            aiSuccess = true;
            break;
          }
        } catch (err) {
          console.error(`Model ${modelName} call failed:`, err);
        }
      }
    }

    // 2. API 미설정 및 호출 실패 시 다채로운 오프라인 가이드 제공
    if (!aiSuccess) {
      const q = question.toLowerCase();
      let fallbackText = `🤖 [1150번 버스 스마트 가이드]\n\n`;

      fallbackText += `📍 **노선 개요**: 안성종합버스터미널 ↔ 한경국립대 ↔ 중앙대 안성캠퍼스 ↔ 공도터미널 ↔ 진사리 ↔ 평택대 ↔ 평택역\n`;
      fallbackText += `⏱️ **배차 간격**: 평일/주말 평균 15분 ~ 20분 간격 운행\n`;
      fallbackText += `⏳ **소요 시간**: 전 구간 이용 시 약 35~45분 (출퇴근 혼잡 시 +10~15분 추가 소요)\n\n`;

      if (q.includes("시간") || q.includes("얼마나") || q.includes("소요")) {
        fallbackText += `💡 **시간 관련 팁**: 출퇴근 시간대(07:30~09:00, 17:30~19:00)에는 공도~진사리 상습 정체 구간의 영향으로 10~15분 지연될 수 있습니다.`;
      } else if (q.includes("막차") || q.includes("첫차") || q.includes("시간표")) {
        fallbackText += `💡 **운행 시간**: 기점(안성터미널) 기준 첫차 05:00 / 막차 22:30분경 운행됩니다.`;
      } else if (q.includes("환승") || q.includes("평택역") || q.includes("지하철")) {
        fallbackText += `💡 **환승 팁**: 평택역 종점에서 하차 시 수도권 전철 1호선 및 무궁화/ITX-새마을 열차로 바로 환승하실 수 있습니다.`;
      } else {
        fallbackText += `💡 **이용 안내**: 입력하신 질문("${question}")에 대한 실시간 버스 위치 확인은 경기버스정보 또는 카카오맵/네이버지도 앱을 병행 이용하시면 더욱 편리합니다.`;
      }

      setAnswer(fallbackText);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "24px", fontFamily: "sans-serif", backgroundColor: "#f8fafc", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
      <h1 style={{ color: "#1e40af", textAlign: "center", marginBottom: "8px" }}>🚌 안성 1150번 버스 AI 가이드 & 노선도</h1>
      <p style={{ textAlign: "center", color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
        Google Gemini AI 실시간 질문 답변 및 전체 노선 시각화
      </p>

      {/* 질문 입력 영역 */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", marginBottom: "24px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ marginTop: 0, color: "#334155", fontSize: "16px" }}>🤖 AI 대중교통 길찾기 가이드</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="예: 한경대에서 평택역까지 얼마나 걸려요?"
            style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            style={{ padding: "10px 20px", background: loading ? "#93c5fd" : "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
          >
            {loading ? "AI 분석 중..." : "질문하기"}
          </button>
        </div>

        {answer && (
          <div style={{ marginTop: "16px", padding: "16px", background: "#eff6ff", borderRadius: "10px", color: "#1e3a8a", whiteSpace: "pre-wrap", fontSize: "14px", lineHeight: "1.6", border: "1px solid #bfdbfe" }}>
            {answer}
          </div>
        )}
      </div>

      {/* 1150번 전체 정류장 시각화 영역 */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ marginTop: 0, color: "#334155", fontSize: "16px" }}>📍 1150번 버스 전체 노선도</h3>
        <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "20px" }}>각 정류장을 클릭하여 세부 안내를 확인하세요.</p>

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
                onClick={() => setSelectedStop(selectedStop?.id === stop.id ? null : stop)}
                style={{ flex: 1, backgroundColor: selectedStop?.id === stop.id ? "#eff6ff" : "#f8fafc", border: selectedStop?.id === stop.id ? "2px solid #2563eb" : "1px solid #e2e8f0", padding: "12px 16px", borderRadius: "10px", cursor: "pointer", transition: "all 0.2s" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "bold", color: "#1e293b", fontSize: "15px" }}>{stop.name}</span>
                  <span style={{ fontSize: "11px", backgroundColor: stop.type === "기점" || stop.type === "종점" ? "#fee2e2" : "#e0f2fe", color: stop.type === "기점" || stop.type === "종점" ? "#991b1b" : "#0369a1", padding: "2px 8px", borderRadius: "6px", fontWeight: "600" }}>
                    {stop.type}
                  </span>
                </div>
                {selectedStop?.id === stop.id && (
                  <div style={{ marginTop: "8px", fontSize: "13px", color: "#475569", borderTop: "1px dashed #cbd5e1", paddingTop: "6px" }}>
                    ℹ️ {stop.info}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
