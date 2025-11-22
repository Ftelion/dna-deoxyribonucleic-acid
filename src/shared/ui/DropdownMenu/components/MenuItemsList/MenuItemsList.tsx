import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {DropdownMenuItem} from '../DropdownMenuItem/DropdownMenuItem'
import {getMenuItems} from '../../lib/constants/menuConstants'

interface IMenuItemsListProps {
    onItemHover: (item: string, isHovering: boolean) => void
    onItemClick: (item: string) => void
    activePopover: 'theme' | 'language' | null
}

const TOOLTIP_KEYS = {
    reset: 'TOOLTIP_RESET_VISUALIZATION',
    theme: 'TOOLTIP_CHANGE_THEME',
    language: 'TOOLTIP_SELECT_LANGUAGE',
    settings: 'TOOLTIP_OPEN_SETTINGS',
} as const

export const MenuItemsList: FC<IMenuItemsListProps> = ({onItemHover, onItemClick, activePopover}) => {
    const {t} = useTranslation()
    const menuItems = getMenuItems()

    return (
        <>
            {menuItems.map((item) => (
                <DropdownMenuItem
                    key={item.id}
                    icon={item.icon}
                    label={t(item.labelKey, item.labelFallback)}
                    onMouseEnter={() => onItemHover(item.id, true)}
                    onClick={() => onItemClick(item.id)}
                    active={activePopover === item.id}
                    isRotatable={item.id === 'reset'}
                    isSettingsRotatable={item.id === 'settings'}
                    title={t(TOOLTIP_KEYS[item.id as keyof typeof TOOLTIP_KEYS] || '')}
                />
            ))}
        </>
    )
}
