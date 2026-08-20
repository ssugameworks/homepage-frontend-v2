import { Outlet } from "react-router-dom";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-primary-950">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
