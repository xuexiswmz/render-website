'use client'

import { useState } from 'react'
import { useCanvasItems } from '@/hooks/use-canvas-items'
import EditorCanvas from './EditorCanvas'
import EditorToolbar from './EditorToolbar'

export default function CanvasEditor() {
  // 在入口管理页面数据和编辑模式，让工具栏与画布共享它们。
  const [interactive, setInteractive] = useState(false)
  const { items, updateItem, updatePositions } = useCanvasItems()

  return (
    <div className="flex h-full min-h-0 flex-col">
      <EditorToolbar
        interactive={interactive}
        onToggleInteractive={() => setInteractive((value) => !value)}
      />
      <EditorCanvas
        interactive={interactive}
        items={items}
        onUpdateItem={updateItem}
        onUpdatePositions={updatePositions}
      />
    </div>
  )
}
