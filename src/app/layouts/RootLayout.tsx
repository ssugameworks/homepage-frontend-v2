import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "@/shared/ui";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-primary-950">
      <Header />
      <main className="flex-1">
        {/* 페이지 콘텐츠에서 렌더링 에러가 나도 헤더/푸터는 그대로 남도록 여기서만 감싼다. */}
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
