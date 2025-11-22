import {FC, memo} from 'react'
import cn from 'classnames'
import {useNumberSlider} from '../lib/hooks/useNumberSlider'
import {NumberInput} from '../components/NumberInput'
import {RangeSlider} from '../components/RangeSlider'
import '../styles/NumberSlider.css'

interface INumberSliderProps {
    title: string
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    step?: number
    defaultValue?: number
    className?: string
}

/**
 * Компонент слайдера с числовым вводом
 */
const NumberSliderComponent: FC<INumberSliderProps> = ({
    title,
    value,
    onChange,
    min = 0,
    max = 1,
    step = 0.1,
    defaultValue = 0,
    className = '',
}) => {
    const {
        inputValue,
        fillPercentage,
        handleSliderChange,
        handleInputChange,
        handleInputBlur,
        sliderProps,
        numberInputProps,
    } = useNumberSlider({
        value,
        onChange,
        min,
        max,
        step,
        defaultValue,
    })

    return (
        <div className={cn('flex flex-col', className)}>
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-500">{title}</label>
                <NumberInput
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    {...numberInputProps}
                />
            </div>

            <div className="relative">
                <RangeSlider {...sliderProps} fillPercentage={fillPercentage} onChange={handleSliderChange} />
            </div>
        </div>
    )
}

const NumberSlider = memo(NumberSliderComponent)
NumberSlider.displayName = 'NumberSlider'

export default NumberSlider
