import { useState } from 'react'
import type { CanvasItem, CanvasItemPatch, CanvasPosition } from '@/components/editor/types'
import { demoPageSpec } from '@/lib/demo-page'

const initialItems: CanvasItem[] = [
  { id: 'page-1', x: 100, y: 100, width: 600, height: 400, spec: demoPageSpec },
  { id: 'page-2', x: 850, y: 100, width: 400, height: 400, spec: demoPageSpec },
]

export function useCanvasItems() {
  const [items, setItems] = useState<CanvasItem[]>(initialItems)

  function updateItem(id: string, patch: CanvasItemPatch) {
    // 保留未更新的字段，并创建新对象触发 React 更新，避免直接修改原数据。
    setItems((previous) =>
      previous.map((item) => item.id === id ? { ...item, ...patch } : item)
    )
  }

  function updatePositions(positions: CanvasPosition[]) {
    // 先按 ID 建索引，组拖动时在一次状态更新中批量写入坐标。
    const positionsById = new Map(positions.map((position) => [position.id, position]))

    setItems((previous) =>
      previous.map((item) => {
        const position = positionsById.get(item.id)
        return position ? { ...item, x: position.x, y: position.y } : item
      })
    )
  }

  return { items, updateItem, updatePositions }
}
