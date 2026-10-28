import type { UIMessage } from 'ai';
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport } from '../ui/message-scroller';
import { Message, MessageContent } from '../ui/message';
import { Bubble, BubbleContent } from '../ui/bubble';
import { Streamdown } from 'streamdown';

interface ChatMainProps {
  messages: UIMessage[];
}
export default function ChatMain({messages}:ChatMainProps) {
  return (
    <main className="flex-1 min-h-0 w-full overflow-hidden">
      <MessageScrollerProvider autoScroll>
        <MessageScroller>
          <MessageScrollerViewport>
            <MessageScrollerContent className="p-3">
              {messages.map((message) => {
                const isUser = message.role === 'user';
                const align = isUser ? 'end' : 'start';
                return (
                  <MessageScrollerItem
                    key={message.id}
                    messageId={message.id}
                    scrollAnchor={isUser}
                  >
                    <Message align={align}>
                      <MessageContent>
                        <Bubble
                          align={align}
                          variant={isUser ? 'muted' : 'ghost'}
                        >
                          <BubbleContent className={isUser?'whitespace-pre-wrap':'whitespace-normal'}>
                            {message.parts.map((part, index) =>{
                              if (part.type !== 'text') return null
                              return isUser ? (<span key={index}>{part.text}</span>) : (
                                <Streamdown key={index} className="chat-markdown min-w-0">
                                  {part.text}
                                </Streamdown>
                              )
                            })}
                          </BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                );
              })}
            </MessageScrollerContent>
          </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  </main>
  )
}
