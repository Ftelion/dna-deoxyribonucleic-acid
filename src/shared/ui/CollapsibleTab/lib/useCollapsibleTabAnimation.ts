import {useState, useEffect, useRef, ReactNode, RefObject} from 'react'

interface IUseCollapsibleTabAnimationProps {
    isOpen: boolean
    children: ReactNode
}

interface IUseCollapsibleTabAnimationReturn {
    isRendered: boolean
    height: number | undefined
    contentRef: RefObject<HTMLDivElement>
    innerContentRef: RefObject<HTMLDivElement>
}

const ANIMATION_DELAY = 10

/**
 * Хук для управления анимацией сворачиваемой вкладки
 */
export const useCollapsibleTabAnimation = ({
    isOpen,
    children,
}: IUseCollapsibleTabAnimationProps): IUseCollapsibleTabAnimationReturn => {
    const [isRendered, setIsRendered] = useState(isOpen)
    const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0)
    const contentRef = useRef<HTMLDivElement>(null)
    const innerContentRef = useRef<HTMLDivElement>(null)

    // Управление анимацией открытия/закрытия
    useEffect(() => {
        if (isOpen) {
            // Сначала рендерим контент
            setIsRendered(true)

            // Даем браузеру время отрендерить контент, затем начинаем анимацию
            setTimeout(() => {
                if (contentRef.current) {
                    setHeight(contentRef.current.scrollHeight)
                }
            }, ANIMATION_DELAY)
        } else {
            // Начинаем анимацию закрытия
            if (contentRef.current) {
                setHeight(contentRef.current.offsetHeight)

                // Даем браузеру время применить текущую высоту, затем анимируем до 0
                setTimeout(() => {
                    setHeight(0)
                }, ANIMATION_DELAY)
            }
        }
    }, [isOpen])

    // Отслеживаем изменения размера внутреннего контента
    useEffect(() => {
        if (!innerContentRef.current || !isOpen) {
            return
        }

        const updateHeight = () => {
            if (innerContentRef.current && isOpen) {
                const newHeight = innerContentRef.current.scrollHeight
                setHeight(newHeight)
            }
        }

        // Создаем ResizeObserver для отслеживания изменений размера
        const resizeObserver = new ResizeObserver(updateHeight)
        resizeObserver.observe(innerContentRef.current)

        return () => {
            resizeObserver.disconnect()
        }
    }, [isOpen, children])

    return {
        isRendered,
        height,
        contentRef,
        innerContentRef,
    }
}
