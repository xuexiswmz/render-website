'use client';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function DashboardPage() {
  return (
    // <div className="w-screen h-screen">
    <TransformWrapper>
        <TransformComponent>
            <div className="w-screen h-screen bg-[#191919]">
                <h1 className="text-2xl font-bold">Dashboard Page</h1>
                <p>this is a zoom canvas</p>
            </div>
        </TransformComponent>
    </TransformWrapper>
    // </div>
  )
}
