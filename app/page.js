"use client";
import { useState } from "react";

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

  const handleAsk = () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    setTimeout(() => {
      const q = question.trim();
      
      // 질문에 따라 매번 다른 관점과 풍부한 팁을 조합해서 제공
      let dynamicText = `🤖 [안성 1150번 AI 스마트 가이드 분석 결과]\n`;
      dynamicText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      dynamicText += `💬 **입력하신 질문**: "${q}"\n\n`;

      if (q.includes("시간") || q.includes("얼마나") || q.includes("소요") || q.includes("걸려")) {
        dynamicText += `⏱️ **종합 소요 시간 분석**:\n`;
        dynamicText += `• 안성터미널 ➔ 평택역 기점 기준 순수 이동 시간은 약 **35분 ~ 45분**입니다.\n`;
        dynamicText += `• 단, 출근시간(08시 전후)이나 퇴근시간(18시 전후)에는 **공도읍 및 진사리 상습 정체 구역**에서 차량 정체가 발생하여 10~20분 가량 더 지연될 수 있으니 반드시 여유를 두고 탑승하시는 것을 권장합니다!`;
      } else if (q.includes("배차") || q.includes("간격") || q.includes("몇분")) {
        dynamicText += `🚌 **배차 간격 및 운행 정보**:\n`;
        dynamicText += `• 평균 배차 간격은 **15분 ~ 20분** 간격으로 비교적 자주 운행되는 편입니다.\n`;
        dynamicText += `• 배차 간격이 일정하지만 도로 상황에 따라 몰릴 수 있으니, 집에서 나오시기 전 **카카오맵**이나 **네이버지도**의 실시간 버스 위치 기능을 꼭 확인하고 탑승하세요.`;
      } else if (q.includes("한경대") || q.includes("중앙대") || q.includes("대학")) {
        dynamicText += `🏫 **대학가 연계 및 정류장 팁**:\n`;
        dynamicText += `• 한경국립대학교 정류장과 중앙대학교 안성캠퍼스(내리) 정류장은 1150번 노선의 핵심 이용 구간입니다.\n`;
        dynamicText += `• 평택역 방향으로 등교 및 출퇴근하는 대학생 승객이 매우 많으므로, 주요 대학가 정류장에서는 줄을 서서 탑승하셔야 할 수 있습니다.`;
      } else if (q.includes("평택역") || q.includes("종점") || q.includes("환승") || q.includes("지하철")) {
        dynamicText += `🚉 **종점 및 환승 연계 안내**:\n`;
        dynamicText += `• 1150번 버스의 종점은 **평택역**입니다. 평택역 광장 앞 정류장에 하차하게 됩니다.\n`;
        dynamicText += `• 하차 후 바로 **수도권 전철 1호선**으로 환승하여 수원, 천안, 서울 방면으로 편리하게 이동하실 수 있습니다.`;
      } else {
        dynamicText += `💡 **맞춤형 대중교통 안내**:\n`;
        dynamicText += `• 안성 1150번 버스는 안성과 평택을 잇는 가장 핵심적인 간선 노선입니다.\n`;
        dynamicText += `• 안성종합버스터미널에서 출발해 한경대, 중앙대, 공도, 평택대를 거쳐 평택역까지 다이렉트로 연결해 줍니다.\n`;
        dynamicText += `• 궁금하신 정류장을 아래 노선도에서 직접 클릭해 보시면 각 정류장별 상세한 특징을 확인하실 수 있습니다!`;
      }

      setAnswer(dynamicText);
      setLoading(false);
    }, 400);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "24px", fontFamily: "sans-serif", backgroundColor: "#f8fafc", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
      <h1 style={{ color: "#1e40af", textAlign: "center", marginBottom: "8px" }}>🚌 안성 1150번 버스 AI 가이드 & 노선도</h1>
      <p style={{ textAlign: "center", color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
        안성종합터미널 ~ 평택역 전체 노선 시각화 및 맞춤 안내 서비스
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
            {loading ? "분석 중..." : "질문하기"}
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
