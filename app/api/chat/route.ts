import {
  streamText,
  type UIMessage,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';
import { models } from '@/lib/models';

export async function POST(req: Request) {
  const {
    messages,
    modelId = 'deepseek-flash',
  }: {
    messages: UIMessage[];
    modelId?: string;
  } = await req.json();

  const model = models.get(modelId);

  if (!model) {
    return new Response('不支持的模型', { status: 400 });
  }

  const result = streamText({
    model,
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}