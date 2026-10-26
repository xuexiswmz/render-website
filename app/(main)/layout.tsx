'use client'
import LeftSidebar from "@/components/layout/LeftSidebar";
import MainHeader from "@/components/layout/MainHeader";
import RightPanel from "@/components/layout/RightPanel";
import { useState } from "react";

// 1. 必须接收 children 属性
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatOpen, setIsChatOpen] = useState(true)
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      
      <header className="h-10 shrink-0 rounded-md mb-1 border">
        <MainHeader />
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <aside className="border rounded-md">
          <LeftSidebar
            isChatOpen={isChatOpen}
            onOpenChat={() => setIsChatOpen(true)}
          />
        </aside>

        {/* 中栏：渲染 children，并包裹在可滚动容器中 */}
        <main className="flex-1 min-w-0 overflow-y-auto rounded-md">
          {children}
        </main>

        <aside className={`
            min-h-0 shrink-0 overflow-hidden rounded-md
            transition-[width] duration-300 ease-in-out
            ${isChatOpen ? "w-72 border" : "w-0 border-0"}
          `}
        >
          <div className="relative h-full w-72">
            <RightPanel onClose={()=>setIsChatOpen(false)}/>
          </div>
        </aside>
      </div>
    </div>
  );
}