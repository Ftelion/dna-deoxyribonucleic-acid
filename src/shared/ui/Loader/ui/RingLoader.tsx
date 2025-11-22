import {CSSProperties, FC, useMemo} from 'react'
import './RingLoader.css'

interface IRingLoaderProps {
    size?: number
    color?: string
    speedMultiplier?: number
    className?: string
}

/**
 * Анимированный кольцевой лоадер
 */
export const RingLoader: FC<IRingLoaderProps> = ({
    size = 60,
    color = '#3b82f6',
    speedMultiplier = 1,
    className = '',
}) => {
    const isDefaultSize = size === 60
    const isDefaultColor = color === '#3b82f6'

    const dynamicStyles = useMemo(
        () => ({
            wrapper: isDefaultSize ? {} : ({'--ring-loader-size': `${size}px`} as CSSProperties),
            ring: {
                animationDuration: `${2 / speedMultiplier}s`,
                ...(isDefaultSize ? {} : {'--ring-loader-size': `${size}px`}),
                ...(isDefaultColor ? {} : {'--ring-loader-color': color}),
            } as React.CSSProperties,
        }),
        [size, color, speedMultiplier, isDefaultSize, isDefaultColor]
    )

    const wrapperClasses = useMemo(
        () =>
            [
                'ring-loader-wrapper',
                isDefaultSize ? 'ring-loader-wrapper--default-size' : 'ring-loader-wrapper--custom-size',
                className,
            ]
                .filter(Boolean)
                .join(' '),
        [isDefaultSize, className]
    )

    const getRingClasses = useMemo(
        () => (isLeftRing: boolean) =>
            [
                'ring-loader-ring',
                isDefaultSize ? 'ring-loader-ring--default-size' : 'ring-loader-ring--custom-size',
                isDefaultColor ? 'ring-loader-ring--default-color' : 'ring-loader-ring--custom-color',
                isLeftRing ? 'ring-loader-ring--left' : 'ring-loader-ring--right',
            ]
                .filter(Boolean)
                .join(' '),
        [isDefaultSize, isDefaultColor]
    )

    return (
        <div className={wrapperClasses} style={dynamicStyles.wrapper} role="status" aria-label="Loading">
            <div className={getRingClasses(false)} style={dynamicStyles.ring} />
            <div className={getRingClasses(true)} style={dynamicStyles.ring} />
        </div>
    )
}
