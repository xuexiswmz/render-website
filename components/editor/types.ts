import type { Spec } from '@json-render/core'

export type CanvasItem = {
  id: string
  // 编辑器中的摆放坐标，不代表导出网页内部的组件布局。
  x: number
  y: number
  width: number
  height: number
  // 页面内部的组件结构，与画布外壳的位置和尺寸分开保存。
  spec: Spec
}

export type CanvasItemPatch = Partial<Omit<CanvasItem, 'id'>>
export type CanvasPosition = Pick<CanvasItem, 'id' | 'x' | 'y'>
