import {FC} from 'react'
import {ChevronIcon} from '@/shared/ui/Icon/ui/ChevronIcon'
import cn from 'classnames'
import './CollapsibleTabHeader.css'

interface ICollapsibleTabHeaderProps {
    title: string
    isOpen: boolean
    isHovered: boolean
    iconColor: string
    onToggle: () => void
    onMouseEnter: () => void
    onMouseLeave: () => void
}

/**
 * Компонент заголовка сворачиваемой вкладки
 */
export const CollapsibleTabHeader: FC<ICollapsibleTabHeaderProps> = ({
    title,
    isOpen,
    isHovered,
    iconColor,
    onToggle,
    onMouseEnter,
    onMouseLeave,
}) => (
    <button
        onClick={onToggle}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cn('header', {
            'bg-gradient-to-r from-blue-500/5 to-transparent': isHovered && !isOpen,
            'bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-transparent': isOpen,
        })}
    >
        <span
            className={cn('title', {
                '!bg-gradient-to-br !from-blue-600 !via-blue-500 !to-blue-400 !bg-clip-text !text-transparent': isOpen,
                '!bg-gradient-to-br !from-gray-500 !to-gray-400 !bg-clip-text !text-transparent': !isOpen && !isHovered,
                '!bg-gradient-to-br !from-blue-500 !to-blue-400 !bg-clip-text !text-transparent transition-colors duration-300':
                    isHovered && !isOpen,
            })}
        >
            {title}
        </span>

        <div
            className={cn('transition-transform duration-200 ease-out', {
                'scale-110': isHovered,
            })}
        >
            <ChevronIcon isOpen={isOpen} iconColor={iconColor} />
        </div>
    </button>
)
