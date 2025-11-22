import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {LeftMouseButtonIcon} from '@/shared/ui/Icon/ui/instructionTabIcons/LeftMouseButtonIcon'
import {RightMouseButtonIcon} from '@/shared/ui/Icon/ui/instructionTabIcons/RightMouseButtonIcon'
import {MouseWheelIcon} from '@/shared/ui/Icon/ui/instructionTabIcons/MouseWheelIcon'
import {ClickIcon} from '@/shared/ui/Icon/ui/instructionTabIcons/ClickIcon'
import './InstructionItem.css'

interface IInstructionItemProps {
    translationKey: string
}

const InstructionItem: FC<IInstructionItemProps> = ({translationKey}) => {
    const {t} = useTranslation()

    const getIcon = () => {
        switch (translationKey) {
            case 'LEFT_CLICK_PAN':
                return <LeftMouseButtonIcon className="left-mouse-icon" />
            case 'RIGHT_CLICK_ROTATE':
                return <RightMouseButtonIcon className="right-mouse-icon" />
            case 'WHEEL_ZOOM':
                return <MouseWheelIcon className="mouse-wheel-icon" />
            case 'CLICK_TO_NODES':
                return <ClickIcon className="click-icon ml-0.5" />
            default:
                return <></>
        }
    }

    return (
        <div className="instruction-item group">
            <p className="font-normal text-sm flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center text-base transition-all duration-300 ease-out group-hover:scale-110">
                    {getIcon()}
                </span>
                <span className="transition-all duration-300 ease-out">{t(translationKey)}</span>
            </p>
        </div>
    )
}

export default InstructionItem
