"use client";
import { useState } from "react";

// 1150번 버스 전체 정류장 및 상세 노선 데이터
const route1150Stops = [
  { id: "1", name: "안성종합버스터미널", type: "기점", info: "첫차 05:00 / 막차 22:30" },
  { id: "2", name: "한경국립대학교", type: "주요정류장", info: "대학생 및 시민 주요 이용 구간" },
  { id: "3", name: "중앙대학교 안성캠퍼스", type: "주요정류장", info: "내리 대학가 연계" },
  { id: "4", name: "공도버스터미널", type: "환승거점", info: "공도읍 시내 중심지" },
  { id: "5", name: "진사리(주공아파트)", type: "일반정류장", info: "평택 경계 인접 지역" },
  { id: "6", name: "평택대학교", type: "주요정류장", info: "출퇴근 및 통학 수요 집중" },
  { id: "7", name: "평택역 (종점)", type: "종점", info: "지하철 1호선 환승 가능" },
];

export default function Home() {
  const [selectedStop, setSelectedStop] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [transitResult, setTransitResult] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (searchQuery.includes("한경대") || searchQuery.includes("중앙대")) {
      setTransitResult(`🚌 [1150번 버스 맞춤 안내]\n• 노선: 안성종합버스터미널 ↔ 한경대 ↔ 중앙대 ↔ 평택역\n• 배차 간격: 약 15~20분\n• 예상 소요 시간: 약 35~45분 (교통 상황에 따라 변동 가능)\n• 💡 팁: 출퇴근 시간대에는 중앙대 및 공도 구간에 정체가 발생할 수 있으니 10분 정도 여유를 두고 탑승하세요!`);
    } else {
      setTransitResult(`🔍 '${searchQuery}' 검색 결과:\n1150번 버스는 안성과 평택역을 가장 빠르게 이어주는 핵심 노선입니다. 위 정류장 목록을 클릭하시면 상세 정보를 확인하실 수 있습니다!`);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "24px", fontFamily: "sans-serif", backgroundColor: "#f8fafc", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
      <h1 style={{ color: "#1e40af", textAlign: "center", marginBottom: "8px" }}>🚌 안성 1150번 버스 교통 시각화</h1>
      <p style={{ textAlign: "center", color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
        한경대·중앙대에서 평택역까지 한눈에 이어주는 노선 안내 도서관
      </p>

      {/* 실시간 경로 검색 섹션 */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", marginBottom: "24px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ marginTop: 0, color: "#334155", fontSize: "16px" }}>🔍 빠른 경로 및 안내 검색</h3>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="예: 한경대에서 평택역 가는 법"
            style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
          />
          <button
            type="submit"
            style={{ padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
          >
            검색
          </button>
        </form>

        {transitResult && (
          <div style={{ marginTop: "16px", padding: "14px", background: "#eff6ff", borderRadius: "8px", color: "#1e3a8a", whiteSpace: "pre-wrap", fontSize: "14px", lineHeight: "1.5" }}>
            {transitResult}
          </div>
        )}
      </div>

      {/* 1150번 전체 노선 시각화 섹션 (수직 타임라인 형태) */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ marginTop: 0, color: "#334155", fontSize: "16px" }}>📍 1150번 버스 전체 노선도 (클릭하여 정보 확인)</h3>
        <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "20px" }}>정류장 이름을 누르면 상세 운영 정보를 볼 수 있습니다.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {route1150Stops.map((stop, index) => (
            <div key={stop.id} style={{ display: "flex", alignItems: "flex-start", position: "relative" }}>
              {/* 세로 연결선 */}
              {index < route1150Stops.length - 1 && (
                <div style={{ position: "absolute", left: "15px", top: "30px", width: "4px", height: "calc(100% + 12px)", backgroundColor: "#93c5fd", zIndex: 1 }} />
              )}
              
              {/* 노드 원형 아이콘 */}
              <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: stop.type === "기점" || stop.type === "종점" ? "#dc2626" : "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px", zIndex: 2, marginRight: "16px", flexShrink: 0, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                {index + 1}
              </div>

              {/* 정류장 카드 버튼 */}
              <div
                onClick={() => setSelectedStop(stop)}
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
