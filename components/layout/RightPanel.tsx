'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowUpIcon, Plus, PlusIcon, RotateCcwClock, X } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from '../ui/input-group'

interface RightPanelProps {
  onClose: () => void;
}

export default function RightPanel({
  onClose
}:RightPanelProps) {
    const headerItems = [
        {Icon: Plus, label: 'New Session'},
        {Icon: RotateCcwClock, label: 'History'}
    ]
    const [text, setText] = React.useState('')
    const formRef = React.useRef<HTMLFormElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const canSend = text.trim().length > 0
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!canSend) return
        console.log('submit', text)
        setText('')
    }
  return (
    <div className={`absolute inset-0 flex flex-col overflow-hidden items-center justify-between`}>
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
        <main className="flex-1 min-h-0 w-full overflow-y-auto">
            main
        </main>
        <footer className=" w-full items-center flex shrink-0">
            <form ref={formRef} onSubmit={onSubmit} className="w-full">
                <InputGroup>
                    <InputGroupTextarea
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Ask the agent to change your code..."
                    className="p-3"
                    />
                    <InputGroupAddon align="block-end">
                    <InputGroupButton
                        size="icon-sm"
                        variant="outline"
                        className="rounded-full"
                        aria-label="Attach files"
                        onClick={() => inputRef.current?.click()}
                    >
                        <PlusIcon />
                    </InputGroupButton>
                    <InputGroupButton
                        type="submit"
                        size="icon-sm"
                        variant="default"
                        className="ml-auto rounded-full"
                        disabled={!canSend}
                        aria-label="Send"
                    >
                        <ArrowUpIcon />
                    </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </form>
        </footer>
    </div>
  )
}
