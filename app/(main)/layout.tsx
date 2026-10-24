import LeftSidebar from "@/components/layout/LeftSidebar";
import MainHeader from "@/components/layout/MainHeader";
import RightPanel from "@/components/layout/RightPanel";

// 1. 必须接收 children 属性
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      
      <header className="h-10 shrink-0 rounded-md mb-1 border-b">
        <MainHeader />
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <aside className="border rounded-md">
          <LeftSidebar />
        </aside>

        {/* 中栏：渲染 children，并包裹在可滚动容器中 */}
        <main className="flex-1 min-w-0 overflow-y-auto rounded-md">
          {children}
        </main>

        <aside className="w-72 shrink-0 border rounded-md">
          <RightPanel />
        </aside>
      </div>
    </div>
  );
}