"use client";
import { useState } from "react";

// 안성 1150번 버스 전체 정류장 및 실시간 안내 데이터베이스
const route1150Stops = [
  { id: "1", name: "안성종합버스터미널", type: "기점", info: "첫차 05:00 / 막차 22:30 | 안성 시외/시내버스 중심 기점" },
  { id: "2", name: "한경국립대학교", type: "주요정류장", info: "대학생 및 인근 주민 주요 승하차 구역" },
  { id: "3", name: "중앙대학교 안성캠퍼스", type: "주요정류장", info: "내리 대학가 밀집 지역 연계" },
  { id: "4", name: "공도버스터미널", type: "환승거점", info: "공도읍 시내 및 평택 경계 주요 거점" },
  { id: "5", name: "진사리(주공아파트)", type: "일반정류장", info: "대단지 아파트 밀집 및 상권 인접" },
  { id: "6", name: "평택대학교", type: "주요정류장", info: "통학 및 평택 시내 방향 환승 유동 인구 많음" },
  { id: "7", name: "평택역", type: "종점", info: "지하철 1호선 환승 및 평택 시내 중심지" },
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStop, setSelectedStop] = useState(null);

  // 똑똑한 자체 로직으로 실시간 AI 안내 시뮬레이션
  const handleAsk = () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    setTimeout(() => {
      const q = question.toLowerCase();
      let responseText = "";

      if (q.includes("시간") || q.includes("얼마나") || q.includes("소요")) {
        responseText = `🚌 [1150번 버스 소요 시간 안내]\n• 안성종합버스터미널에서 평택역 종점까지 전체 소요 시간은 대략 **35분 ~ 45분** 소요됩니다.\n• 단, 출퇴근 시간대나 공도·진사리 구간 정체 시 10~15분 정도 더 걸릴 수 있습니다.`;
      } else if (q.includes("배차") || q.includes("간격")) {
        responseText = `⏱️ [1150번 버스 배차 간격 안내]\n• 평일/주말 평균 **15분 ~ 20분** 간격으로 운행됩니다.\n• 실시간 버스 앱(카카오맵/네이버지도)을 통해 현재 버스 위치를 확인하고 나오시는 것을 추천합니다!`;
      } else if (q.includes("한경대") || q.includes("중앙대")) {
        responseText = `🏫 [대학가 연계 안내]\n• 한경국립대와 중앙대 안성캠퍼스 모두 1150번 핵심 정류장에 포함되어 있어 평택역까지 환승 없이 한 번에 이동 가능합니다.`;
      } else if (q.includes("평택역") || q.includes("종점")) {
        responseText = `🚉 [평택역 연계 안내]\n• 1150번의 종점인 평택역에서 하차하시면 **지하철 1호선** 및 평택 시내 상권으로 곧바로 환승하실 수 있습니다.`;
      } else {
        responseText = `🤖 [안성 1150번 대중교통 가이드 답변]\n• 질문하신 내용("${question}")과 관련하여, 1150번 노선은 안성터미널을 출발해 한경대, 중앙대, 공도를 거쳐 평택역까지 운행하는 핵심 노선입니다. 정류장 버튼을 클릭하시면 각 위치별 상세 정보를 확인하실 수 있습니다!`;
      }

      setAnswer(responseText);
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "24px", fontFamily: "sans-serif", backgroundColor: "#f8fafc", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
      <h1 style={{ color: "#1e40af", textAlign: "center", marginBottom: "8px" }}>🚌 안성 1150번 버스 노선 & 가이드</h1>
      <p style={{ textAlign: "center", color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
        안성종합터미널 ~ 평택역 전체 노선 시각화 및 맞춤 안내 서비스
      </p>

      {/* 질문 입력 영역 */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", marginBottom: "24px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ marginTop: 0, color: "#334155", fontSize: "16px" }}>🔍 대중교통 길찾기 및 정보 물어보기</h3>
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
            {loading ? "검색 중..." : "검색하기"}
          </button>
        </div>

        {answer && (
          <div style={{ marginTop: "16px", padding: "14px", background: "#eff6ff", borderRadius: "8px", color: "#1e3a8a", whiteSpace: "pre-wrap", fontSize: "14px", lineHeight: "1.6" }}>
            {answer}
          </div>
        )}
      </div>

      {/* 1150번 전체 정류장 시각화 영역 */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ marginTop: 0, color: "#334155", fontSize: "16px" }}>📍 1150번 버스 전체 노선도 (정류장을 클릭해 보세요)</h3>
        <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "20px" }}>각 정류장의 상세 운영 정보를 확인할 수 있습니다.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {route1150Stops.map((stop, index) => (
            <div key={stop.id} style={{ display: "flex", alignItems: "flex-start", position: "relative" }}>
              {/* 세로 연결선 */}
              {index < route1150Stops.length - 1 && (
                <div style={{ position: "absolute", left: "15px", top: "30px", width: "4px", height: "calc(100% + 12px)", backgroundColor: "#93c5fd", zIndex: "1" }} />
              )}
              
              {/* 번호 아이콘 */}
              <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: stop.type === "기점" || stop.type === "종점" ? "#dc2626" : "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px", zIndex: "2", marginRight: "16px", flexShrink: 0 }}>
                {index + 1}
              </div>

              {/* 정류장 카드 */}
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
