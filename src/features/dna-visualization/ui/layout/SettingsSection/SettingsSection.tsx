import {FC, ReactNode, memo} from 'react'
import ResetButton from '@/shared/ui/Buttons/ui/ResetButton'

interface ISettingsSectionProps {
    children: ReactNode
    onReset: () => void
}

const SettingsSection: FC<ISettingsSectionProps> = memo(({children, onReset}) => {
    return (
        <div className="flex flex-col gap-4">
            {children}
            <div className="pt-3 mt-1 border-t border-black/5">
                <ResetButton onClick={onReset} />
            </div>
        </div>
    )
})

SettingsSection.displayName = 'SettingsSection'

export default SettingsSection
