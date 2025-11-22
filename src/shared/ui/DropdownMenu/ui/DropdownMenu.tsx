import {FC, useRef, useEffect, useState} from 'react'
import {SettingsIcon} from '@/shared/ui/Icon/ui/dropdownMenuIcons/SettingsIcon'
import {useDropdownMenuLogic} from '../lib/hooks/useDropdownMenuLogic'
import {MenuItemsList} from '../components/MenuItemsList/MenuItemsList'
import {ThemeOptionButtons} from '@/shared/ui/Buttons/components/ThemeOptionButtons'
import {LanguageOptionButton} from '@/shared/ui/Buttons/components/LanguageOptionButtons'
import './DropdownMenu.css'
import cn from 'classnames'
import {t} from 'i18next'

interface IDropdownMenuProps {
    onMenuItemClick?: (item: string) => void
}

// Константы для таймаутов
const MENU_OPEN_DELAY = 150
const MENU_CLOSE_DELAY = 300

export const DropdownMenu: FC<IDropdownMenuProps> = ({onMenuItemClick}) => {
    const buttonRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)
    const [gearAnimationVariant, setGearAnimationVariant] = useState(1)

    const {dropdownMenu, handleMenuItemHover, handleMenuItemClick, handleOptionSelect} = useDropdownMenuLogic({
        onMenuItemClick,
    })

    // Генерируем случайный вариант анимации при hover
    const handleMouseEnter = () => {
        dropdownMenu.setIsHoveringMenu(true)
        setGearAnimationVariant(Math.floor(Math.random() * 3) + 1)
    }

    const handleMouseLeave = () => {
        dropdownMenu.setIsHoveringMenu(false)
    }

    // Определяем активный popover на основе открытых модальных окон
    const popoverStates = [
        {isOpen: dropdownMenu.isThemeModalOpen, id: 'theme'},
        {isOpen: dropdownMenu.isLanguageModalOpen, id: 'language'},
    ] as const

    const activePopover = popoverStates.find((state) => state.isOpen)?.id ?? null

    useEffect(() => {
        let timeoutId: NodeJS.Timeout

        if (dropdownMenu.isHoveringMenu) {
            timeoutId = setTimeout(() => dropdownMenu.setIsMenuOpen(true), MENU_OPEN_DELAY)
        } else {
            timeoutId = setTimeout(() => dropdownMenu.closeAllModals(), MENU_CLOSE_DELAY)
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [dropdownMenu.isHoveringMenu, dropdownMenu])

    return (
        <div className="fixed top-6 right-6 z-[1000]" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div
                ref={buttonRef}
                className={cn('cursor-pointer rounded-full gear-spin', `gear-variant-${gearAnimationVariant}`, {
                    active: dropdownMenu.isMenuOpen,
                })}
                title={t('TOOLTIP_OPEN_SETTINGS')}
            >
                <SettingsIcon color="var(--color-dropdown-text)" />
            </div>
            <div ref={menuRef} className={cn('dropdown-menu', dropdownMenu.isMenuOpen && 'open')}>
                <MenuItemsList
                    onItemHover={handleMenuItemHover}
                    onItemClick={handleMenuItemClick}
                    activePopover={activePopover}
                />
                <ThemeOptionButtons isOpen={dropdownMenu.isThemeModalOpen} onSelect={handleOptionSelect} />
                <LanguageOptionButton isOpen={dropdownMenu.isLanguageModalOpen} onSelect={handleOptionSelect} />
            </div>
        </div>
    )
}
