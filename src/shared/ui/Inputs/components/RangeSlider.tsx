import {ChangeEvent, CSSProperties, FC, memo} from 'react'

interface IRangeSliderProps {
    min: number
    max: number
    step: number
    value: number
    fillPercentage: number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Компонент слайдера с заливкой
 */
const RangeSliderComponent: FC<IRangeSliderProps> = ({min, max, step, value, fillPercentage, onChange}) => {
    return (
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className="slider-range"
            style={
                {
                    '--fill-percentage': `${fillPercentage}%`,
                } as CSSProperties
            }
        />
    )
}

export const RangeSlider = memo(RangeSliderComponent)
RangeSlider.displayName = 'RangeSlider'
