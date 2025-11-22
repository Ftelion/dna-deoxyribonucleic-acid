import {FC, ReactNode} from 'react'
import {useTranslation} from 'react-i18next'
import CollapsibleTab from '@/shared/ui/CollapsibleTab/ui/CollapsibleTab'
import SettingsSection from '../../layout/SettingsSection/SettingsSection'
import {useDNAViewStore} from '../../../model/stores/useDNAViewStore'

type TabKey = 'pairs' | 'rotation' | 'breathing' | 'camera'

interface ITabWrapperProps {
    titleKey: string
    tabKey: TabKey
    onReset?: () => void
    children: ReactNode
}

export const TabWrapper: FC<ITabWrapperProps> = ({titleKey, tabKey, onReset, children}) => {
    const {t} = useTranslation()
    const {collapsibleTabsState, setCollapsibleTabState} = useDNAViewStore((s) => ({
        collapsibleTabsState: s.collapsibleTabsState,
        setCollapsibleTabState: s.setCollapsibleTabState,
    }))

    const isOpen = collapsibleTabsState[tabKey]
    const handleToggle = () => setCollapsibleTabState(tabKey, !isOpen)

    return (
        <CollapsibleTab title={t(titleKey)} isOpen={isOpen} onToggle={handleToggle}>
            {onReset ? <SettingsSection onReset={onReset}>{children}</SettingsSection> : children}
        </CollapsibleTab>
    )
}
