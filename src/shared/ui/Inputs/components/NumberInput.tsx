import React, {FC, memo} from 'react'

interface INumberInputProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: () => void
    min?: number
    max?: number
    step?: number
}

/**
 * Компонент числового инпута для слайдера
 */
const NumberInputComponent: FC<INumberInputProps> = ({value, onChange, onBlur, min, max, step}) => {
    return (
        <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className="slider-input"
        />
    )
}

export const NumberInput = memo(NumberInputComponent)
NumberInput.displayName = 'NumberInput'
