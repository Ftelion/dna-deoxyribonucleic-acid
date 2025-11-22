import {create} from 'zustand'
import {shallow} from 'zustand/shallow'
import type {IVector3Array} from '@/shared/types'

interface IDNAViewStore {
    hoveredId: number | null
    selectedId: number | null
    cameraPosition: IVector3Array
    cameraTarget: IVector3Array
    resetCameraCallback: (() => void) | null

    showATPairs: boolean
    showGCPairs: boolean
    pairFilterMode: 'all' | 'even' | 'odd' | number[]

    collapsibleTabsState: {
        pairs: boolean
        rotation: boolean
        breathing: boolean
        camera: boolean
    }

    setHoveredId: (id: number | null) => void
    setSelectedId: (id: number | null) => void
    setCameraPosition: (position: IVector3Array) => void
    setCameraTarget: (target: IVector3Array) => void
    resetCamera: () => void
    resetPairs: () => void
    setResetCameraCallback: (callback: (() => void) | null) => void
    setShowATPairs: (show: boolean) => void
    setShowGCPairs: (show: boolean) => void
    setPairFilterMode: (mode: 'all' | 'even' | 'odd' | number[]) => void
    setCollapsibleTabState: (key: 'pairs' | 'rotation' | 'breathing' | 'camera', isOpen: boolean) => void
    closeAllCollapsibleTabs: () => void
    resetPairFilters: () => void
    resetAll: () => void
}

const INITIAL_STATE = {
    hoveredId: null,
    selectedId: null,
    cameraPosition: [0, 0.5, 20] as IVector3Array,
    cameraTarget: [0, 0, 0] as IVector3Array,
    resetCameraCallback: null,
    showATPairs: true,
    showGCPairs: true,
    pairFilterMode: 'all' as const,
    collapsibleTabsState: {
        pairs: false,
        rotation: false,
        breathing: false,
        camera: false,
    },
}

/**
 * Store для управления видом, интерактивностью и UI состоянием ДНК
 */
const store = create<IDNAViewStore>((set, get) => ({
    ...INITIAL_STATE,

    setHoveredId: (id) => set({hoveredId: id}),
    setSelectedId: (id) => set({selectedId: id}),
    setCameraPosition: (position) => set({cameraPosition: position}),
    setCameraTarget: (target) => set({cameraTarget: target}),
    resetCamera: () => {
        set({
            cameraPosition: INITIAL_STATE.cameraPosition,
            cameraTarget: INITIAL_STATE.cameraTarget,
        })
        get().resetCameraCallback?.()
    },
    resetPairs: () => set({hoveredId: null, selectedId: null}),
    setResetCameraCallback: (callback) => set({resetCameraCallback: callback}),
    setShowATPairs: (show) => set({showATPairs: show}),
    setShowGCPairs: (show) => set({showGCPairs: show}),
    setPairFilterMode: (mode) => set({pairFilterMode: mode}),
    setCollapsibleTabState: (key, isOpen) =>
        set((s) => ({
            collapsibleTabsState: {...s.collapsibleTabsState, [key]: isOpen},
        })),
    closeAllCollapsibleTabs: () => set({collapsibleTabsState: INITIAL_STATE.collapsibleTabsState}),
    resetPairFilters: () =>
        set({
            showATPairs: INITIAL_STATE.showATPairs,
            showGCPairs: INITIAL_STATE.showGCPairs,
            pairFilterMode: INITIAL_STATE.pairFilterMode,
            selectedId: null,
            hoveredId: null,
        }),
    resetAll: () => set({...INITIAL_STATE, resetCameraCallback: get().resetCameraCallback}),
}))

export const useDNAViewStore = <T>(selector: (state: IDNAViewStore) => T) => store(selector, shallow)
export const useDNAViewStoreRaw = store
