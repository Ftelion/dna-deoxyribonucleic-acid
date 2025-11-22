import {useState, useRef, useEffect} from 'react'
import {scrollToTabCenter} from '../utils/tabUtils'

interface IUseTabIndicatorProps {
    activeTab: string
    tabs: Array<{props: {id: string}}>
    onInitialized?: () => void
}

export const useTabIndicator = ({activeTab, tabs, onInitialized}: IUseTabIndicatorProps) => {
    const [indicatorStyle, setIndicatorStyle] = useState({left: 0, width: 0})
    const [isInitialized, setIsInitialized] = useState(false)
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
    const tabsHeaderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const activeTabElement = tabRefs.current[activeTab]
        const tabsHeader = tabsHeaderRef.current

        if (activeTabElement) {
            const {offsetLeft, offsetWidth} = activeTabElement
            setIndicatorStyle({
                left: offsetLeft,
                width: offsetWidth,
            })

            // Автопрокрутка к активному табу
            if (tabsHeader) {
                scrollToTabCenter(tabsHeader, activeTabElement)
            }

            // Помечаем как инициализированный после первого рендера
            if (!isInitialized) {
                // Небольшая задержка чтобы индикатор плавно появился
                setTimeout(() => {
                    setIsInitialized(true)
                    onInitialized?.()
                }, 50)
            }
        }
    }, [activeTab, tabs, isInitialized, onInitialized])

    return {
        indicatorStyle,
        isInitialized,
        tabRefs,
        tabsHeaderRef,
    }
}
