import {useState} from 'react'

export const useDropdownMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isHoveringMenu, setIsHoveringMenu] = useState(false)
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false)
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)

    const closeAllModals = () => {
        setIsMenuOpen(false)
        setIsHoveringMenu(false)
        setIsThemeModalOpen(false)
        setIsLanguageModalOpen(false)
    }

    const handleMenuItemHover = (item: string, isHovering: boolean, menuOpen: boolean) => {
        // Всегда закрываем оба popover'а при уходе курсора
        if (!isHovering) {
            setIsThemeModalOpen(false)
            setIsLanguageModalOpen(false)
            return
        }

        // Открываем соответствующий popover только при наведении и только если меню открыто
        if (menuOpen) {
            setIsThemeModalOpen(item === 'theme')
            setIsLanguageModalOpen(item === 'language')
        }
    }

    return {
        isMenuOpen,
        setIsMenuOpen,
        isHoveringMenu,
        setIsHoveringMenu,
        isThemeModalOpen,
        setIsThemeModalOpen,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        closeAllModals,
        handleMenuItemHover,
    }
}
