
"use client";

import React, { useState } from "react";

// Complete 1150 Bus Route Data (Anseong Terminal <-> Pyeongtaek Station)
const ROUTE_1150_STOPS = [
  {
    id: 1,
    seq: "01",
    name: "안성종합버스터미널",
    englishName: "Anseong Bus Terminal",
    type: "Terminal",
    transfers: ["시외버스", "고속버스", "70", "370", "380"],
    info: "기점 / 시외 및 고속버스 환승 가능",
    highlight: true,
  },
  {
    id: 2,
    seq: "02",
    name: "안성시청",
    englishName: "Anseong City Hall",
    type: "City Stop",
    transfers: ["1", "2-1", "70"],
    info: "안성시 중심 행정구역",
    highlight: false,
  },
  {
    id: 3,
    seq: "03",
    name: "한경국립대학교",
    englishName: "Hankyong Nat'l Univ.",
    type: "Major Campus",
    transfers: ["70", "370", "20"],
    info: "한경대 정문 앞 / 대학생 주요 승하차 지점",
    highlight: true,
  },
  {
    id: 4,
    seq: "04",
    name: "안성시민회관",
    englishName: "Anseong Citizen's Hall",
    type: "City Stop",
    transfers: ["70", "15"],
    info: "구도심 문화 및 시민 편의시설 연결",
    highlight: false,
  },
  {
    id: 5,
    seq: "05",
    name: "중앙대학교 안성캠퍼스",
    englishName: "Chung-Ang Univ. Anseong",
    type: "Major Campus",
    transfers: ["70", "370", "380", "1", "7000"],
    info: "중앙대 안성캠 입구 / 주요 등하교 거점 정류장",
    highlight: true,
  },
  {
    id: 6,
    seq: "06",
    name: "공도버스터미널",
    englishName: "Gongdo Bus Terminal",
    type: "Sub-Terminal",
    transfers: ["공도 시외버스", "70", "370", "4401"],
    info: "공도시주민센터 및 시외버스 승차 정류장",
    highlight: true,
  },
  {
    id: 7,
    seq: "07",
    name: "진사리입구",
    englishName: "Jinsa-ri Entrance",
    type: "Boundary Stop",
    transfers: ["70", "370", "7-8"],
    info: "안성시-평택시 경계 정류장",
    highlight: false,
  },
  {
    id: 8,
    seq: "08",
    name: "평택역 (AK플라자)",
    englishName: "Pyeongtaek Station",
    type: "Terminal Station",
    transfers: ["1호선", "경부선 철도", "SRT(지제)", "시외버스"],
    info: "종점 / 수도권 전철 1호선 및 일반열차 환승",
    highlight: true,
  },
];

