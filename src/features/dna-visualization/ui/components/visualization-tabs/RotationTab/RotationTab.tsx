import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import NumberSlider from '@/shared/ui/Inputs/ui/NumberSlider'
import {TabWrapper} from '../TabWrapper'
import {ControlButtons} from '@/shared/ui/Buttons/ui/ControlButtons'

interface IRotationTabProps {
    preview: boolean
    togglePreview: () => void
    rotationSpeed: number
    setRotationSpeed: (speed: number) => void
    resetRotationSpeed: () => void
}

export const RotationTab: FC<IRotationTabProps> = ({
    preview,
    togglePreview,
    rotationSpeed,
    setRotationSpeed,
    resetRotationSpeed,
}) => {
    const {t} = useTranslation()

    return (
        <TabWrapper titleKey="ROTATION_SECTION" tabKey="rotation" onReset={resetRotationSpeed}>
            <div className="flex flex-col gap-4 justify-between">
                <NumberSlider
                    title={t('ROTATION_SPEED')}
                    value={rotationSpeed}
                    onChange={setRotationSpeed}
                    min={0}
                    max={1}
                    step={0.01}
                    defaultValue={0.2}
                />

                <ControlButtons
                    primaryButton={{
                        onClick: togglePreview,
                        children: preview ? t('STOP_ROTATION') : t('START_ROTATION'),
                    }}
                    secondaryButton={{
                        onClick: () => setRotationSpeed(0),
                        children: t('NULLIFY'),
                    }}
                />
            </div>
        </TabWrapper>
    )
}
