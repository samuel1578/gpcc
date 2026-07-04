"use client"

import { useEffect, useMemo, type CSSProperties, type ReactNode } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"
import {
  EMPTY_CONFIG,
  useDesignConfig,
  useDesignMode,
  type EditableField,
  type ElementType,
} from "@/lib/design-mode/store"

/** Default editable field schemas per element type. */
const defaultFields: Record<ElementType, EditableField[]> = {
  section: [
    { kind: "slider", key: "paddingY", label: "Vertical padding", min: 0, max: 200, step: 4, unit: "px" },
    { kind: "slider", key: "paddingX", label: "Horizontal padding", min: 0, max: 96, step: 4, unit: "px" },
    { kind: "slider", key: "maxWidth", label: "Max width", min: 640, max: 1920, step: 16, unit: "px" },
    { kind: "slider", key: "gap", label: "Gap between items", min: 0, max: 96, step: 4, unit: "px" },
    {
      kind: "select", key: "columns", label: "Columns",
      options: [
        { value: "1", label: "1 column" },
        { value: "2", label: "2 columns" },
        { value: "3", label: "3 columns" },
        { value: "4", label: "4 columns" },
      ],
    },
  ],
  text: [
    { kind: "slider", key: "fontSize", label: "Font size", min: 12, max: 96, step: 1, unit: "px" },
    { kind: "slider", key: "lineHeight", label: "Line height (×10)", min: 8, max: 22, step: 1 },
    { kind: "slider", key: "maxWidth", label: "Max width", min: 240, max: 1200, step: 8, unit: "px" },
    {
      kind: "select", key: "align", label: "Alignment",
      options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
      ],
    },
  ],
  image: [
    { kind: "slider", key: "width", label: "Width", min: 80, max: 1200, step: 8, unit: "px" },
    { kind: "slider", key: "height", label: "Height", min: 80, max: 1200, step: 8, unit: "px" },
    { kind: "slider", key: "radius", label: "Corner radius", min: 0, max: 64, step: 1, unit: "px" },
    {
      kind: "select", key: "fit", label: "Object fit",
      options: [
        { value: "cover", label: "Cover" },
        { value: "contain", label: "Contain" },
        { value: "fill", label: "Fill" },
      ],
    },
    {
      kind: "select", key: "position", label: "Object position",
      options: [
        { value: "center", label: "Center" },
        { value: "top", label: "Top" },
        { value: "bottom", label: "Bottom" },
        { value: "left", label: "Left" },
        { value: "right", label: "Right" },
      ],
    },
  ],
  hero: [
    { kind: "slider", key: "height", label: "Height (vh)", min: 40, max: 100, step: 1 },
    { kind: "slider", key: "overlay", label: "Overlay darkness", min: 0, max: 100, step: 1 },
    {
      kind: "select", key: "ctaAlign", label: "CTA alignment",
      options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
      ],
    },
  ],
  navbar: [
    { kind: "slider", key: "height", label: "Height", min: 48, max: 120, step: 1, unit: "px" },
    { kind: "slider", key: "transparency", label: "Transparency", min: 0, max: 100, step: 1 },
  ],
  footer: [
    { kind: "slider", key: "paddingY", label: "Vertical padding", min: 0, max: 200, step: 4, unit: "px" },
  ],
}

/** Hook: register an editable element & read its overrides. */
function useEditable(
  elementId: string,
  type: ElementType,
  label: string,
  pageKeyOverride?: string,
) {
  const activePageKey = useDesignMode((s) => s.activePageKey)
  const pageKey = pageKeyOverride ?? activePageKey
  const register = useDesignMode((s) => s.register)
  const unregister = useDesignMode((s) => s.unregister)
  const enabled = useDesignMode((s) => s.enabled)
  const selectedElementId = useDesignMode((s) => s.selectedElementId)
  const selectElement = useDesignMode((s) => s.selectElement)
  // IMPORTANT: never create a fresh object inside the selector — it would
  // cause Zustand to see a new reference on every store update and loop.
  const config =
    useDesignConfig((s) => s.configs[pageKey]?.[elementId]) ?? EMPTY_CONFIG

  useEffect(() => {
    register({ pageKey, elementId, label, type, fields: defaultFields[type] })
    return () => unregister(pageKey, elementId)
  }, [pageKey, elementId, label, type, register, unregister])

  const isSelected = enabled && selectedElementId === elementId

  return { config, enabled, isSelected, selectElement, pageKey }
}

