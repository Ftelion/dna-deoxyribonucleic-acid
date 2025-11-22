import {useState, useEffect, useCallback} from 'react'
import {clampValue, toDisplayValue, fromDisplayValue, isIntermediateNumberInput} from '@/shared/lib/form/numberUtils'

interface IUseNumberSliderProps {
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    step?: number
    defaultValue?: number
}

/**
 * Кастомный хук для управления логикой числового слайдера
 */
export const useNumberSlider = ({
    value,
    onChange,
    min = 0,
    max = 1,
    step = 0.1,
    defaultValue = 0,
}: IUseNumberSliderProps) => {
    const [localValue, setLocalValue] = useState(value ?? defaultValue)
    const [inputValue, setInputValue] = useState(String(Math.round((value ?? defaultValue) * 100)))

    /**
     * Обновляем значение и синхронизируем состояния
     */
    const updateValue = useCallback(
        (newValue: number) => {
            const clamped = clampValue(newValue, min, max)
            setLocalValue(clamped)
            setInputValue(toDisplayValue(clamped))
            onChange(clamped)
        },
        [min, max, onChange]
    )

    /**
     * Слушатель изменения слайдера
     */
    const handleSliderChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => updateValue(parseFloat(e.target.value)),
        [updateValue]
    )

    /**
     * Слушатель изменения инпута
     */
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputStr = e.target.value
            setInputValue(inputStr)

            if (isIntermediateNumberInput(inputStr)) {
                return
            }

            const realValue = fromDisplayValue(inputStr)
            if (!isNaN(realValue)) {
                updateValue(realValue)
            }
        },
        [updateValue]
    )

    /**
     * Обработчик потери фокуса инпута
     */
    const handleInputBlur = useCallback(() => {
        const realValue = fromDisplayValue(inputValue)

        if (isNaN(realValue) || isIntermediateNumberInput(inputValue)) {
            setInputValue(toDisplayValue(localValue))
        } else {
            updateValue(realValue)
        }
    }, [inputValue, localValue, updateValue])

    /**
     * Синхронизируем с внешним значением
     */
    useEffect(() => {
        if (value !== localValue) {
            const newValue = value ?? defaultValue
            setLocalValue(newValue)
            setInputValue(toDisplayValue(newValue))
        }
    }, [value, localValue, defaultValue])

    return {
        localValue,
        inputValue,
        fillPercentage: ((localValue - min) / (max - min)) * 100,
        handleSliderChange,
        handleInputChange,
        handleInputBlur,
        sliderProps: {min, max, step, value: localValue},
        numberInputProps: {
            min: min * 100,
            max: max * 100,
            step: step * 100,
        },
    }
}
