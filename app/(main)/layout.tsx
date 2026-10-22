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
      
      <header className="h-10 shrink-0 border-b">
        <MainHeader />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 shrink-0 border-r">
            <LeftSidebar />
        </aside>

        {/* 中栏：渲染 children，并包裹在可滚动容器中 */}
        <main className="flex-1 overflow-y-auto">
            <div className="">
                {children}
            </div>
        </main>

        <aside className="w-72 shrink-0 border-l">
            <RightPanel />
        </aside>
      </div>
    </div>
  );
}