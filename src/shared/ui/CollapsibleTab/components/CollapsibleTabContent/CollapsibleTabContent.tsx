import {FC, ReactNode} from 'react'
import cn from 'classnames'
import './CollapsibleTabContent.css'

interface ICollapsibleTabContentProps {
    children: ReactNode
    isOpen: boolean
    isRendered: boolean
    height: number | undefined
    contentRef: React.RefObject<HTMLDivElement>
    innerContentRef: React.RefObject<HTMLDivElement>
}

/**
 * Компонент контента сворачиваемой вкладки
 */
export const CollapsibleTabContent: FC<ICollapsibleTabContentProps> = ({
    children,
    isOpen,
    isRendered,
    height,
    contentRef,
    innerContentRef,
}) =>
    isRendered && (
        <div
            ref={contentRef}
            className="content"
            style={{
                maxHeight: height !== undefined ? `${height}px` : 'none',
            }}
        >
            <div
                ref={innerContentRef}
                className={cn('content-inner', {
                    open: isOpen,
                })}
            >
                {children}
            </div>
        </div>
    )
