import { defineCatalog } from '@json-render/core'
import { schema } from '@json-render/react/schema'
import { z } from 'zod'

// 定义可用组件及属性约束；后续生成 AI 提示和校验页面数据时复用。
export const pageCatalog = defineCatalog(schema, {
  components: {
    Card: {
      props: z.object({
        title: z.string(),
        description: z.string(),
      }),
      slots: ['default'],
      description: '卡片容器，可以包含子组件',
    },
    Button: {
      props: z.object({
        label: z.string(),
        variant: z.enum(['default', 'outline', 'secondary']),
      }),
      slots: [],
      description: '按钮',
    },
  },
  actions: {},
})
