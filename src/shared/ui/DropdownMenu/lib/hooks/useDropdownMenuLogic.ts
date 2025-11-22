import {useCallback} from 'react'
import {useDropdownMenu} from './useDropdownMenu'

interface IUseDropdownMenuLogicProps {
    onMenuItemClick?: (item: string) => void
}

/**
 * Хук для логики управления dropdown меню
 */
export const useDropdownMenuLogic = ({onMenuItemClick}: IUseDropdownMenuLogicProps) => {
    const dropdownMenu = useDropdownMenu()

    const handleMenuItemHover = useCallback(
        (item: string, isHovering: boolean) => {
            dropdownMenu.handleMenuItemHover(item, isHovering, dropdownMenu.isMenuOpen)
        },
        // Не нужен весь обработчик, просто открытое меню
        // eslint-disable-next-line
        [dropdownMenu.isMenuOpen]
    )

    const handleMenuItemClick = useCallback(
        (item: string) => {
            if (item === 'theme' || item === 'language') {
                // Не закрываем меню при клике на "Тема" или "Язык"
                return
            }

            onMenuItemClick?.(item)
            dropdownMenu.closeAllModals()
        },
        [onMenuItemClick, dropdownMenu]
    )

    const handleOptionSelect = useCallback(
        (type: 'theme' | 'language', value: string) => {
            onMenuItemClick?.(`${type}-${value}`)
            // @TODO: здесь подумать как будет лучше: закрытие модалок после выбора языка / темы OR оставляем как есть (hover уже навешивается правильно)
            // dropdownMenu.closeAllModals()
        },
        [onMenuItemClick]
    )

    return {
        dropdownMenu,
        handleMenuItemHover,
        handleMenuItemClick,
        handleOptionSelect,
    }
}
