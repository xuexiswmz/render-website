import type { MouseEventHandler } from 'react'
import PageRenderer from './PageRenderer'
import type { CanvasItem } from './types'

type CanvasPageProps = {
  item: CanvasItem
  interactive: boolean
  onMouseDown: MouseEventHandler<HTMLDivElement>
}

export default function CanvasPage({ item, interactive, onMouseDown }: CanvasPageProps) {
  // 外壳负责画布上的位置和尺寸，内部交给 PageRenderer 渲染页面内容。
  return (
    <div
      data-id={item.id}
      className="canvas-object absolute left-0 top-0"
      style={{
        width: item.width,
        height: item.height,
        transform: `translate(${item.x}px, ${item.y}px)`,
      }}
      onMouseDown={onMouseDown}
    >
      <div
        className="h-full w-full overflow-auto bg-background p-6 text-foreground"
        style={{ pointerEvents: interactive ? 'auto' : 'none' }}
      >
        <PageRenderer spec={item.spec} />
      </div>
      {/* 编辑时用遮罩接收拖动；预览时移除遮罩，允许操作内部组件。 */}
      {!interactive && <div className="absolute inset-0 cursor-move" />}
    </div>
  )
}
