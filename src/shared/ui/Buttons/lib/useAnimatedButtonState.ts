import {useState, useCallback} from 'react'

interface IUseAnimatedButtonStateProps {
    onClick: () => void
    disabled?: boolean
    loading?: boolean
    stateless?: boolean
}

interface IUseAnimatedButtonStateReturn {
    isActive: boolean
    handleClick: () => void
    handleKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void
}

/**
 * Хук для управления состоянием анимированной кнопки
 */
export const useAnimatedButtonState = ({
    onClick,
    disabled = false,
    loading = false,
    stateless = false,
}: IUseAnimatedButtonStateProps): IUseAnimatedButtonStateReturn => {
    const [isActive, setIsActive] = useState(false)

    const handleClick = useCallback(() => {
        if (disabled || loading) {
            return
        }

        if (!stateless) {
            setIsActive(!isActive)
        }
        onClick()
    }, [disabled, loading, stateless, isActive, onClick])

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleClick()
            }
        },
        [handleClick]
    )

    return {
        isActive,
        handleClick,
        handleKeyDown,
    }
}
