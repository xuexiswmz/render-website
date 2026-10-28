'use client'
import LeftSidebar from "@/components/layout/LeftSidebar";
import MainHeader from "@/components/layout/MainHeader";
import RightPanel from "@/components/layout/RightPanel";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { usePanelRef } from "react-resizable-panels";

// 1. 必须接收 children 属性
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatOpen, setIsChatOpen] = useState(true)
  const chatPanelRef = usePanelRef();

  useEffect(() => {
    const panel = chatPanelRef.current;
    if (isChatOpen) panel?.expand();
    else panel?.collapse();
  }, [isChatOpen, chatPanelRef]);
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      
      <header className="h-10 shrink-0 rounded-md mb-1 border">
        <MainHeader />
      </header>

      <ResizablePanelGroup orientation="horizontal" className="flex flex-1 min-h-0 overflow-hidden">
        <ResizablePanel
          defaultSize="256px"
          className="overflow-hidden rounded-md border"
        >
          <LeftSidebar
            isChatOpen={isChatOpen}
            onOpenChat={() => setIsChatOpen(true)}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* 中栏：渲染 children，并包裹在可滚动容器中 */}
        <ResizablePanel minSize="25%" className="min-w-0 overflow-y-auto rounded-md">
          {children}
        </ResizablePanel>
        
        <ResizableHandle
          withHandle
        />

        <ResizablePanel
          panelRef={chatPanelRef}
          collapsible
          collapsedSize="0px"
          defaultSize="256px"
          minSize="280px"
          onResize={(size) => setIsChatOpen(size.inPixels > 0)}
          className={`min-h-0 overflow-hidden rounded-md ${
            isChatOpen ? 'border' : ''
          }`}
        >
          <div className="relative h-full w-full">
            <RightPanel onClose={()=>setIsChatOpen(false)}/>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
