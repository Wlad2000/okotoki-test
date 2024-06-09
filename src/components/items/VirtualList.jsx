/****************************************************************************
** VirtualList
** 
**
**
****************************************************************************/
import React, { useRef, useState } from 'react'

const VirtualList = ({ items, itemHeight, renderItem, height }) => {
    const [visibleStart, setVisibleStart] = useState(0);
    const containerRef = useRef();

    const visibleCount = Math.ceil(height / itemHeight);

    const handleScroll = () => {
        const scrollTop = containerRef.current.scrollTop;
        setVisibleStart(Math.floor(scrollTop / itemHeight));
    };

    return (
        <div
            ref={containerRef}
            style={{ height: height, overflowY: 'auto', position: 'relative' }}
            onScroll={handleScroll}
        >
            <div style={{ height: items.length * itemHeight, position: 'relative' }}>
                {items.slice(visibleStart, visibleStart + visibleCount).map((item, index) =>
                    renderItem({ key: item, index: visibleStart + index, style: { top: (visibleStart + index) * itemHeight, position: 'absolute', width: '100%' } })
                )}
            </div>
        </div>
    );
};

export default VirtualList