import {useState, useCallback, useRef} from 'react'

interface IUseDrawerResizeProps {
    minWidth: number
    maxWidth: number
    initialWidth: number
    onWidthChange?: (width: number) => void
    onResizeStateChange?: (isResizing: boolean) => void
}

interface IUseDrawerResizeReturn {
    width: number
    handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
}

/**
 * Хук для управления ресайзом Drawer
 */
export const useDrawerResize = ({
    minWidth,
    maxWidth,
    initialWidth,
    onWidthChange,
    onResizeStateChange,
}: IUseDrawerResizeProps): IUseDrawerResizeReturn => {
    const [width, setWidth] = useState(initialWidth)
    const isResizing = useRef(false)
    const animationFrameRef = useRef<number | null>(null)
    const lastWidthRef = useRef(initialWidth)

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        isResizing.current = true
        onResizeStateChange?.(true)
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isResizing.current) {
                return
            }

            // Используем requestAnimationFrame для оптимизации производительности
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }

            animationFrameRef.current = requestAnimationFrame(() => {
                const newWidth = window.innerWidth - e.clientX
                const maxAllowedWidth = (window.innerWidth * maxWidth) / 100
                const clampedWidth = Math.max(minWidth, Math.min(maxAllowedWidth, newWidth))

                // Обновляем только если ширина изменилась значительно (> 1px)
                if (Math.abs(clampedWidth - lastWidthRef.current) > 1) {
                    setWidth(clampedWidth)
                    onWidthChange?.(clampedWidth)
                    lastWidthRef.current = clampedWidth
                }
            })
        },
        [minWidth, maxWidth, onWidthChange]
    )

    const handleMouseUp = useCallback(() => {
        isResizing.current = false
        onResizeStateChange?.(false)
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = null
        }
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }, [handleMouseMove, onResizeStateChange])

    return {
        width,
        handleMouseDown,
    }
}
