'use client';
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import Moveable from 'react-moveable';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

type CanvasItem = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  html: string;
};

export default function DashboardPage() {
  const [interactive, setInteractive] = useState(false);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const moveableRef = useRef<Moveable>(null);
  const demoHtml = `<div>111</div>`
  const [items, setItems] = useState<CanvasItem[]>([
    {
      id: 'page-1',
      x: 100,
      y: 100,
      width: 600,
      height: 400,
      html: demoHtml,
    },
    {
      id: 'page-2',
      x: 850,
      y: 100,
      width: 400,
      height: 400,
      html: demoHtml,
    }
  ]);

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedItem = items.find((item)=>item.id === selectedId)


  function updateItem(id: string, patch: Partial<Omit<CanvasItem, 'id'>>){
    setItems((previous)=> 
      previous.map((item)=> 
        item.id === id ? {...item, ...patch}:item
    ))
  }
  return (
    <div className="flex min-h-0 flex-col h-full">
      <div className="shrink-0 border-b p-2">
        <Button
          size='sm'
          variant="outline"
          onClick={() => setInteractive((value) => !value)}
        >
          {interactive ? '返回编辑' : '交互预览'}
        </Button>
      </div>
      <div 
        ref={setViewport}
        className="relative min-h-0 flex-1 overflow-hidden"
      >
        <TransformWrapper
          minScale={0.1}
          maxScale={5}
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
          <TransformComponent
            wrapperStyle={{ width: '100%', height: '100%' }}
          >
            <div
              className={`relative bg-background ${interactive ? '' : 'select-none'}`}
              style={{ width: 4000, height: 3000 }}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  setSelectedId(null);
                  setTarget(null);
                }
              }}
            >
              {items.map((item)=>(
                <div
                  key={item.id}
                  className="canvas-object absolute left-0 top-0"
                  style={{
                    width: item.width,
                    height: item.height,
                    transform: `translate(${item.x}px, ${item.y}px)`,
                  }}
                  onMouseDown={(event)=>{
                    if (interactive || event.button !== 0) return
                    event.preventDefault()
                    const nextTarget = event.currentTarget
                    if (target === nextTarget) return

                    const moveable = moveableRef.current
                    const inputEvent = event.nativeEvent
                    const targetReady = moveable?.waitToChangeTarget()
                    setSelectedId(item.id)
                    setTarget(nextTarget)
                    void targetReady?.then(() => {
                      if (moveableRef.current === moveable) {
                        moveable?.dragStart(inputEvent)
                      }
                    })
                  }}
                >
                  <iframe
                    title={`网页预览${item.id}`}
                    sandbox="allow-scripts"
                    srcDoc={item.html}
                    className="h-full w-full border-0 bg-white"
                    style={{
                      pointerEvents: interactive ? 'auto' : 'none',
                    }}
                  />
                  {!interactive && (
                    <div className="absolute inset-0 cursor-move" />
                  )}
                </div>
              ))}
              
              {!interactive && (
                <Moveable
                  ref={moveableRef}
                  target={target}
                  rootContainer={viewport ?? undefined}
                  zoom={1 / scale}
                  draggable
                  resizable
                  origin={false}
                  keepRatio={false}
                  renderDirections={['e', 's', 'se']}
                  useResizeObserver
                  onDragStart={(event) => {
                    if (!selectedItem) return;
                    event.set([selectedItem.x, selectedItem.y]);
                  }}
                  onDrag={(event) => {
                    if (!selectedItem) return;
                    const [x, y] = event.beforeTranslate
                    flushSync(()=>{
                      updateItem(selectedItem.id, {x, y})
                    })
                  }}
                  onResize={(event) => {
                    if (!selectedItem) return;
                    flushSync(() => {
                      updateItem(selectedItem.id,{
                        width: Math.max(200, event.width),
                        height: Math.max(120, event.height),
                      });
                    });
                  }}
                />
              )}

            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  )
}
