'use client'

import type { Spec } from '@json-render/core'
import {
  defineRegistry,
  JSONUIProvider,
  Renderer,
} from '@json-render/react'
import { pageCatalog } from '@/lib/page-catalog'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

// 把目录中的组件名称和属性映射到实际的 shadcn 组件。
const { registry } = defineRegistry(pageCatalog, {
  components: {
    Card: ({ props, children }) => (
      <Card>
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-start gap-4">
          {children}
        </CardContent>
      </Card>
    ),

    Button: ({ props }) => (
      <Button variant={props.variant}>
        {props.label}
      </Button>
    ),
  },
})

export default function PageRenderer({ spec }: { spec: Spec }) {
  // 每张页面使用独立的渲染上下文，隔离运行时状态与动作。
  return (
    <JSONUIProvider registry={registry}>
      <Renderer spec={spec} registry={registry} />
    </JSONUIProvider>
  )
}
