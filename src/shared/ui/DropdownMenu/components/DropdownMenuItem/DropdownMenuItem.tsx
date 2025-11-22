import {forwardRef, ReactNode, Ref} from 'react'
import cn from 'classnames'
import './DropdownMenuItem.css'

interface IDropdownMenuItemProps {
    icon: ReactNode
    label: string
    onClick: () => void
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    ref?: Ref<HTMLButtonElement>
    active?: boolean
    isRotatable?: boolean
    isSettingsRotatable?: boolean
    title?: string
}

export const DropdownMenuItem = forwardRef<HTMLButtonElement, IDropdownMenuItemProps>(
    ({icon, label, onClick, onMouseEnter, onMouseLeave, active, isRotatable, isSettingsRotatable, title}, ref) => {
        return (
            <button
                ref={ref}
                className={cn('dropdown-item group', active && 'active')}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                title={title}
            >
                <span
                    className={cn(
                        'w-5 h-5 flex items-center justify-center text-base transition-all duration-500 ease-out group-hover:scale-110',
                        isRotatable && 'reset-icon',
                        isSettingsRotatable && 'settings-icon'
                    )}
                >
                    {icon}
                </span>
                <span className="flex-1 transition-transform duration-300 ease-out">{label}</span>
            </button>
        )
    }
)

DropdownMenuItem.displayName = 'DropdownMenuItem'
