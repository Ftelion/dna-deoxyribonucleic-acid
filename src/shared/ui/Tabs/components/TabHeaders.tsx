import {FC, RefObject} from 'react'
import cn from 'classnames'
import {ReactElement} from 'react'
import {ITabProps} from './Tab'

interface ITabHeadersProps {
    tabs: ReactElement<ITabProps>[]
    activeTab: string
    onTabChange: (tabId: string) => void
    variant: 'default' | 'colored' | 'minimal'
    indicatorStyle: {left: number; width: number}
    isInitialized: boolean
    tabRefs: RefObject<Record<string, HTMLButtonElement | null>>
    tabsHeaderRef: RefObject<HTMLDivElement>
}

export const TabHeaders: FC<ITabHeadersProps> = ({
    tabs,
    activeTab,
    onTabChange,
    variant,
    indicatorStyle,
    isInitialized,
    tabRefs,
    tabsHeaderRef,
}) => {
    return (
        <div
            ref={tabsHeaderRef}
            className="relative flex items-center mb-6 ml-1 mr-2 rounded-xl p-1 shadow-sm overflow-x-auto overflow-y-hidden overflow-visible tabs-header bg-[var(--color-tab-header-background)] backdrop-blur-[12px] border border-[var(--color-tab-header-border)]"
        >
            {/* Анимированный индикатор */}
            <div
                className={cn(
                    'absolute top-1 bottom-1 z-10 rounded-lg transition-all duration-300 opacity-0 pointer-events-none tab-indicator',
                    {
                        'shadow-blue-500/25 border-none': variant === 'colored',
                        'shadow-[0_4px_12px_var(--color-tab-indicator-shadow)] border border-[var(--color-tab-indicator-border)]':
                            variant !== 'colored',
                        'opacity-100': isInitialized,
                    }
                )}
                style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`,
                    background:
                        variant === 'colored'
                            ? 'var(--color-tab-indicator-colored)'
                            : 'var(--color-tab-indicator-default)',
                }}
            />

            {tabs.map((tab) => (
                <button
                    key={tab.props.id}
                    ref={(el) => {
                        if (tabRefs.current) {
                            tabRefs.current[tab.props.id] = el
                        }
                    }}
                    onClick={() => onTabChange(tab.props.id)}
                    className={cn(
                        'relative z-20 flex items-center justify-center px-5 py-3 bg-transparent text-sm font-medium tracking-tight whitespace-nowrap min-w-fit flex-shrink-0 focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-500 rounded-lg transition-all duration-200 hover:shadow-lg tab-button',
                        {
                            'font-semibold cursor-default !shadow-none hover:!shadow-none text-[var(--color-tab-button-text-active)]':
                                activeTab === tab.props.id && variant !== 'colored',
                            'font-semibold cursor-default !shadow-none hover:!shadow-none text-[var(--color-tab-button-text-active-colored)]':
                                activeTab === tab.props.id && variant === 'colored',
                            'cursor-pointer text-[var(--color-tab-button-text-inactive)]': activeTab !== tab.props.id,
                        }
                    )}
                >
                    {tab.props.title}
                </button>
            ))}
        </div>
    )
}
