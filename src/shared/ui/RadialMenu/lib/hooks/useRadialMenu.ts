import {useState, useEffect, useRef, useCallback, RefObject} from 'react'
import {RADIAL_MENU_CONSTANTS} from '../constants/radialMenuConstants'

interface IUseRadialMenuProps {
    opened: boolean
    onBlur?: () => void
}

interface IUseRadialMenuReturn {
    menuRef: RefObject<HTMLDivElement>
    isClosing: boolean
    handleClose: () => void
}

/**
 * Хук для управления состоянием и поведением радиального меню
 */
export const useRadialMenu = ({opened, onBlur}: IUseRadialMenuProps): IUseRadialMenuReturn => {
    const menuRef = useRef<HTMLDivElement>(null)
    const [isClosing, setIsClosing] = useState(false)

    const handleClose = useCallback(() => {
        setIsClosing(true)
        setTimeout(() => {
            setIsClosing(false)
            onBlur?.()
        }, RADIAL_MENU_CONSTANTS.CLOSING_ANIMATION_DURATION)
    }, [onBlur])

    const handleKeyUp = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                event.stopPropagation()
                handleClose()
            }
        },
        [handleClose]
    )

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                handleClose()
            }
        },
        [handleClose]
    )

    useEffect(() => {
        if (!opened) {
            return
        }

        document.addEventListener('keydown', handleKeyUp)
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('keydown', handleKeyUp)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [opened, handleKeyUp, handleClickOutside])

    return {
        menuRef,
        isClosing,
        handleClose,
    }
}
