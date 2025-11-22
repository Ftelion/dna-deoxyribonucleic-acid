import {FC, memo, ButtonHTMLAttributes, ReactNode} from 'react'
import cn from 'classnames'
import './AnimatedButton.css'
import {useAnimatedButtonState} from '../lib/useAnimatedButtonState'

type ButtonVariant = 'primary' | 'secondary' | 'success'
type ButtonSize = 'sm' | 'md' | 'lg'

interface IAnimatedButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    onClick: () => void
    variant?: ButtonVariant
    size?: ButtonSize
    children: ReactNode
    className?: string
    disabled?: boolean
    loading?: boolean
    ariaLabel?: string
    fullWidth?: boolean
    stateless?: boolean
}

const AnimatedButton: FC<IAnimatedButtonProps> = memo(
    ({
        onClick,
        children,
        className = '',
        variant = 'primary',
        size = 'md',
        disabled = false,
        loading = false,
        ariaLabel,
        fullWidth = false,
        stateless = false,
        ...rest
    }) => {
        const {isActive, handleClick, handleKeyDown} = useAnimatedButtonState({
            onClick,
            disabled,
            loading,
            stateless,
        })

        return (
            <button
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                className={cn(
                    'animated-btn',
                    {
                        clicked: isActive,
                        disabled: disabled || loading,
                        loading: loading,
                        'w-full': fullWidth,
                    },
                    `btn-${variant}`,
                    `btn-${size}`,
                    className
                )}
                disabled={disabled || loading}
                aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
                aria-busy={loading}
                aria-disabled={disabled}
                {...rest}
            >
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 180 60"
                    className="border"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="stroke-1 stroke-[var(--btn-color)]" />
                    <polyline
                        points="179,1 179,59 1,59 1,1 179,1"
                        className="stroke-1 stroke-[var(--btn-hover-color)]"
                    />
                </svg>
                <span className="btn-content">
                    {loading && (
                        <span className="inline-flex animate-spin" aria-hidden="true">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeOpacity="0.25"
                                />
                                <path
                                    d="M12 2a10 10 0 0 1 10 10"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    )}
                    <span className={cn({'btn-text': loading, 'transition-colors duration-500': true})}>
                        {children}
                    </span>
                </span>
            </button>
        )
    }
)

AnimatedButton.displayName = 'AnimatedButton'

export default AnimatedButton
