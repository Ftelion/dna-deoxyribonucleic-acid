import {useState, useEffect, useCallback} from 'react'
import {useDNAViewStore} from '@/features/dna-visualization/model/stores/useDNAViewStore'

const DEFAULT_DRAWER_WIDTH = 360

export const useDrawer = () => {
    const {closeAllCollapsibleTabs} = useDNAViewStore((s) => ({
        closeAllCollapsibleTabs: s.closeAllCollapsibleTabs,
    }))
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
    const [drawerWidth, setDrawerWidth] = useState(DEFAULT_DRAWER_WIDTH)
    const [isResizing, setIsResizing] = useState(false)

    const handleSideMenuClose = useCallback(() => {
        setIsSideMenuOpen(false)
    }, [])

    const handleDrawerWidthChange = useCallback(
        (width: number) => {
            if (isResizing) {
                requestAnimationFrame(() => setDrawerWidth(width))
            } else {
                setDrawerWidth(width)
            }
        },
        [isResizing]
    )

    const handleResizeStateChange = useCallback((resizing: boolean) => {
        setIsResizing(resizing)
    }, [])

    /**
     * Закрываем все collapsible tabs при закрытии drawer'а
     */
    useEffect(() => {
        if (!isSideMenuOpen) {
            closeAllCollapsibleTabs()
            setDrawerWidth(DEFAULT_DRAWER_WIDTH)
        }
    }, [isSideMenuOpen, closeAllCollapsibleTabs])

    return {
        isSideMenuOpen,
        setIsSideMenuOpen,
        drawerWidth,
        isResizing,
        handleSideMenuClose,
        handleDrawerWidthChange,
        handleResizeStateChange,
    }
}
