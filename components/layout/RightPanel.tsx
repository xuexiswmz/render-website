'use client'
import ChatHeader from '../aiChat/ChatHeader'
import ChatFooter from '../aiChat/ChatFooter';
import ChatMain from '../aiChat/ChatMain';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { toast } from '../ui/toast';

interface RightPanelProps {
  onClose: () => void;
}

export default function RightPanel({onClose}:RightPanelProps) {
    const { messages, sendMessage, status,error } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat',
        }),
        onError:()=>{
            toast.add({
                type:'error',
                title: '发送失败',
                description: '请稍后重试',
            })
        }
    });
    const busy = status === 'submitted' || status === 'streaming';
    return (
        <div className={`absolute inset-0 flex flex-col overflow-hidden items-center justify-between`}>
            <ChatHeader onClose={onClose}/>
            <ChatMain messages={messages}/>
            <ChatFooter 
                busy={busy}
                onSend={(text) => {
                    void sendMessage({ text });
                }}
            />
        </div>
  )
}
