import LanguageSwitcher from '@/shared/ui/InstructionTab/components/LanguageSwitcher/LanguageSwitcher'
import {FC} from 'react'
import PairInfo from '@/features/dna-visualization/ui/components/pair-filter/components/PairInfo/PairInfo'
import ControlsInstructions from '../components/ControlsInstructions/ControlsInstructions'

const InstructionsTab: FC = () => {
    return (
        <>
            <PairInfo />
            <ControlsInstructions />
            <LanguageSwitcher />
        </>
    )
}

export default InstructionsTab
