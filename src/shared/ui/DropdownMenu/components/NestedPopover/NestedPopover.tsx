import {ReactNode} from 'react'
import cn from 'classnames'
import './NestedPopover.css'

interface INestedPopoverProps<T> {
    items: T[]
    renderItem: (item: T, index: number) => ReactNode
    isOpen: boolean
}

export const NestedPopover = <T,>({items, renderItem, isOpen}: INestedPopoverProps<T>) => {
    return (
        <div className={cn('nested-popover', isOpen && 'open')}>
            {items.map((item, index) => renderItem(item, index))}
        </div>
    )
}
