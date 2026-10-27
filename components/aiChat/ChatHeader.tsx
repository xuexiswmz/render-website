import { Plus, RotateCcwClock, X } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({onClose}:ChatHeaderProps) {
    const headerItems = [
        {Icon: Plus, label: 'New Session'},
        {Icon: RotateCcwClock, label: 'History'}
    ]
  return (
    <header className="border h-10 w-full justify-between items-center flex shrink-0 rounded-md">
            <div className="font-bold px-2">
                Chat
            </div>
            <div className="flex items-center">
                {headerItems.map((item, index) => (
                    <Tooltip key={index}>
                        <TooltipTrigger render={
                            <Button variant="ghost" size="lg">
                                <item.Icon width={16} height={16} />
                            </Button>} />
                        <TooltipContent side="top">
                            {item.label}
                        </TooltipContent>
                    </Tooltip>
                ))}
                <Button variant="ghost" size="lg" onClick={onClose}>
                    <X width={16} height={16} />
                </Button>
            </div>
        </header>
  )
}
