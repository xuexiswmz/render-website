import type { RefObject } from 'react'
import { flushSync } from 'react-dom'
import Moveable from 'react-moveable'
import type { CanvasItem, CanvasItemPatch, CanvasPosition } from './types'

type CanvasSelectionControlsProps = {
  moveableRef: RefObject<Moveable | null>
  targets: HTMLDivElement[]
  viewport: HTMLDivElement | null
  scale: number
  items: CanvasItem[]
  selectedItem: CanvasItem | undefined
  onUpdateItem: (id: string, patch: CanvasItemPatch) => void
  onUpdatePositions: (positions: CanvasPosition[]) => void
}

export default function CanvasSelectionControls({
  moveableRef, targets, viewport, scale, items, selectedItem,
  onUpdateItem, onUpdatePositions,
}: CanvasSelectionControlsProps) {
  // zoom 取画布比例的倒数，让控制点在屏幕上保持大小。
  return (
    <Moveable
      ref={moveableRef}
      target={targets}
      rootContainer={viewport ?? undefined}
      zoom={1 / scale}
      draggable
      resizable={targets.length === 1}
      origin={false}
      keepRatio={false}
      renderDirections={['e', 's', 'se']}
      useResizeObserver
      onDragStart={(event) => {
        if (!selectedItem) return
        // 从已保存的位置开始计算，避免重新拖动时跳回原点。
        event.set([selectedItem.x, selectedItem.y])
      }}
      onDrag={(event) => {
        if (!selectedItem) return
        const [x, y] = event.beforeTranslate
        // 同步提交 DOM 更新，让 Moveable 下一次测量读到最新位置；尺寸更新同理。
        flushSync(() => onUpdateItem(selectedItem.id, { x, y }))
      }}
      onResize={(event) => {
        if (!selectedItem) return
        flushSync(() => {
          onUpdateItem(selectedItem.id, {
            width: Math.max(200, event.width),
            height: Math.max(120, event.height),
          })
        })
      }}
      onDragGroupStart={({ events }) => {
        // 组事件中每个 DOM 各有一份拖动数据，通过 data-id 对应到页面。
        events.forEach((event) => {
          const id = event.target.getAttribute('data-id')
          const item = items.find((item) => item.id === id)
          if (item) event.set([item.x, item.y])
        })
      }}
      onDragGroup={({ events }) => {
        const positions: CanvasPosition[] = []
        events.forEach((event) => {
          const id = event.target.getAttribute('data-id')
          if (!id) return
          const [x, y] = event.beforeTranslate
          positions.push({ id, x, y })
        })
        // 一次提交整组的位置，保持页面之间的相对位置。
        flushSync(() => onUpdatePositions(positions))
      }}
    />
  )
}
