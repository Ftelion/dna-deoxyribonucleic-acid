import {FC} from 'react'
import {SectionTitle} from '@/shared/ui/Typography/ui/SectionTitle'
import InstructionItem from '../InstructionItem/InstructionItem'
import cn from 'classnames'

interface IControlsInstructionsProps {
    className?: string
}

// Массив ключей инструкций
const instructionKeys = ['LEFT_CLICK_PAN', 'RIGHT_CLICK_ROTATE', 'WHEEL_ZOOM', 'CLICK_TO_NODES']

const ControlsInstructions: FC<IControlsInstructionsProps> = ({className = ''}) => {
    return (
        <div className={cn('mb-6 pl-1 pr-2', className)}>
            <SectionTitle titleKey="CONTROLS_INSTRUCTIONS" color="light-gray" />
            <div className="space-y-1 pl-2 pr-1">
                {instructionKeys.map((key) => (
                    <InstructionItem key={key} translationKey={key} />
                ))}
            </div>
        </div>
    )
}

export default ControlsInstructions
