import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

// 一个渠道创建一次，下面的多个模型共用它
const deepseek = createOpenAICompatible({
  name: 'deepseek',
  baseURL: process.env.DEEPSEEK_BASE_URL!,
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const qwen = createOpenAICompatible({
  name: 'qwen',
  baseURL: process.env.QWEN_BASE_URL!,
  apiKey: process.env.QWEN_API_KEY,
});

// 左边：你的应用内标识；右边：渠道提供的模型 ID
export const models = new Map([
  ['deepseek-flash', deepseek('deepseek-flash')],
  ['deepseek-pro', deepseek('deepseek-v4-pro')],
  ['qwen-plus', qwen('qwen-plus')],
]);