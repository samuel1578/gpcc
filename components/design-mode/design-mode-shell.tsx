"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Settings2, X, RotateCcw, Eye, EyeOff } from "lucide-react"
import { EMPTY_CONFIG, useDesignConfig, useDesignMode } from "@/lib/design-mode/store"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function DesignModeShell() {
  const enabled = useDesignMode((s) => s.enabled)
  const toggle = useDesignMode((s) => s.toggle)
  const activePageKey = useDesignMode((s) => s.activePageKey)
  const registry = useDesignMode((s) => s.registry)
  const selectedId = useDesignMode((s) => s.selectedElementId)
  const selectElement = useDesignMode((s) => s.selectElement)
  const setValue = useDesignConfig((s) => s.setValue)
  const resetElement = useDesignConfig((s) => s.resetElement)
  const resetPage = useDesignConfig((s) => s.resetPage)
  const config =
    useDesignConfig((s) =>
      selectedId ? s.configs[activePageKey]?.[selectedId] : undefined,
    ) ?? EMPTY_CONFIG

  const pageElements = registry.filter((m) => m.pageKey === activePageKey)
  const selected = pageElements.find((m) => m.elementId === selectedId)

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        type="button"
        onClick={toggle}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        aria-label={enabled ? "Close design mode" : "Open design mode"}
        className={cn(
          "fixed bottom-5 right-5 z-[90] flex h-12 w-12 items-center justify-center rounded-full",
          "shadow-lg backdrop-blur transition-colors",
          enabled
            ? "bg-fuchsia-600 text-white"
            : "bg-[var(--surface-dark-strong)] text-white/85 hover:text-white",
        )}
      >
        {enabled ? <X className="h-5 w-5" /> : <Settings2 className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {enabled && (
          <motion.aside
            key="design-panel"
            initial={{ x: 360, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 360, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed right-4 bottom-20 top-20 z-[85] w-[min(92vw,360px)] overflow-hidden rounded-2xl glass-panel-dark text-white shadow-[var(--shadow-dramatic)]"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                  Design Mode
                </p>
                <h3 className="font-display text-xl font-semibold">
                  {selected ? selected.label : "Page editor"}
                </h3>
                <p className="mt-0.5 text-xs text-white/50">
                  Page: <span className="text-white/80">{activePageKey}</span> · {pageElements.length} editable
                </p>
              </div>
              {selected && (
                <button
                  type="button"
                  onClick={() => selectElement(null)}
                  className="rounded-md p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
                  aria-label="Back to element list"
                >
                  <Eye className="h-4 w-4" />
                </button>
              )}
            </header>

            <div className="flex h-[calc(100%-72px)] flex-col">
              {!selected ? (
                <ElementList
                  items={pageElements.map((m) => ({
                    id: m.elementId,
                    label: m.label,
                    type: m.type,
                  }))}
                  onSelect={(id) => selectElement(id)}
                />
              ) : (
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="space-y-5">
                    {selected.fields.map((field) => (
                      <li key={field.key}>
                        <FieldControl
                          field={field}
                          value={config[field.key]}
                          onChange={(v) => setValue(activePageKey, selected.elementId, field.key, v)}
                        />
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => resetElement(activePageKey, selected.elementId)}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/80 hover:bg-white/10"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Reset element
                  </button>
                </div>
              )}

              <footer className="flex items-center justify-between gap-2 border-t border-white/10 px-5 py-3 text-xs text-white/60">
                <span className="inline-flex items-center gap-1.5">
                  <EyeOff className="h-3.5 w-3.5" /> ⌘+Shift+D
                </span>
                <button
                  type="button"
                  onClick={() => resetPage(activePageKey)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-white/80 hover:bg-white/10"
                >
                  Reset page
                </button>
              </footer>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

function ElementList({
  items,
  onSelect,
}: {
  items: { id: string; label: string; type: string }[]
  onSelect: (id: string) => void
}) {
  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center text-sm text-white/60">
        <p>No editable elements registered on this page yet.</p>
      </div>
    )
  }
  return (
    <ul className="flex-1 overflow-y-auto px-3 py-3">
      {items.map((it) => (
        <li key={it.id}>
          <button
            type="button"
            onClick={() => onSelect(it.id)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm hover:bg-white/10"
          >
            <span className="font-medium">{it.label}</span>
            <span className="text-[11px] uppercase tracking-wider text-white/40">
              {it.type}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: import("@/lib/design-mode/store").EditableField
  value: string | number | boolean | undefined
  onChange: (v: string | number | boolean) => void
}) {
  if (field.kind === "slider") {
    const v = (value as number | undefined) ?? Math.round((field.min + field.max) / 2)
    return (
      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-white/75">{field.label}</span>
          <span className="font-mono text-white/55">
            {v}
            {field.unit ?? ""}
          </span>
        </div>
        <input
          type="range"
          min={field.min}
          max={field.max}
          step={field.step ?? 1}
          value={v}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-fuchsia-400"
        />
      </div>
    )
  }
  if (field.kind === "select") {
    return (
      <div>
        <label className="mb-1.5 block text-xs text-white/75">{field.label}</label>
        <select
          value={(value as string | undefined) ?? field.options[0]?.value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-white outline-none focus:border-fuchsia-300"
        >
          {field.options.map((o) => (
            <option key={o.value} value={o.value} className="bg-zinc-900">
              {o.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
  if (field.kind === "toggle") {
    const v = Boolean(value)
    return (
      <label className="flex items-center justify-between text-xs text-white/80">
        <span>{field.label}</span>
        <button
          type="button"
          onClick={() => onChange(!v)}
          className={cn(
            "relative h-5 w-9 rounded-full transition-colors",
            v ? "bg-fuchsia-500" : "bg-white/20",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all",
              v ? "left-[18px]" : "left-0.5",
            )}
          />
        </button>
      </label>
    )
  }
  if (field.kind === "color") {
    const v = (value as string | undefined) ?? "#ffffff"
    return (
      <div>
        <label className="mb-1.5 block text-xs text-white/75">{field.label}</label>
        <input
          type="color"
          value={v}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-full cursor-pointer rounded-md bg-transparent"
        />
      </div>
    )
  }
  return null
}
