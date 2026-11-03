import type { Spec } from '@json-render/core'

export const demoPageSpec: Spec = {
  // root 指向入口组件；elements 平铺保存节点，由 children 引用建立层级。
  root: 'welcome-card',

  elements: {
    'welcome-card': {
      type: 'Card',
      props: {
        title: '卡片组件',
        description: '这张卡片由 JSON 描述，使用 shadcn 渲染。',
      },
      children: ['start-button'],
    },

    'start-button': {
      type: 'Button',
      props: {
        label: '立即开始',
        variant: 'default',
      },
      children: [],
    },
  },
}