/** Editable wrapper for sections. */
export function EditableSection({
  id,
  label,
  pageKey,
  className,
  children,
  as: Tag = "section",
}: {
  id: string
  label: string
  pageKey?: string
  className?: string
  children: ReactNode
  as?: "section" | "div" | "article"
}) {
  const { config, enabled, isSelected, selectElement } = useEditable(id, "section", label, pageKey)

  const style = useMemo<CSSProperties>(() => {
    const s: CSSProperties = {}
    if (config.paddingY !== undefined) s.paddingTop = `${config.paddingY}px`
    if (config.paddingY !== undefined) s.paddingBottom = `${config.paddingY}px`
    if (config.paddingX !== undefined) {
      s.paddingLeft = `${config.paddingX}px`
      s.paddingRight = `${config.paddingX}px`
    }
    if (config.maxWidth !== undefined) {
      s.maxWidth = `${config.maxWidth}px`
      s.marginLeft = "auto"
      s.marginRight = "auto"
    }
    if (config.gap !== undefined) s.gap = `${config.gap}px`
    return s
  }, [config])

  const cols = config.columns as string | undefined

  return (
    <Tag
      data-editable={id}
      data-editable-selected={isSelected ? "true" : undefined}
      onClick={enabled ? (e) => { e.stopPropagation(); selectElement(id) } : undefined}
      className={cn(
        className,
        cols && `[--cols:${cols}]`,
        enabled && "outline-dashed outline-1 outline-offset-4 outline-fuchsia-400/40 cursor-pointer",
        isSelected && "outline-2 outline-fuchsia-500",
      )}
      style={style}
    >
      {children}
    </Tag>
  )
}

/** Editable text block (heading or paragraph). */
export function EditableText({
  id,
  label,
  pageKey,
  className,
  children,
  as: Tag = "p",
}: {
  id: string
  label: string
  pageKey?: string
  className?: string
  children: ReactNode
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div"
}) {
  const { config, enabled, isSelected, selectElement } = useEditable(id, "text", label, pageKey)

  const style = useMemo<CSSProperties>(() => {
    const s: CSSProperties = {}
    if (config.fontSize !== undefined) s.fontSize = `${config.fontSize}px`
    if (config.lineHeight !== undefined) s.lineHeight = String((config.lineHeight as number) / 10)
    if (config.maxWidth !== undefined) {
      s.maxWidth = `${config.maxWidth}px`
    }
    if (config.align !== undefined) s.textAlign = config.align as CSSProperties["textAlign"]
    return s
  }, [config])

  return (
    <Tag
      data-editable={id}
      data-editable-selected={isSelected ? "true" : undefined}
      onClick={enabled ? (e) => { e.stopPropagation(); selectElement(id) } : undefined}
      className={cn(
        className,
        enabled && "outline-dashed outline-1 outline-offset-2 outline-emerald-400/60 cursor-pointer",
        isSelected && "outline-2 outline-emerald-500",
      )}
      style={style}
    >
      {children}
    </Tag>
  )
}

/** Editable image. */
type EditableImageProps = Omit<ImageProps, "width" | "height" | "style"> & {
  id: string
  label: string
  pageKey?: string
  defaultWidth: number
  defaultHeight: number
  wrapperClassName?: string
  fill?: boolean
}

export function EditableImage({
  id,
  label,
  pageKey,
  defaultWidth,
  defaultHeight,
  className,
  wrapperClassName,
  alt,
  fill,
  ...rest
}: EditableImageProps) {
  const { config, enabled, isSelected, selectElement } = useEditable(id, "image", label, pageKey)

  const w = (config.width as number | undefined) ?? defaultWidth
  const h = (config.height as number | undefined) ?? defaultHeight
  const radius = (config.radius as number | undefined) ?? 16
  const fit = (config.fit as string | undefined) ?? "cover"
  const pos = (config.position as string | undefined) ?? "center"

  return (
    <span
      data-editable={id}
      data-editable-selected={isSelected ? "true" : undefined}
      onClick={enabled ? (e) => { e.stopPropagation(); selectElement(id) } : undefined}
      className={cn(
        "inline-block overflow-hidden bg-black/5",
        enabled && "outline-dashed outline-1 outline-offset-2 outline-amber-400/70 cursor-pointer",
        isSelected && "outline-2 outline-amber-500",
        wrapperClassName,
        fill && "absolute inset-0 block",
      )}
      style={fill ? { borderRadius: radius } : { width: w, height: h, borderRadius: radius }}
    >
      <Image
        {...rest}
        alt={alt}
        fill={fill}
        width={fill ? undefined : w}
        height={fill ? undefined : h}
        className={cn("h-full w-full", className)}
        style={{ objectFit: fill ? "cover" : (fit as CSSProperties["objectFit"]), objectPosition: fill ? "center" : pos }}
      />
    </span>
  )
}
