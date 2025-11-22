import {ReactElement, Children, isValidElement, ReactNode} from 'react'
import Tab, {ITabProps} from '../../components/Tab'

/**
 * Прокручиваем контейнер табов для того, чтобы активный таб оказывался в центре видимой области
 */
export const scrollToTabCenter = (tabsHeader: HTMLElement, activeTabElement: HTMLElement): void => {
    const tabCenter = activeTabElement.offsetLeft + activeTabElement.offsetWidth / 2
    const headerWidth = tabsHeader.clientWidth
    const visibleCenter = tabsHeader.scrollLeft + headerWidth / 2

    // Если таб не в центре видимой области, прокручиваем к нему
    if (Math.abs(tabCenter - visibleCenter) > headerWidth / 3) {
        tabsHeader.scrollTo({
            left: tabCenter - headerWidth / 2,
            behavior: 'smooth',
        })
    }
}

/**
 * Фильтруем children и возвращаем только валидные Tab компоненты
 */
export const getValidTabs = (children: ReactNode): ReactElement<ITabProps>[] => {
    const validTabs: ReactElement<ITabProps>[] = []

    Children.forEach(children, (child) => {
        if (isValidElement<ITabProps>(child) && child.type === Tab) {
            validTabs.push(child)
        }
    })

    return validTabs
}
