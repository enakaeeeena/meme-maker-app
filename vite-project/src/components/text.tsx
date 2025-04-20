import React, { useState, useRef, useEffect } from "react";

const Text = () => {
    const [editMode, setEditMode] = useState(false);
    const [val, setVal] = useState("Click to Edit");
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const textRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current || !textRef.current) return;
            
            const deltaX = e.clientX - startPos.current.x;
            const deltaY = e.clientY - startPos.current.y;
            
            setPosition(prev => ({
                x: prev.x + deltaX,
                y: prev.y + deltaY
            }));

            startPos.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        if (isDragging.current) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
    }, [isDragging.current]);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        startPos.current = { x: e.clientX, y: e.clientY };
        e.preventDefault();
    };

    return (
        <div
            ref={textRef}
            style={{
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: "move",
                userSelect: "none",
                background: editMode ? "#fff" : "transparent",
                padding: "5px",
                borderRadius: "3px",
                zIndex: 2
            }}
            onMouseDown={handleMouseDown}
        >
            {editMode ? (
                <div className="d-flex align-items-center gap-2">
                    <input
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        style={{ width: "200px" }}
                        className="form-control form-control-sm"
                        autoFocus
                    />
                    <button
                        onClick={() => setEditMode(false)}
                        className="btn btn-success btn-sm"
                    >
                        ✓
                    </button>
                </div>
            ) : (
                <h3
                    onClick={() => setEditMode(true)}
                    style={{
                        margin: 0,
                  
                        color: "#000",
                        cursor: "move"
                    }}
                >
                    {val}
                </h3>
            )}
        </div>
    );
};

export default Text;