'use client'
import React from 'react'
import ChatHeader from '../aiChat/ChatHeader'
import ChatFooter from '../aiChat/ChatFooter';
import ChatMain from '../aiChat/ChatMain';

interface RightPanelProps {
  onClose: () => void;
}

export default function RightPanel({onClose}:RightPanelProps) {
    
    
  return (
    <div className={`absolute inset-0 flex flex-col overflow-hidden items-center justify-between`}>
        <ChatHeader onClose={onClose}/>
        <ChatMain/>
        <ChatFooter />
    </div>
  )
}
