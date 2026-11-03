import { Button } from '@/components/ui/button'

type EditorToolbarProps = {
  interactive: boolean
  onToggleInteractive: () => void
}

export default function EditorToolbar({ interactive, onToggleInteractive }: EditorToolbarProps) {
  return (
    <div className="shrink-0 border-b p-2">
      <Button size="sm" variant="outline" onClick={onToggleInteractive}>
        {interactive ? '返回编辑' : '交互预览'}
      </Button>
    </div>
  )
}
