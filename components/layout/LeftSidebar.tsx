'use client'

import { Blocks, ChevronRight, ChevronLeft, Folder, Puzzle, Bot } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "../ui/separator"

interface LeftSidebarProps {
  isChatOpen: boolean;
  onOpenChat: () => void;
}


export default function LeftSidebar({
  isChatOpen,
  onOpenChat
}:LeftSidebarProps) {
  const [isExpand, setIsExpand] = useState(true)
  const menuItems = [
    {icon:Folder, label: 'code'},
    {icon:Blocks, label: 'components'},
    {icon:Puzzle, label: 'plugins'}
  ]
  return (
    <div className={`
        relative
        flex h-full shrink-0
        transition-[width] duration-300 ease-in-out
        ${isExpand ? "w-64" : "w-0"}
      `}>
        <div className={`flex flex-col items-center shrink-0 transition-colors duration-300 
            ${isExpand ? "w-15 h-full py-2": `
              fixed left-4 top-1/2 z-50
              -translate-y-1/2
              w-14 rounded-full
              border bg-background/95
              p-2 shadow-xl backdrop-blur-md
            `}
          `}>
          <div className="p-2 flex flex-col">
            <Button variant="ghost" className="w-10 h-10 border-none" onClick={()=>setIsExpand(!isExpand)}>
              {isExpand ? <ChevronLeft /> : <ChevronRight />}
            </Button>
            
            {/* Chat 关闭时才出现 Bot */}
            {!isChatOpen && (
              <Button
                variant="ghost"
                className="w-10 h-10 border-none"
                onClick={onOpenChat}
                title="打开 AI Chat"
              >
                <Bot className="size-5" />
              </Button>
            )}

            <Separator className="my-2" />
            {menuItems.map((item)=>{
              const Icon = item.icon
              return (
                <Tooltip key={item.label}>
                <TooltipTrigger render={
                    <Button variant="ghost" className="w-10 h-10 border-none mb-1">
                      <Icon width={20} height={20} color="#fdfdfd" />
                    </Button>
                  }/>
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
              </Tooltip>
              )
            })}
          </div>
        </div>
      {
        isExpand && (
          <div className="flex-1 min-w-0 overflow-hidden p-3">
            content
          </div>
        )
      }
    </div>
  )
}