import {useState, useEffect} from 'react'

const DRAWER_BREAKPOINT = 424

/**
 * Хук для определения размера drawer
 */
export const useDrawerSize = (breakpoint: number = DRAWER_BREAKPOINT): boolean => {
    const [isDrawerSmall, setIsDrawerSmall] = useState(false)

    useEffect(() => {
        const checkDrawerSize = () => {
            // Ищем drawer элемент
            const drawer = document.querySelector('.drawer-content') as HTMLElement
            if (drawer) {
                setIsDrawerSmall(drawer.offsetWidth < breakpoint)
            }
        }

        checkDrawerSize()
        window.addEventListener('resize', checkDrawerSize)

        // Также проверяем при изменениях в DOM
        const observer = new MutationObserver(checkDrawerSize)
        observer.observe(document.body, {attributes: true, subtree: true})

        return () => {
            window.removeEventListener('resize', checkDrawerSize)
            observer.disconnect()
        }
    }, [breakpoint])

    return isDrawerSmall
}
