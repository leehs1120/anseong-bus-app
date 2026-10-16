export const metadata = {
  title: '안성 대중교통 AI 가이드',
  description: '안성 지역 버스 시각화 및 안내 서비스',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#f8fafc" }}>
        {children}
      </body>
    </html>
  )
}
