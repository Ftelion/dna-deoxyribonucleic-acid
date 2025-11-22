import {FC, memo, ReactNode, useMemo} from 'react'
import cn from 'classnames'
import './Tabs.css'
import {TabHeaders} from '../components/TabHeaders'
import {getValidTabs} from '../lib/utils/tabUtils'
import {useTabIndicator} from '../lib/hooks/useTabIndicator'

export interface ITabsProps {
    children: ReactNode
    activeTab: string
    onTabChange: (tabId: string) => void
    variant?: 'default' | 'colored' | 'minimal'
    theme?: 'light' | 'dark'
}

const Tabs: FC<ITabsProps> = memo(({children, activeTab, onTabChange, variant = 'default', theme = 'light'}) => {
    const tabs = useMemo(() => getValidTabs(children), [children])

    const activeTabContent = useMemo(() => {
        return tabs.find((tab) => tab.props.id === activeTab)?.props.children
    }, [tabs, activeTab])

    // Управляем индикатором табов для плавного перемещения
    const {indicatorStyle, isInitialized, tabRefs, tabsHeaderRef} = useTabIndicator({
        activeTab,
        tabs,
    })

    return (
        <div
            className={cn('flex flex-col h-full font-sans relative modern-tabs', {
                'text-gray-200': theme === 'dark',
                minimal: variant === 'minimal',
            })}
        >
            <TabHeaders
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={onTabChange}
                variant={variant}
                indicatorStyle={indicatorStyle}
                isInitialized={isInitialized}
                tabRefs={tabRefs}
                tabsHeaderRef={tabsHeaderRef}
            />

            {/* Контент табов */}
            <div className="flex-1 relative overflow-y-auto overflow-x-hidden pr-1 tab-content">{activeTabContent}</div>
        </div>
    )
})

// Добавляем displayName для Tabs
Tabs.displayName = 'Tabs'

export default Tabs
