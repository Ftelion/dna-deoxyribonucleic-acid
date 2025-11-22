import {FC} from 'react'
import AnimatedButton from '@/shared/ui/Buttons/ui/AnimatedButton'
import cn from 'classnames'

interface IControlButton {
    onClick: () => void
    children: React.ReactNode
    variant?: 'primary' | 'secondary'
    disabled?: boolean
}

interface IControlButtonsProps {
    primaryButton: IControlButton
    secondaryButton: IControlButton
    className?: string
}

/**
 * Компонент-оберктка для двух AnimatedButton
 */
export const ControlButtons: FC<IControlButtonsProps> = ({primaryButton, secondaryButton, className = ''}) => {
    return (
        <div className={cn('grid grid-cols-2 gap-2', className)}>
            <AnimatedButton
                onClick={primaryButton.onClick}
                variant={primaryButton.variant || 'primary'}
                size="sm"
                fullWidth
                disabled={primaryButton.disabled}
            >
                {primaryButton.children}
            </AnimatedButton>

            <AnimatedButton
                onClick={secondaryButton.onClick}
                variant={secondaryButton.variant || 'secondary'}
                size="sm"
                fullWidth
                stateless={true}
                disabled={secondaryButton.disabled}
            >
                {secondaryButton.children}
            </AnimatedButton>
        </div>
    )
}
