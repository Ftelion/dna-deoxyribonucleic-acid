import {FC, useState, ReactNode, CSSProperties} from 'react'
import '../ui/RadialMenu.css'
import cn from 'classnames'

interface IRadialButtonProps {
    icon: ReactNode
    onSelect?: () => void
    selected?: boolean
    label?: string
    style?: CSSProperties
}

export const RadialButton: FC<IRadialButtonProps> = ({icon, onSelect, selected = false, label, style}) => {
    const [hover, setHover] = useState(selected)

    return (
        <div
            className={cn('radial-button', hover && 'selected')}
            style={style}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onSelect}
        >
            <div className="radial-button-icon">{icon}</div>
            {label && <div className="radial-button-label">{label}</div>}
        </div>
    )
}
