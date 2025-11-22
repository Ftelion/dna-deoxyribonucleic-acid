import {FC} from 'react'
import cn from 'classnames'
import '../styles/Switch.css'

interface ISwitchProps {
    checked: boolean
    onChange: (checked: boolean) => void
    label?: string
    className?: string
}

/**
 * Компонент переключателя (switch)
 */
const Switch: FC<ISwitchProps> = ({checked, onChange, label, className = ''}) => {
    const handleToggle = () => onChange(!checked)

    return (
        <div className={cn('flex items-center gap-3', className)}>
            {label && (
                <label
                    className={cn(
                        'text-sm font-medium cursor-pointer select-none',
                        'transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)',
                        {
                            'text-blue-500 font-semibold': checked,
                            'text-gray-500 font-medium': !checked,
                        }
                    )}
                >
                    {label}
                </label>
            )}
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={handleToggle}
                className={cn('switch-button', {
                    'switch-button--checked': checked,
                    'switch-button--unchecked': !checked,
                })}
            >
                <span
                    className={cn(
                        'inline-block w-3 h-3 rounded-full bg-white transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) shadow-sm',
                        {
                            'translate-x-[1.375rem]': checked,
                            'translate-x-[0.125rem]': !checked,
                        }
                    )}
                />
            </button>
        </div>
    )
}

export default Switch
