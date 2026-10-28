import React, { useState } from 'react'
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

import { ArrowUpIcon, PlusIcon } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from '../ui/input-group'

interface ChatFooterProps {
  onSend: (text: string) => void;
  busy: boolean;
}
export default function ChatFooter({onSend,busy}:ChatFooterProps) {
        
    const [text, setText] = React.useState('')
    const canSend = text.trim().length > 0
    const formRef = React.useRef<HTMLFormElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
         const value = text.trim();
        if (!value || busy) return;
        onSend(value);
        setText('');
    }
    
  const [input, setInput] = useState('');
  return (
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
                        disabled={!text.trim() || busy}
                        aria-label="Send"
                    >
                        <ArrowUpIcon />
                    </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </form>
        </footer>
  )
}
