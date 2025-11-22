import {FC, memo} from 'react'
import {useTranslation} from 'react-i18next'
import NumberSlider from '@/shared/ui/Inputs/ui/NumberSlider'
import {SectionTitle} from '@/shared/ui/Typography/ui/SectionTitle'
import {ICoordinateSectionProps, IAxisConfig, Axis} from '../types'
import {CAMERA_BOUNDS, AXIS_DEFAULTS} from '../lib/constants'

/**
 * Компонент для секции координат камеры (позиция или target)
 */
const CoordinateSection: FC<ICoordinateSectionProps> = ({titleKey, type, values, onChange}) => {
    const {t} = useTranslation()

    const axes: IAxisConfig[] = [
        {axis: 'x' as Axis, value: values[0], defaultValue: AXIS_DEFAULTS[type].x},
        {axis: 'y' as Axis, value: values[1], defaultValue: AXIS_DEFAULTS[type].y},
        {axis: 'z' as Axis, value: values[2], defaultValue: AXIS_DEFAULTS[type].z},
    ]

    return (
        <div className="mb-6">
            <SectionTitle titleKey={titleKey} size="sm" color="light-gray" />
            <div className="flex flex-col gap-2">
                {axes.map(({axis, value, defaultValue}) => (
                    <NumberSlider
                        key={axis}
                        title={`${t(`AXIS_${axis.toUpperCase()}`)}: `}
                        value={value}
                        onChange={(value) => onChange(type, axis, value.toString())}
                        min={CAMERA_BOUNDS[type][axis].min}
                        max={CAMERA_BOUNDS[type][axis].max}
                        step={0.1}
                        defaultValue={defaultValue}
                    />
                ))}
            </div>
        </div>
    )
}

CoordinateSection.displayName = 'CoordinateSection'

export const MemoizedCoordinateSection = memo(CoordinateSection)
