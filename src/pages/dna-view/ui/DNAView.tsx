import {FC, useState, Suspense, lazy} from 'react'
import {useTranslation} from 'react-i18next'
import {Helmet} from 'react-helmet-async'
import DNAControls from '@/features/dna-visualization/ui/DNAControls'
import Tabs from '@/shared/ui/Tabs/ui/Tabs'
import Tab from '@/shared/ui/Tabs/components/Tab'
import Drawer from '@/shared/ui/Drawer/ui/Drawer'
import {DropdownMenu} from '@/shared/ui/DropdownMenu/ui/DropdownMenu'
import InstructionsTab from '@/shared/ui/InstructionTab/ui/InstructionsTab'
import {RingLoader} from '@/shared/ui/Loader/ui/RingLoader'
import {useDNAViewStore} from '@/features/dna-visualization/model/stores/useDNAViewStore'
import {DNAViewHeader} from './components/DNAViewHeader'
import {useDrawer} from '../lib/useDrawer'
import {createDropdownMenuHandler} from '@/shared/ui/DropdownMenu/lib/utils/dropdownMenuUtils'
import {useThemeContext} from '@/shared/lib/theme/ThemeProvider'

const DNASceneContainer = lazy(() =>
    import('./components/DNASceneContainer').then((module) => ({default: module.DNASceneContainer}))
)

const DNAView: FC = () => {
    const {t, i18n} = useTranslation()
    const {resetAll} = useDNAViewStore((s) => ({
        resetAll: s.resetAll,
    }))
    const {setTheme} = useThemeContext()
    const [activeTab, setActiveTab] = useState('visualization')

    const {
        isSideMenuOpen,
        setIsSideMenuOpen,
        drawerWidth,
        isResizing,
        handleSideMenuClose,
        handleDrawerWidthChange,
        handleResizeStateChange,
    } = useDrawer()

    const handleDropdownMenuClick = createDropdownMenuHandler({
        i18n,
        resetAll,
        setIsSideMenuOpen,
        setTheme,
    })
    return (
        <>
            <Helmet>
                <title>{t('DNA_EXPLORER_TITLE')}</title>
            </Helmet>

            <div className="relative w-full max-w-full mx-auto px-2 py-4">
                <DNAViewHeader isSideMenuOpen={isSideMenuOpen} drawerWidth={drawerWidth} isResizing={isResizing} />

                <Drawer
                    open={isSideMenuOpen}
                    onClose={handleSideMenuClose}
                    onWidthChange={handleDrawerWidthChange}
                    onResizeStateChange={handleResizeStateChange}
                    title={t('CONTROLS_TITLE')}
                >
                    <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
                        <Tab id="visualization" title={t('TAB_VISUALIZATION')}>
                            <DNAControls />
                        </Tab>

                        <Tab id="language" title={t('TAB_LANGUAGE')}>
                            <></>
                        </Tab>

                        <Tab id="instructions" title={t('TAB_INSTRUCTIONS')}>
                            <InstructionsTab />
                        </Tab>
                    </Tabs>
                </Drawer>

                <Suspense
                    fallback={
                        <div className="absolute inset-0 flex items-center justify-center min-h-screen bg-white">
                            <RingLoader size={80} color="#3b82f6" />
                        </div>
                    }
                >
                    <DNASceneContainer
                        isSideMenuOpen={isSideMenuOpen}
                        drawerWidth={drawerWidth}
                        isResizing={isResizing}
                    />
                </Suspense>
            </div>

            <DropdownMenu onMenuItemClick={handleDropdownMenuClick} />
        </>
    )
}

export default DNAView
