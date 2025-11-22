import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import NumberSlider from '@/shared/ui/Inputs/ui/NumberSlider'
import {TabWrapper} from '../TabWrapper'
import {ControlButtons} from '@/shared/ui/Buttons/ui/ControlButtons'

interface IBreathingTabProps {
    breathingActive: boolean
    toggleBreathing: () => void
    breathingIntensity: number
    setBreathingIntensity: (intensity: number) => void
    resetBreathingIntensity: () => void
}

export const BreathingTab: FC<IBreathingTabProps> = ({
    breathingActive,
    toggleBreathing,
    breathingIntensity,
    setBreathingIntensity,
    resetBreathingIntensity,
}) => {
    const {t} = useTranslation()

    return (
        <TabWrapper titleKey="BREATHING_SECTION" tabKey="breathing" onReset={resetBreathingIntensity}>
            <div className="flex flex-col gap-4 justify-between">
                <NumberSlider
                    title={t('NUCLEOTIDE_BREATHING')}
                    value={breathingIntensity}
                    onChange={setBreathingIntensity}
                    min={0}
                    max={0.1}
                    step={0.01}
                    defaultValue={0.05}
                />

                <ControlButtons
                    primaryButton={{
                        onClick: toggleBreathing,
                        children: breathingActive ? t('STOP_BREATHING') : t('START_BREATHING'),
                    }}
                    secondaryButton={{
                        onClick: () => setBreathingIntensity(0),
                        children: t('NULLIFY'),
                    }}
                />
            </div>
        </TabWrapper>
    )
}
