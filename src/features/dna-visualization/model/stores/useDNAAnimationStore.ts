import {create} from 'zustand'
import {shallow} from 'zustand/shallow'

interface IDNAAnimationStore {
    preview: boolean
    breathingActive: boolean
    rotationSpeed: number
    breathingIntensity: number

    togglePreview: () => void
    toggleBreathing: () => void
    setRotationSpeed: (speed: number) => void
    setBreathingIntensity: (intensity: number) => void
    resetRotationSpeed: () => void
    resetBreathingIntensity: () => void
    resetAnimations: () => void
}

const INITIAL_STATE = {
    preview: false,
    breathingActive: false,
    rotationSpeed: 0.2,
    breathingIntensity: 0.05,
}

/**
 * Store для управления анимациями ДНК
 */
const store = create<IDNAAnimationStore>((set) => ({
    ...INITIAL_STATE,

    togglePreview: () => set((s) => ({preview: !s.preview})),
    toggleBreathing: () => set((s) => ({breathingActive: !s.breathingActive})),
    setRotationSpeed: (speed) => set({rotationSpeed: Math.max(0, Math.min(1, speed))}),
    setBreathingIntensity: (intensity) => set({breathingIntensity: Math.max(0, Math.min(1, intensity))}),
    resetRotationSpeed: () => set({rotationSpeed: INITIAL_STATE.rotationSpeed}),
    resetBreathingIntensity: () => set({breathingIntensity: INITIAL_STATE.breathingIntensity}),
    resetAnimations: () => set(INITIAL_STATE),
}))

export const useDNAAnimationStore = <T>(selector: (state: IDNAAnimationStore) => T) => store(selector, shallow)
export const useDNAAnimationStoreRaw = store
