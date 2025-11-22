import React, {Children, cloneElement, FC, ReactNode} from 'react'
import './RadialMenu.css'
import {calculateButtonPosition, clampMenuPosition} from '../lib/utils/radialMenuUtils'
import {useRadialMenu} from '../lib/hooks/useRadialMenu'
import cn from 'classnames'

interface IRadialMenuProps {
    opened: boolean
    radius: number
    left?: number
    top?: number
    selected?: number
    onBlur?: () => void
    children: ReactNode
}

export const RadialMenu: FC<IRadialMenuProps> = ({opened, radius, left, top, selected = -1, onBlur, children}) => {
    const {menuRef, isClosing} = useRadialMenu({opened, onBlur})

    const count = Children.count(children)
    const {x, y} = clampMenuPosition(left, top, radius)

    if (!opened && !isClosing) {
        return null
    }

    return (
        <div
            ref={menuRef}
            className={cn('radial-menu', isClosing && 'closing')}
            style={{
                left: x,
                top: y,
                width: radius * 2,
                height: radius * 2,
            }}
        >
            {Children.map(children, (child, index) => {
                if (!React.isValidElement(child)) {
                    return child
                }

                const {x: buttonX, y: buttonY} = calculateButtonPosition(index, count, radius)

                return cloneElement(child, {
                    key: index,
                    selected: index === selected,
                    style: {
                        position: 'absolute',
                        left: buttonX,
                        top: buttonY,
                        animationDelay: `${index * 0.1 + 0.1}s`,
                    },
                })
            })}
        </div>
    )
}
