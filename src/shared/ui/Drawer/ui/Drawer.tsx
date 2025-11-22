import {FC, ReactNode, useEffect, useState, useRef, useCallback} from 'react'
import ReactDOM from 'react-dom'
import './Drawer.css'
import cn from 'classnames'
import {useDrawerResize} from '../lib/useDrawerResize'
import DrawerHeader from '../components/DrawerHeader/DrawerHeader'

interface IDrawerProps {
    open: boolean
    onClose: () => void
    children: ReactNode
    initialWidth?: number
    minWidth?: number
    maxWidth?: number
    title?: string
    onWidthChange?: (width: number) => void
    onResizeStateChange?: (isResizing: boolean) => void
}

/**
 * Компонент выезжающего меню (Drawer)
 */
const Drawer: FC<IDrawerProps> = ({
    open,
    onClose,
    children,
    initialWidth = 360,
    minWidth = 350,
    maxWidth = 38,
    title,
    onWidthChange,
    onResizeStateChange,
}) => {
    const {width, handleMouseDown} = useDrawerResize({
        minWidth,
        maxWidth,
        initialWidth,
        onWidthChange,
        onResizeStateChange,
    })

    const [shouldRender, setShouldRender] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isFullyOpened, setIsFullyOpened] = useState(false)
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const animationClass = isVisible ? 'slideIn' : 'slideOut'

    const handleClose = useCallback(() => {
        if (isFullyOpened) {
            onClose()
        }
    }, [isFullyOpened, onClose])

    const handleTransitionEnd = useCallback(() => {
        if (isVisible) {
            setTimeout(() => setIsFullyOpened(true), 150)
        } else {
            setIsFullyOpened(false)
            setTimeout(() => {
                setShouldRender(false)
                hideTimeoutRef.current = null
            }, 50)
        }
    }, [isVisible])

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose()
            }
        }
        window.addEventListener('keydown', handleEsc)

        return () => {
            window.removeEventListener('keydown', handleEsc)
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current)
                hideTimeoutRef.current = null
            }
        }
    }, [handleClose])

    useEffect(() => {
        if (open) {
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current)
                hideTimeoutRef.current = null
            }
            setShouldRender(true)
            setIsFullyOpened(false)
            setTimeout(() => setIsVisible(true), 0)
            onWidthChange?.(width)
        } else {
            setIsVisible(false)
            setIsFullyOpened(false)
        }
    }, [open, width, onWidthChange])

    if (!shouldRender) {
        return <></>
    }

    return ReactDOM.createPortal(
        <div
            className={cn('drawer-content', animationClass)}
            style={{width: `${width}px`}}
            onTransitionEnd={handleTransitionEnd}
        >
            <DrawerHeader title={title} onClose={handleClose} />
            <div className="resize-handle" onMouseDown={handleMouseDown} />
            <div className="drawer-body">{children}</div>
        </div>,
        document.body
    )
}

export default Drawer
