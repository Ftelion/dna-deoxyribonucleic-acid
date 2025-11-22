import {FC, memo} from 'react'
import {useTranslation} from 'react-i18next'
import {useDNAAnimationStore} from '../model/stores/useDNAAnimationStore'
import {useDNAViewStore} from '../model/stores/useDNAViewStore'
import ResetButton from '@/shared/ui/Buttons/ui/ResetButton'
import {RotationTab} from './components/visualization-tabs/RotationTab/RotationTab'
import {BreathingTab} from './components/visualization-tabs/BreathingTab/BreathingTab'
import {CameraTab} from './components/visualization-tabs/CameraTab/CameraTab'
import {PairsTab} from './components/visualization-tabs/PairsTab/PairsTab'
import './DNAControls.css'

const DNAControls: FC = memo(() => {
    const {t} = useTranslation()

    const {
        preview,
        togglePreview,
        breathingActive,
        toggleBreathing,
        rotationSpeed,
        setRotationSpeed,
        breathingIntensity,
        setBreathingIntensity,
        resetRotationSpeed,
        resetBreathingIntensity,
        resetAnimations,
    } = useDNAAnimationStore((s) => ({
        preview: s.preview,
        togglePreview: s.togglePreview,
        breathingActive: s.breathingActive,
        toggleBreathing: s.toggleBreathing,
        rotationSpeed: s.rotationSpeed,
        setRotationSpeed: s.setRotationSpeed,
        breathingIntensity: s.breathingIntensity,
        setBreathingIntensity: s.setBreathingIntensity,
        resetRotationSpeed: s.resetRotationSpeed,
        resetBreathingIntensity: s.resetBreathingIntensity,
        resetAnimations: s.resetAnimations,
    }))

    const {resetCamera, resetAll} = useDNAViewStore((s) => ({
        resetCamera: s.resetCamera,
        resetAll: s.resetAll,
    }))

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="dna-controls-panel">
                <div className="flex flex-col gap-1">
                    <PairsTab />
                    <RotationTab
                        preview={preview}
                        togglePreview={togglePreview}
                        rotationSpeed={rotationSpeed}
                        setRotationSpeed={setRotationSpeed}
                        resetRotationSpeed={resetRotationSpeed}
                    />
                    <BreathingTab
                        breathingActive={breathingActive}
                        toggleBreathing={toggleBreathing}
                        breathingIntensity={breathingIntensity}
                        setBreathingIntensity={setBreathingIntensity}
                        resetBreathingIntensity={resetBreathingIntensity}
                    />
                    <CameraTab resetCamera={resetCamera} />

                    <div className="flex flex-row flex-wrap gap-2 pt-3 border-t dna-controls-divider">
                        <ResetButton onClick={resetAll} className="flex-1 min-w-[120px]">
                            {t('RESET_ALL')}
                        </ResetButton>
                        <ResetButton onClick={resetAnimations} className="flex-1 min-w-[120px]">
                            {t('RESET_ANIMATIONS')}
                        </ResetButton>
                    </div>
                </div>
            </div>
        </div>
    )
})

DNAControls.displayName = 'DNAControls'

export default DNAControls
