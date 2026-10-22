'use client'

import { Blocks, Folder, PanelLeftOpen, Puzzle } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function LeftSidebar() {
  const [isExpand, setIsExpand] = useState(false)
  const menuItems = [
    {icon:Folder, label: 'folder'},
    {icon:Blocks, label: 'blocks'},
    {icon:Puzzle, label: 'puzzle'}
  ]
  return (
    <div className="flex h-full ">
      <div className="flex flex-col border-r w-15 items-center ">
        <div className="p-2">
          {menuItems.map((item)=>{
            const Icon = item.icon
            return (
              <Tooltip key={item.label}>
              <TooltipTrigger render={
                  <Button variant="outline" className="w-10 h-10 border-none mb-1">
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
      <div>
        content
      </div>
    </div>
  )
}