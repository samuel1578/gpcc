"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

/**
 * Design Mode is a global, page-aware editor.
 * Each editable element registers itself with `register(meta)` and reads
 * its current overrides via `useElementConfig(pageKey, elementId)`.
 *
 * Configs are namespaced by pageKey, so any new page automatically supports
 * editing — there's no per-page hardcoding.
 */

export type ElementType = "section" | "text" | "image" | "hero" | "navbar" | "footer"

export type EditableField =
  | { kind: "slider"; key: string; label: string; min: number; max: number; step?: number; unit?: string }
  | { kind: "select"; key: string; label: string; options: { value: string; label: string }[] }
  | { kind: "toggle"; key: string; label: string }
  | { kind: "color"; key: string; label: string }

export type ElementMeta = {
  pageKey: string
  elementId: string
  label: string
  type: ElementType
  fields: EditableField[]
}

export type ElementConfig = Record<string, string | number | boolean>

/** Stable empty-config singleton used by selectors so Zustand sees a steady reference. */
export const EMPTY_CONFIG: ElementConfig = Object.freeze({}) as ElementConfig

type RegistryState = {
  // page configurations: pageKey -> elementId -> field values
  configs: Record<string, Record<string, ElementConfig>>
  setValue: (pageKey: string, elementId: string, key: string, value: string | number | boolean) => void
  resetElement: (pageKey: string, elementId: string) => void
  resetPage: (pageKey: string) => void
  getConfig: (pageKey: string, elementId: string) => ElementConfig
}

export const useDesignConfig = create<RegistryState>()(
  persist(
    (set, get) => ({
      configs: {},
      setValue: (pageKey, elementId, key, value) =>
        set((state) => {
          const page = state.configs[pageKey] ?? {}
          const el = page[elementId] ?? {}
          return {
            configs: {
              ...state.configs,
              [pageKey]: { ...page, [elementId]: { ...el, [key]: value } },
            },
          }
        }),
      resetElement: (pageKey, elementId) =>
        set((state) => {
          const page = { ...(state.configs[pageKey] ?? {}) }
          delete page[elementId]
          return { configs: { ...state.configs, [pageKey]: page } }
        }),
      resetPage: (pageKey) =>
        set((state) => {
          const next = { ...state.configs }
          delete next[pageKey]
          return { configs: next }
        }),
      getConfig: (pageKey, elementId) =>
        get().configs[pageKey]?.[elementId] ?? {},
    }),
    {
      name: "gpcc-design-config",
      version: 1,
    },
  ),
)

/** Mode store — controls panel visibility & active page key. */
type ModeState = {
  enabled: boolean
  activePageKey: string
  selectedElementId: string | null
  registry: ElementMeta[]
  setEnabled: (v: boolean) => void
  toggle: () => void
  setActivePage: (pageKey: string) => void
  selectElement: (elementId: string | null) => void
  register: (meta: ElementMeta) => void
  unregister: (pageKey: string, elementId: string) => void
}

export const useDesignMode = create<ModeState>((set) => ({
  enabled: false,
  activePageKey: "home",
  selectedElementId: null,
  registry: [],
  setEnabled: (v) => set({ enabled: v }),
  toggle: () => set((s) => ({ enabled: !s.enabled })),
  setActivePage: (pageKey) =>
    set((s) =>
      s.activePageKey === pageKey ? s : { activePageKey: pageKey, selectedElementId: null },
    ),
  selectElement: (elementId) => set({ selectedElementId: elementId }),
  register: (meta) =>
    set((s) => {
      const exists = s.registry.some(
        (m) => m.pageKey === meta.pageKey && m.elementId === meta.elementId,
      )
      if (exists) return s
      return { registry: [...s.registry, meta] }
    }),
  unregister: (pageKey, elementId) =>
    set((s) => ({
      registry: s.registry.filter(
        (m) => !(m.pageKey === pageKey && m.elementId === elementId),
      ),
    })),
}))
