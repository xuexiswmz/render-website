import { useRef, useState, type MouseEvent } from 'react'
import type Moveable from 'react-moveable'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import CanvasPage from './CanvasPage'
import CanvasSelectionControls from './CanvasSelectionControls'
import type { CanvasItem, CanvasItemPatch, CanvasPosition } from './types'

type EditorCanvasProps = {
  interactive: boolean
  items: CanvasItem[]
  onUpdateItem: (id: string, patch: CanvasItemPatch) => void
  onUpdatePositions: (positions: CanvasPosition[]) => void
}

export default function EditorCanvas({
  interactive, items, onUpdateItem, onUpdatePositions,
}: EditorCanvasProps) {
  // targets 供 Moveable 操作 DOM，selectedIds 用于查找对应的页面数据。
  const [targets, setTargets] = useState<HTMLDivElement[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)
  const moveableRef = useRef<Moveable>(null)
  const selectedItem = selectedIds.length === 1
    ? items.find((item) => item.id === selectedIds[0])
    : undefined

  function handleItemMouseDown(id: string, event: MouseEvent<HTMLDivElement>) {
    if (interactive || event.button !== 0) return
    event.preventDefault()
    const nextTarget = event.currentTarget
    const isSelected = targets.includes(nextTarget)

    // Shift 点击只增减选中项，不主动发起拖动。
    if (event.shiftKey) {
      setTargets((previous) => isSelected
        ? previous.filter((element) => element !== nextTarget)
        : [...previous, nextTarget])
      setSelectedIds((previous) => isSelected
        ? previous.filter((selectedId) => selectedId !== id)
        : [...previous, id])
      return
    }

    // 保留多选；已选对象的拖动由 Moveable 自己接管。
    if (isSelected) return

    const moveable = moveableRef.current
    const inputEvent = event.nativeEvent
    // 先等待目标切换，再接上同一次鼠标按下。
    const targetReady = moveable?.waitToChangeTarget()
    setSelectedIds([id])
    setTargets([nextTarget])
    // void 表示不使用返回的 Promise；回调仍会执行，也不会自动捕获错误。
    void targetReady?.then(() => {
      // 等待期间实例可能卸载或替换，只操作原来的实例。
      if (moveableRef.current === moveable) {
        moveable?.dragStart(inputEvent)
      }
    })
  }

  function handleBackgroundMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (interactive || event.button !== 0) return
    // 子元素的事件也会冒泡到这里，只有直接按下背景才清空选择。
    if (event.target !== event.currentTarget) return
    setSelectedIds([])
    setTargets([])
  }

  return (
    <div ref={setViewport} className="relative min-h-0 flex-1 overflow-hidden">
      <TransformWrapper
        minScale={0.1}
        maxScale={5}
        /* 禁止缩放越界回弹，避免最小比例附近频闪。 */
        zoomAnimation={{ size: 0 }}
        limitToBounds={false}
        doubleClick={{ disabled: true }}
        wheel={{ disabled: interactive }}
        panning={{
          disabled: interactive,
          excluded: ['canvas-object', 'moveable-control-box'],
        }}
        onTransform={(_, state) => setScale(state.scale)}
      >
        <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
          <div
            className={`relative bg-background ${interactive ? '' : 'select-none'}`}
            style={{ width: 4000, height: 3000 }}
            onMouseDown={handleBackgroundMouseDown}
          >
            {items.map((item) => (
              <CanvasPage
                key={item.id}
                item={item}
                interactive={interactive}
                onMouseDown={(event) => handleItemMouseDown(item.id, event)}
              />
            ))}
            {!interactive && (
              <CanvasSelectionControls
                moveableRef={moveableRef}
                targets={targets}
                viewport={viewport}
                scale={scale}
                items={items}
                selectedItem={selectedItem}
                onUpdateItem={onUpdateItem}
                onUpdatePositions={onUpdatePositions}
              />
            )}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}
