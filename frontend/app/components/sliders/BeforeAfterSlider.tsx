"use client";

import { useState, useRef } from "react";

interface BeforeAfterSliderProps {
    before: string;
    after: string;
    width?: number | string;
    height?: number | string;
}

export default function BeforeAfterSlider({
    before,
    after,
    width = "100%",
    height = "400px",
}: BeforeAfterSliderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [sliderPos, setSliderPos] = useState(50);
    const isDragging = useRef(false);

    const updatePos = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        let newPos = ((clientX - rect.left) / rect.width) * 100;
        newPos = Math.max(0, Math.min(100, newPos));
        setSliderPos(newPos);
    };

    const handleMouseDown = () => { isDragging.current = true; };
    const handleMouseUp = () => { isDragging.current = false; };
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        updatePos(e.clientX);
    };

    const handleTouchStart = () => { isDragging.current = true; };
    const handleTouchEnd = () => { isDragging.current = false; };
    const handleTouchMove = (e: React.TouchEvent) => {
        updatePos(e.touches[0].clientX);
    };

    return (
        <div
            ref={containerRef}
            className="relative select-none overflow-hidden rounded-xl cursor-col-resize"
            style={{ width, height, display: "block", flexShrink: 0 }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
        >
            {/* Before image */}
            <img
                src={before}
                alt="Before"
                draggable={false}
                style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center",
                    display: "block",
                }}
            />

            {/* After image — clipped from the left at slider position */}
            <img
                src={after}
                alt="After"
                draggable={false}
                style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center",
                    display: "block",
                    clipPath: `inset(0 0 0 ${sliderPos}%)`,
                }}
            />

            {/* Slider line */}
            <div
                className="absolute top-0 h-full w-0.5 bg-white shadow-md pointer-events-none"
                style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
            />

            {/* Slider handle */}
            <div
                className="absolute w-8 h-8 bg-white rounded-full shadow-lg pointer-events-none flex items-center justify-center"
                style={{ top: "50%", left: `${sliderPos}%`, transform: "translate(-50%, -50%)" }}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 4L1 8L5 12M11 4L15 8L11 12" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
}