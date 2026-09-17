import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "@/app/router/router";
import { TooltipProvider } from "@/shared/ui";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    // 활동/임원진 목록 등은 자주 바뀌지 않는 콘텐츠라, 기본값(0)대로면 페이지를 오갈 때마다
    // 매번 재요청하고 그 결과로 불필요한 리렌더가 일어난다. 1분간은 캐시를 그대로 쓴다.
    queries: { staleTime: 60_000 },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-center" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
