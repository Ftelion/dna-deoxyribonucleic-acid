import {FC, ReactNode, useState} from 'react'
import cn from 'classnames'
import './CollapsibleTab.css'
import {CollapsibleTabHeader} from '../components/CollapsibleTabHeader/CollapsibleTabHeader'
import {CollapsibleTabContent} from '../components/CollapsibleTabContent/CollapsibleTabContent'
import {useCollapsibleTabAnimation} from '../lib/useCollapsibleTabAnimation'

interface ICollapsibleTabProps {
    title: string
    children: ReactNode
    defaultOpen?: boolean
    isOpen?: boolean
    onToggle?: () => void
    className?: string
    iconColor?: string
}

/**
 * Компонент сворачиваемой вкладки
 */
const CollapsibleTab: FC<ICollapsibleTabProps> = ({
    title,
    children,
    defaultOpen = false,
    isOpen: externalIsOpen,
    onToggle,
    className = '',
    iconColor = '#2E85FF',
}) => {
    const [isHovered, setIsHovered] = useState(false)
    // Управление состоянием открытия/закрытия
    const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen)
    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen

    // Управление анимацией
    const {isRendered, height, contentRef, innerContentRef} = useCollapsibleTabAnimation({
        isOpen,
        children,
    })

    const handleToggle = () => {
        if (externalIsOpen !== undefined) {
            // Если используется внешнее состояние, вызываем callback
            onToggle?.()
        } else {
            // Иначе используем внутреннее состояние
            setInternalIsOpen(!isOpen)
        }
    }

    return (
        <div
            className={cn(
                'collapsible-tab',
                {
                    open: isOpen,
                    closed: !isOpen,
                },
                className
            )}
        >
            <CollapsibleTabHeader
                title={title}
                isOpen={isOpen}
                isHovered={isHovered}
                iconColor={iconColor}
                onToggle={handleToggle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />

            <CollapsibleTabContent
                isOpen={isOpen}
                isRendered={isRendered}
                height={height}
                contentRef={contentRef}
                innerContentRef={innerContentRef}
            >
                {children}
            </CollapsibleTabContent>
        </div>
    )
}

export default CollapsibleTab