export default function AnseongBusApp() {
  const [apiKey, setApiKey] = useState("AQ.Ab8RN6KC0RnRgeM1gyOLm8YFk3R9l2Hp_KeCTnEMaDRAuqi8dAI");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [selectedStop, setSelectedStop] = useState(null);
  const [viewMode, setViewMode] = useState("horizontal"); // 'horizontal' | 'vertical'
  const [question, setQuestion] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      role: "assistant",
      text: "안녕하세요! 안성 1150번 버스 노선 전문 AI 가이드입니다. 출발지, 목적지, 소요 시간, 막차 시간 등 궁금한 점을 물어보세요!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  // AI Response Handler using Gemini API or Local Simulation
  const handleAskAI = async (customPrompt = null) => {
    const userQuery = customPrompt || question;
    if (!userQuery.trim()) return;

    // Add user message to log
    const updatedLog = [...chatLog, { role: "user", text: userQuery }];
    setChatLog(updatedLog);
    if (!customPrompt) setQuestion("");
    setLoading(true);

    try {
      if (apiKey.trim()) {
        // Direct Gemini API Call
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `당신은 안성 1150번 버스(안성종합터미널 - 안성시청 - 한경국립대 - 안성시민회관 - 중앙대 안성캠 - 공도터미널 - 진사리 - 평택역) 전문 AI 가이드입니다. 
                     주요 특징: 배차간격 약 15~20분, 소요시간 약 40~50분. 
                     다음 사용자의 질문에 친절하고 세부적으로 답변해 주세요.
                     
                     질문: ${userQuery}`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await res.json();
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          setChatLog((prev) => [
            ...prev,
            { role: "assistant", text: data.candidates[0].content.parts[0].text },
          ]);
        } else {
          throw new Error("API Invalid Response");
        }
      } else {
        // Simulated Smart AI Response
        await new Promise((resolve) => setTimeout(resolve, 800));
        let simulatedAnswer = "";

        if (userQuery.includes("한경대") && userQuery.includes("평택역")) {
          simulatedAnswer =
            "🚌 **한경국립대 ↔ 평택역 구간 안내**\n\n• **추천 노선**: 1150번 직통\n• **예상 소요 시간**: 약 30~35분\n• **배차 간격**: 15~20분 간격\n• **꿀팁**: 평일 출퇴근 시간(07:30~09:00, 17:30~19:00)에는 공도-진사리 구간 정체가 심할 수 있으니 10~15분 여유 있게 탑승하시는 것이 좋습니다!";
        } else if (userQuery.includes("중앙대") || userQuery.includes("중대")) {
          simulatedAnswer =
            "🎓 **중앙대 안성캠퍼스 이용 안내**\n\n1150번 버스는 중앙대 안성캠퍼스 입구 정류장에 정차합니다.\n• **평택역 방면**: 약 25분 소요\n• **안성터미널 방면**: 약 15분 소요\n• **환승 연결**: 70번, 370번, 380번 버스와 노선이 유사하여 배차 대기 시간을 단축할 수 있습니다.";
        } else if (userQuery.includes("배차") || userQuery.includes("시간")) {
          simulatedAnswer =
            "⏱️ **1150번 버스 운행 정보**\n\n• **첫차**: 안성터미널 기준 05:40 / 평택역 기준 06:20\n• **막차**: 안성터미널 기준 22:30 / 평택역 기준 23:15\n• **배차 간격**: 평일 15~20분, 주말/공휴일 20~25분";
        } else {
          simulatedAnswer = `🚌 **1150번 버스 안내** ('${userQuery}' 관련)\n\n1150번은 안성터미널에서 출발하여 한경대, 중앙대, 공도터미널을 거쳐 평택역(AK플라자)까지 운행하는 핵심 간선 노선입니다.\n• 총 정류장 수: 8개 주요 거점 정류장 시각화 중\n• 평균 소요시간: 완주 기준 45~50분`;
        }

        setChatLog((prev) => [
          ...prev,
          { role: "assistant", text: simulatedAnswer },
        ]);
      }
    } catch (err) {
      setChatLog((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ Gemini API 호출 중 문제가 발생했습니다. API 키를 확인하시거나 기본 안내를 이용해 주세요.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredStops = ROUTE_1150_STOPS.filter(
    (stop) =>
      stop.name.includes(searchFilter) ||
      stop.englishName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      stop.info.includes(searchFilter)
  );

  return (
    <div style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }} className="min-h-screen bg-slate-50 text-slate-800 pb-12">
      {/* Top Header Navigation */}
      <header className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md text-2xl">
              🚌
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight">안성 1150번 버스 전체 노선도</h1>
                <span className="bg-emerald-400 text-slate-900 text-xs font-black px-2 py-0.5 rounded-full uppercase">
                  Full Route
                </span>
              </div>
              <p className="text-xs text-blue-100 font-medium">
                Anseong Terminal ↔ Han-gyeong Univ. ↔ Jung-ang Univ. ↔ Pyeongtaek Station
              </p>
            </div>
          </div>

          {/* Quick Stats & API Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="text-xs bg-white/10 hover:bg-white/20 text-white font-medium px-3 py-2 rounded-lg border border-white/20 transition backdrop-blur-sm flex items-center gap-1.5"
            >
              🔑 {apiKey ? "Gemini API 키 연결됨" : "Gemini API 키 입력 (선택)"}
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs bg-blue-900/40 px-3 py-2 rounded-lg border border-blue-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>배차 간격 15~20분</span>
            </div>
          </div>
        </div>

        {/* Floating Gemini Key Modal/Drawer */}
        {showKeyInput && (
          <div className="bg-blue-950/90 border-t border-blue-800/80 px-4 py-3 text-sm animate-fadeIn">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-3">
              <span className="text-xs text-blue-200 shrink-0">Google Gemini API Key:</span>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full sm:w-80 px-3 py-1.5 text-xs rounded bg-blue-900/60 text-white border border-blue-700 focus:outline-none focus:border-blue-400"
              />
              <span className="text-[11px] text-blue-300">
                * 키 없이도 지능형 기본 시뮬레이션으로 이용 가능합니다.
              </span>
            </div>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Bus Route Visualizer (8 Cols) */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Controls & Search Banner */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="정류장 명칭 / 환승 정보 검색..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-slate-500 font-medium">보기 방식:</span>
              <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200">
                <button
                  onClick={() => setViewMode("horizontal")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                    viewMode === "horizontal"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  가로 노선도
                </button>
                <button
                  onClick={() => setViewMode("vertical")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                    viewMode === "vertical"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  세로 타임라인
                </button>
              </div>
            </div>
          </div>

          {/* VISUALIZER CANVAS CARD */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>📍 1150번 전 정류장 연결망</span>
                  <span className="text-xs font-normal text-slate-500">
                    (총 {ROUTE_1150_STOPS.length}개 주요 거점)
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  정류장을 클릭하면 세부 정보 및 AI 추천 이동 팁을 볼 수 있습니다.
                </p>
              </div>
              <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 font-medium px-2.5 py-1 rounded-lg">
                왕복 약 90분
              </span>
            </div>

            {/* HORIZONTAL ROUTE MAP VIEW */}
            {viewMode === "horizontal" && (
              <div className="overflow-x-auto pb-6 pt-2">
                <div className="min-w-[700px] flex items-center justify-between relative px-4">
                  {/* Background Connecting Line */}
                  <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-2 bg-slate-200 rounded-full z-0" />
                  <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 rounded-full z-0 opacity-80" />

                  {filteredStops.map((stop) => {
                    const isSelected = selectedStop?.id === stop.id;
                    return (
                      <div
                        key={stop.id}
                        onClick={() => setSelectedStop(stop)}
                        className="relative z-10 flex flex-col items-center cursor-pointer group"
                      >
                        {/* Node Badge */}
                        <div
                          className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 border-2 ${
                            isSelected
                              ? "bg-blue-600 text-white border-blue-800 scale-110 shadow-lg shadow-blue-500/30"
                              : stop.highlight
                              ? "bg-white text-blue-700 border-blue-600 hover:scale-105 shadow-md"
                              : "bg-slate-50 text-slate-600 border-slate-300 hover:border-slate-400 hover:scale-105"
                          }`}
                        >
                          <span className="text-[10px] font-black opacity-80">
                            {stop.seq}
                          </span>
                          <span className="text-xs font-extrabold">🚏</span>
                        </div>

                        {/* Stop Name Label */}
                        <div className="mt-3 text-center max-w-[90px]">
                          <p
                            className={`text-xs font-bold leading-tight transition ${
                              isSelected
                                ? "text-blue-600 font-black"
                                : "text-slate-800 group-hover:text-blue-600"
                            }`}
                          >
                            {stop.name}
                          </p>
                          <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                            {stop.type}
                          </span>
                        </div>

                        {/* Selected Indicator Pill */}
                        {isSelected && (
                          <span className="mt-1 text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full animate-bounce">
                            선택됨
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VERTICAL TIMELINE VIEW */}
            {viewMode === "vertical" && (
              <div className="relative pl-6 border-l-2 border-blue-500/30 space-y-6 my-2">
                {filteredStops.map((stop) => {
                  const isSelected = selectedStop?.id === stop.id;
                  return (
                    <div
                      key={stop.id}
                      onClick={() => setSelectedStop(stop)}
                      className={`relative cursor-pointer transition p-3.5 rounded-xl border ${
                        isSelected
                          ? "bg-blue-50 border-blue-300 shadow-sm"
                          : "bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300"
                      }`}
                    >
                      {/* Timeline Dot */}
                      <span
                        className={`absolute -left-[31px] top-4 w-4 h-4 rounded-full border-2 ${
                          isSelected
                            ? "bg-blue-600 border-white ring-4 ring-blue-100"
                            : "bg-white border-blue-500"
                        }`}
                      />

                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">
                              {stop.seq}
                            </span>
                            <h3 className="text-sm font-bold text-slate-800">
                              {stop.name}
                            </h3>
                            <span className="text-[10px] text-slate-400 font-mono">
                              ({stop.englishName})
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">{stop.info}</p>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">
                          {stop.type}
                        </span>
                      </div>

                      {/* Transfer Badges */}
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {stop.transfers.map((tr, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded"
                          >
                            🔄 {tr}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* STOP DETAIL MODAL / CARD */}
          {selectedStop && (
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-xl border border-blue-700/50 animate-fadeIn">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-400 text-slate-900 text-xs font-black px-2 py-0.5 rounded">
                      NO. {selectedStop.seq}
                    </span>
                    <span className="text-xs text-blue-200 uppercase tracking-wider">
                      {selectedStop.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mt-1">{selectedStop.name}</h3>
                  <p className="text-xs text-blue-300 font-mono">
                    {selectedStop.englishName}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedStop(null)}
                  className="text-blue-300 hover:text-white text-sm font-bold bg-blue-800/50 hover:bg-blue-800 w-7 h-7 rounded-full flex items-center justify-center transition"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-blue-100 mt-3 bg-blue-950/40 p-3 rounded-xl border border-blue-700/30">
                💡 {selectedStop.info}
              </p>

              <div className="mt-4">
                <span className="text-xs text-blue-300 font-semibold block mb-1">
                  환승 가능 노선:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStop.transfers.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white/10 text-white px-2.5 py-1 rounded-lg border border-white/10 font-medium"
                    >
                      🚌 {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick AI Question Shortcut for Selected Stop */}
              <button
                onClick={() =>
                  handleAskAI(`${selectedStop.name}에서 평택역까지 얼마나 걸려?`)
                }
                className="mt-4 w-full bg-blue-500 hover:bg-blue-400 text-slate-900 text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
              >
                <span>🤖</span>
                <span>"{selectedStop.name} ➔ 평택역" 소요시간 AI에게 물어보기</span>
              </button>
            </div>
          )}

          {/* Quick Route Summary Card */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <span className="text-xs text-slate-500 block font-medium">총 운행 거리</span>
              <span className="text-base font-extrabold text-blue-700 mt-0.5 block">약 28.5 km</span>
            </div>
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <span className="text-xs text-slate-500 block font-medium">평균 소요 시간</span>
              <span className="text-base font-extrabold text-blue-700 mt-0.5 block">45분 ~ 50분</span>
            </div>
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <span className="text-xs text-slate-500 block font-medium">첫차 / 막차</span>
              <span className="text-xs font-bold text-slate-800 mt-1 block">05:40 / 22:30</span>
            </div>
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <span className="text-xs text-slate-500 block font-medium">주요 요금</span>
              <span className="text-xs font-bold text-slate-800 mt-1 block">시내버스 기본요금</span>
            </div>
          </div>
        </section>

        {/* Right Column: AI Assistant Interface (4 Cols) */}
        <section className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 flex flex-col h-[620px]">
            {/* AI Assistant Header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/80 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                  🤖
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">1150 AI 길잡이</h3>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    실시간 지능형 답변 중
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Log History */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
              {chatLog.map((log, index) => (
                <div
                  key={index}
                  className={`flex ${
                    log.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      log.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none shadow-sm"
                        : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/60"
                    }`}
                  >
                    {log.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-slate-500 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
                    <span>AI가 최적 노선을 분석하고 있습니다...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Prompt Pills */}
            <div className="px-3 py-2 border-t border-slate-100 bg-slate-50/50 flex flex-wrap gap-1">
              <button
                onClick={() => handleAskAI("한경대에서 평택역 가는 법 알려줘")}
                className="text-[10px] bg-white text-slate-600 hover:text-blue-600 border border-slate-200 px-2 py-1 rounded-lg transition"
              >
                💡 한경대 ➔ 평택역
              </button>
              <button
                onClick={() => handleAskAI("중앙대 막차 시간 알려줘")}
                className="text-[10px] bg-white text-slate-600 hover:text-blue-600 border border-slate-200 px-2 py-1 rounded-lg transition"
              >
                ⏱️ 중앙대 막차
              </button>
              <button
                onClick={() => handleAskAI("공도터미널에서 70번 버스와 차이점은?")}
                className="text-[10px] bg-white text-slate-600 hover:text-blue-600 border border-slate-200 px-2 py-1 rounded-lg transition"
              >
                🔄 70번 버스와 차이
              </button>
            </div>

            {/* Input Box */}
            <div className="p-3 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
                placeholder="1150번 버스에 대해 질문해 보세요..."
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-100 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
              <button
                onClick={() => handleAskAI()}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition disabled:opacity-50 shadow-sm"
              >
                전송
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
