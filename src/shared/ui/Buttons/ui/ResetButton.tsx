import {FC, memo, ButtonHTMLAttributes, ReactNode} from 'react'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'
import './ResetButton.css'

type ButtonSize = 'sm' | 'md' | 'lg'

interface IResetButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    onClick: () => void
    children?: ReactNode
    disabled?: boolean
    loading?: boolean
    className?: string
    ariaLabel?: string
    variant?: 'default' | 'danger'
    size?: ButtonSize
}

const ResetButton: FC<IResetButtonProps> = memo(
    ({
        onClick,
        children,
        disabled = false,
        loading = false,
        className = '',
        ariaLabel,
        variant = 'default',
        size = 'md',
        ...rest
    }) => {
        const {t} = useTranslation()

        const handleClick = () => {
            if (disabled || loading) {
                return
            }
            onClick()
        }

        const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleClick()
            }
        }

        return (
            <button
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                className={cn(
                    'back-to-default-values-button',
                    'reset-btn',
                    {
                        disabled: disabled || loading,
                        loading: loading,
                    },
                    `reset-btn-${variant}`,
                    `reset-btn-${size}`,
                    className
                )}
                style={{width: '100%'}}
                disabled={disabled || loading}
                aria-label={ariaLabel || t('RESET_TO_DEFAULTS')}
                aria-busy={loading}
                aria-disabled={disabled}
                {...rest}
            >
                {loading && (
                    <span className="inline-flex animate-spin" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                            <path
                                d="M12 2a10 10 0 0 1 10 10"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                )}
                <span
                    className={cn('reset-btn-content', {
                        'with-spinner': loading,
                        'transition-colors duration-300': true,
                    })}
                >
                    {children || t('RESET_TO_DEFAULTS')}
                </span>
            </button>
        )
    }
)

ResetButton.displayName = 'ResetButton'

export default ResetButton
