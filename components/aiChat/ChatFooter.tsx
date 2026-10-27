import React from 'react'

import { ArrowUpIcon, PlusIcon } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from '../ui/input-group'
export default function ChatFooter() {
        
    const [text, setText] = React.useState('')
    const canSend = text.trim().length > 0
    const formRef = React.useRef<HTMLFormElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
            if (!canSend) return
            console.log('submit', text)
            setText('')
    }
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
                        disabled={!canSend}
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
