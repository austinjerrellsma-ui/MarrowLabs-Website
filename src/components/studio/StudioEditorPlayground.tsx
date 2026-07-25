'use client'

/**
 * StudioEditorPlayground — browser-safe Marrow Studio editor mock.
 *
 * Drop this single file into a React/Next website to let visitors try:
 * - Graph canvas (pan / zoom / select / connect / move nodes)
 * - Left node palette (categories + secondary node list + collapse)
 * - Right inspector (fields + collapse)
 * - Toolbar tools: Select · Pan · Connect
 *
 * Intentionally omitted: Electron IPC, save/export/build, Assist/Teach/Ask,
 * dual Build/Learn chrome, project home, auth.
 *
 * Usage:
 *   import { StudioEditorPlayground } from '@/components/StudioEditorPlayground'
 *   <StudioEditorPlayground className="h-[720px] w-full" />
 */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

type EditorMode = 'select' | 'pan' | 'connect'
type PortSide = 'input' | 'output'
type PortType = 'execution' | 'bool' | 'number' | 'vector' | 'object' | 'string' | 'any'

interface PortDef {
  id: string
  label: string
  type: PortType
  side: PortSide
}

interface FieldDef {
  key: string
  label: string
  type: 'number' | 'slider' | 'toggle' | 'text' | 'select'
  defaultValue: string | number | boolean
  min?: number
  max?: number
  step?: number
  options?: Array<{ id: string; label: string }>
}

interface NodeTemplate {
  id: string
  title: string
  category: string
  description: string
  ports: PortDef[]
  fields: FieldDef[]
}

interface GraphNode {
  id: string
  templateId: string
  title: string
  x: number
  y: number
  fields: Record<string, string | number | boolean>
}

interface GraphEdge {
  id: string
  fromNodeId: string
  fromPortId: string
  toNodeId: string
  toPortId: string
  portType: PortType
}

interface Viewport {
  x: number
  y: number
  zoom: number
}

interface PaletteCategory {
  id: string
  label: string
}

// ─── Theme ───────────────────────────────────────────────────────────────────

const T = {
  bg0: '#0d0d0d',
  bg1: '#101010',
  bg2: '#141414',
  bg3: '#1a1a1a',
  border: 'rgba(255,255,255,0.10)',
  borderSubtle: 'rgba(255,255,255,0.06)',
  text: '#e8e8e8',
  textSecondary: '#9a9a9a',
  textMuted: '#6e6e6e',
  accent: '#3b82f6',
  accentSoft: 'rgba(59,130,246,0.14)',
  nodeBg: '#15171c',
  grid: 'rgba(255,255,255,0.04)',
} as const

const PORT_COLOR: Record<PortType, string> = {
  execution: '#f5f5f5',
  bool: '#f59e0b',
  number: '#60a5fa',
  vector: '#a78bfa',
  object: '#34d399',
  string: '#f472b6',
  any: '#94a3b8',
}

const NODE_W = 196
const PORT_ROW_H = 22
const NODE_HEADER_H = 34
const PORT_R = 5

// ─── Curated catalog (demo subset) ───────────────────────────────────────────

const CATEGORIES: PaletteCategory[] = [
  { id: 'input', label: 'Input' },
  { id: 'detection', label: 'Detection' },
  { id: 'math', label: 'Math' },
  { id: 'physics', label: 'Physics' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'state', label: 'State' },
]

const CATALOG: NodeTemplate[] = [
  {
    id: 'button-pressed',
    title: 'Button Pressed',
    category: 'input',
    description: 'Fires when a controller button is pressed.',
    ports: [
      { id: 'out_exec', label: 'Pressed', type: 'execution', side: 'output' },
      { id: 'out_held', label: 'Held', type: 'execution', side: 'output' },
      { id: 'out_released', label: 'Released', type: 'execution', side: 'output' },
    ],
    fields: [
      {
        key: 'button',
        label: 'Button',
        type: 'select',
        defaultValue: 'grip',
        options: [
          { id: 'grip', label: 'Grip' },
          { id: 'trigger', label: 'Trigger' },
          { id: 'a', label: 'A / X' },
          { id: 'b', label: 'B / Y' },
        ],
      },
      { key: 'hand', label: 'Hand', type: 'select', defaultValue: 'right', options: [
        { id: 'left', label: 'Left' },
        { id: 'right', label: 'Right' },
        { id: 'either', label: 'Either' },
      ] },
    ],
  },
  {
    id: 'player-self',
    title: 'Player Self',
    category: 'detection',
    description: 'Reference to the local player rig.',
    ports: [{ id: 'out_self', label: 'Self', type: 'object', side: 'output' }],
    fields: [],
  },
  {
    id: 'raycast-hand',
    title: 'Hand Raycast',
    category: 'detection',
    description: 'Casts a ray from the hand and returns the hit target.',
    ports: [
      { id: 'in_exec', label: 'In', type: 'execution', side: 'input' },
      { id: 'out_exec', label: 'Hit', type: 'execution', side: 'output' },
      { id: 'out_miss', label: 'Miss', type: 'execution', side: 'output' },
      { id: 'out_target', label: 'Target', type: 'object', side: 'output' },
      { id: 'out_point', label: 'Point', type: 'vector', side: 'output' },
    ],
    fields: [
      { key: 'maxDistance', label: 'Max Distance', type: 'slider', defaultValue: 8, min: 0.5, max: 30, step: 0.5 },
      { key: 'grabbablesOnly', label: 'Grabbables Only', type: 'toggle', defaultValue: true },
    ],
  },
  {
    id: 'vector-constant',
    title: 'Vector Constant',
    category: 'math',
    description: 'A constant 3D vector value.',
    ports: [{ id: 'out_vector', label: 'Value', type: 'vector', side: 'output' }],
    fields: [
      { key: 'x', label: 'X', type: 'number', defaultValue: 0, step: 0.1 },
      { key: 'y', label: 'Y', type: 'number', defaultValue: 1, step: 0.1 },
      { key: 'z', label: 'Z', type: 'number', defaultValue: 0, step: 0.1 },
    ],
  },
  {
    id: 'number-constant',
    title: 'Number Constant',
    category: 'math',
    description: 'A constant number value.',
    ports: [{ id: 'out_number', label: 'Value', type: 'number', side: 'output' }],
    fields: [
      { key: 'value', label: 'Value', type: 'number', defaultValue: 12, step: 0.5 },
    ],
  },
  {
    id: 'multiply',
    title: 'Multiply',
    category: 'math',
    description: 'Multiplies two numbers.',
    ports: [
      { id: 'in_a', label: 'A', type: 'number', side: 'input' },
      { id: 'in_b', label: 'B', type: 'number', side: 'input' },
      { id: 'out_result', label: 'Result', type: 'number', side: 'output' },
    ],
    fields: [],
  },
  {
    id: 'apply-force',
    title: 'Apply Force',
    category: 'physics',
    description: 'Applies a force impulse to a rigidbody target.',
    ports: [
      { id: 'in_exec', label: 'In', type: 'execution', side: 'input' },
      { id: 'out_exec', label: 'Then', type: 'execution', side: 'output' },
      { id: 'in_target', label: 'Target', type: 'object', side: 'input' },
      { id: 'in_direction', label: 'Direction', type: 'vector', side: 'input' },
      { id: 'in_strength', label: 'Strength', type: 'number', side: 'input' },
    ],
    fields: [
      { key: 'mode', label: 'Mode', type: 'select', defaultValue: 'impulse', options: [
        { id: 'impulse', label: 'Impulse' },
        { id: 'force', label: 'Continuous' },
      ] },
      { key: 'strength', label: 'Strength', type: 'slider', defaultValue: 12, min: 0, max: 80, step: 1 },
    ],
  },
  {
    id: 'hold-object',
    title: 'Hold Object',
    category: 'physics',
    description: 'Keeps a grabbed object following the hand while held.',
    ports: [
      { id: 'in_start', label: 'Start', type: 'execution', side: 'input' },
      { id: 'in_tick', label: 'Tick', type: 'execution', side: 'input' },
      { id: 'in_release', label: 'Release', type: 'execution', side: 'input' },
      { id: 'out_exec', label: 'Then', type: 'execution', side: 'output' },
      { id: 'in_target', label: 'Target', type: 'object', side: 'input' },
    ],
    fields: [
      { key: 'followStrength', label: 'Follow Strength', type: 'slider', defaultValue: 28, min: 1, max: 80, step: 1 },
      { key: 'rotateWithHand', label: 'Rotate With Hand', type: 'toggle', defaultValue: true },
    ],
  },
  {
    id: 'haptic-pulse',
    title: 'Haptic Pulse',
    category: 'feedback',
    description: 'Triggers a short controller haptic pulse.',
    ports: [
      { id: 'in_exec', label: 'In', type: 'execution', side: 'input' },
      { id: 'out_exec', label: 'Then', type: 'execution', side: 'output' },
    ],
    fields: [
      { key: 'intensity', label: 'Intensity', type: 'slider', defaultValue: 0.55, min: 0, max: 1, step: 0.05 },
      { key: 'durationMs', label: 'Duration (ms)', type: 'number', defaultValue: 40, min: 10, max: 400, step: 5 },
    ],
  },
  {
    id: 'set-bool',
    title: 'Set Bool',
    category: 'state',
    description: 'Stores a boolean flag for later branches.',
    ports: [
      { id: 'in_exec', label: 'In', type: 'execution', side: 'input' },
      { id: 'out_exec', label: 'Then', type: 'execution', side: 'output' },
      { id: 'out_value', label: 'Value', type: 'bool', side: 'output' },
    ],
    fields: [
      { key: 'key', label: 'Key', type: 'text', defaultValue: 'isHolding' },
      { key: 'value', label: 'Value', type: 'toggle', defaultValue: true },
    ],
  },
]

const CATALOG_BY_ID = new Map(CATALOG.map((t) => [t.id, t]))

// ─── Helpers ─────────────────────────────────────────────────────────────────

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}

function templateDefaults(template: NodeTemplate): Record<string, string | number | boolean> {
  const fields: Record<string, string | number | boolean> = {}
  for (const field of template.fields) fields[field.key] = field.defaultValue
  return fields
}

function createNode(templateId: string, x: number, y: number): GraphNode | null {
  const template = CATALOG_BY_ID.get(templateId)
  if (!template) return null
  return {
    id: uid('n'),
    templateId: template.id,
    title: template.title,
    x,
    y,
    fields: templateDefaults(template),
  }
}

function nodeHeight(template: NodeTemplate) {
  const rows = Math.max(
    template.ports.filter((p) => p.side === 'input').length,
    template.ports.filter((p) => p.side === 'output').length,
    1,
  )
  return NODE_HEADER_H + rows * PORT_ROW_H + 10
}

function portWorldPos(node: GraphNode, port: PortDef, template: NodeTemplate) {
  const inputs = template.ports.filter((p) => p.side === 'input')
  const outputs = template.ports.filter((p) => p.side === 'output')
  const list = port.side === 'input' ? inputs : outputs
  const index = list.findIndex((p) => p.id === port.id)
  const y = node.y + NODE_HEADER_H + 12 + index * PORT_ROW_H
  const x = port.side === 'input' ? node.x : node.x + NODE_W
  return { x, y }
}

function canConnect(from: PortDef, to: PortDef) {
  if (from.side !== 'output' || to.side !== 'input') return false
  if (from.type === 'any' || to.type === 'any') return true
  return from.type === to.type
}

function bezierPath(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.max(40, Math.abs(x2 - x1) * 0.5)
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
}

function screenToWorld(clientX: number, clientY: number, rect: DOMRect, viewport: Viewport) {
  return {
    x: (clientX - rect.left - viewport.x) / viewport.zoom,
    y: (clientY - rect.top - viewport.y) / viewport.zoom,
  }
}

function createSeedGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const trigger = createNode('button-pressed', -220, -40)!
  const ray = createNode('raycast-hand', 40, -80)!
  const force = createNode('apply-force', 320, -40)!
  const strength = createNode('number-constant', 40, 120)!
  const dir = createNode('vector-constant', 40, 240)!
  strength.fields.value = 14
  dir.fields.y = 0.2
  dir.fields.z = 1

  const edges: GraphEdge[] = [
    {
      id: uid('e'),
      fromNodeId: trigger.id,
      fromPortId: 'out_exec',
      toNodeId: ray.id,
      toPortId: 'in_exec',
      portType: 'execution',
    },
    {
      id: uid('e'),
      fromNodeId: ray.id,
      fromPortId: 'out_exec',
      toNodeId: force.id,
      toPortId: 'in_exec',
      portType: 'execution',
    },
    {
      id: uid('e'),
      fromNodeId: ray.id,
      fromPortId: 'out_target',
      toNodeId: force.id,
      toPortId: 'in_target',
      portType: 'object',
    },
    {
      id: uid('e'),
      fromNodeId: strength.id,
      fromPortId: 'out_number',
      toNodeId: force.id,
      toPortId: 'in_strength',
      portType: 'number',
    },
    {
      id: uid('e'),
      fromNodeId: dir.id,
      fromPortId: 'out_vector',
      toNodeId: force.id,
      toPortId: 'in_direction',
      portType: 'vector',
    },
  ]

  return { nodes: [trigger, ray, force, strength, dir], edges }
}

// ─── Icons (inline so this file has no icon package hard-dep) ────────────────

function Icon({ d, size = 14 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  )
}

const ICONS = {
  select: 'M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z',
  pan: 'M18 11V6a2 2 0 0 0-4 0v1M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15',
  connect: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  chevron: 'M9 18l6-6-6-6',
  search: 'M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z',
  panelLeft: 'M3 4h18v16H3zM9 4v16',
  panelRight: 'M3 4h18v16H3zM15 4v16',
}

// ─── Toolbar ─────────────────────────────────────────────────────────────────

function PlaygroundToolbar({
  mode,
  onModeChange,
  onFit,
  onReset,
}: {
  mode: EditorMode
  onModeChange: (mode: EditorMode) => void
  onFit: () => void
  onReset: () => void
}) {
  const items: Array<{ id: EditorMode; label: string; icon: string }> = [
    { id: 'select', label: 'Select', icon: ICONS.select },
    { id: 'pan', label: 'Pan', icon: ICONS.pan },
    { id: 'connect', label: 'Connect', icon: ICONS.connect },
  ]

  return (
    <div
      style={{
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        borderBottom: `1px solid ${T.border}`,
        background: T.bg1,
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: T.textMuted, textTransform: 'uppercase' }}>
          Mode
        </span>
        <div style={{ display: 'flex', overflow: 'hidden', borderRadius: 6, border: `1px solid ${T.border}`, background: 'rgba(255,255,255,0.03)' }}>
          {items.map((item, index) => {
            const active = mode === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onModeChange(item.id)}
                aria-pressed={active}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 10px',
                  fontSize: 11,
                  fontWeight: 600,
                  border: 'none',
                  borderRight: index < items.length - 1 ? `1px solid ${T.border}` : 'none',
                  cursor: 'pointer',
                  background: active ? 'rgba(255,255,255,0.10)' : 'transparent',
                  color: active ? T.text : T.textSecondary,
                }}
              >
                <Icon d={item.icon} size={12} />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, color: T.textMuted }}>Playground · not saved</span>
        <button type="button" onClick={onFit} style={ghostBtnStyle}>Fit</button>
        <button type="button" onClick={onReset} style={ghostBtnStyle}>Reset demo</button>
      </div>
    </div>
  )
}

const ghostBtnStyle: CSSProperties = {
  height: 28,
  padding: '0 10px',
  borderRadius: 6,
  border: `1px solid ${T.border}`,
  background: 'transparent',
  color: T.textSecondary,
  fontSize: 11,
  fontWeight: 600,
  cursor: 'pointer',
}

// ─── Palette ─────────────────────────────────────────────────────────────────

function NodePalette({
  collapsed,
  onToggle,
  width,
  onWidthChange,
  onAddTemplate,
}: {
  collapsed: boolean
  onToggle: () => void
  width: number
  onWidthChange: (width: number) => void
  onAddTemplate: (templateId: string) => void
}) {
  const [categoryId, setCategoryId] = useState(CATEGORIES[0]!.id)
  const [query, setQuery] = useState('')
  const [nodesCollapsed, setNodesCollapsed] = useState(false)
  const resizing = useRef(false)

  const nodes = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CATALOG.filter((template) => {
      if (q) {
        return (
          template.title.toLowerCase().includes(q)
          || template.description.toLowerCase().includes(q)
          || template.id.includes(q)
        )
      }
      return template.category === categoryId
    })
  }, [categoryId, query])

  const onResizePointerDown = (event: ReactPointerEvent) => {
    event.preventDefault()
    resizing.current = true
    const startX = event.clientX
    const startW = width
    const onMove = (e: PointerEvent) => {
      if (!resizing.current) return
      onWidthChange(Math.min(420, Math.max(220, startW + (e.clientX - startX))))
    }
    const onUp = () => {
      resizing.current = false
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  if (collapsed) {
    return (
      <div style={{ width: 36, flexShrink: 0, borderRight: `1px solid ${T.border}`, background: T.bg1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, gap: 8 }}>
        <button type="button" onClick={onToggle} title="Expand palette" style={iconRailBtn}>
          <Icon d={ICONS.panelLeft} size={14} />
        </button>
        <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: T.textMuted, textTransform: 'uppercase', marginTop: 8 }}>
          Nodes
        </div>
      </div>
    )
  }

  return (
    <div style={{ width, flexShrink: 0, borderRight: `1px solid ${T.border}`, background: T.bg1, display: 'flex', position: 'relative' }}>
      {/* Categories */}
      <div style={{ width: 118, borderRight: `1px solid ${T.borderSubtle}`, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 8px', borderBottom: `1px solid ${T.borderSubtle}` }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: T.textMuted, textTransform: 'uppercase' }}>Palette</span>
          <button type="button" onClick={onToggle} title="Collapse palette" style={iconRailBtn}>
            <Icon d={ICONS.chevron} size={12} />
          </button>
        </div>
        <div style={{ padding: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderRadius: 6, border: `1px solid ${T.border}`, background: T.bg0, padding: '5px 8px', marginBottom: 8 }}>
            <Icon d={ICONS.search} size={12} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', color: T.text, fontSize: 11 }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {CATEGORIES.map((category) => {
              const active = !query && category.id === categoryId
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setCategoryId(category.id)
                    setNodesCollapsed(false)
                  }}
                  style={{
                    textAlign: 'left',
                    border: 'none',
                    borderRadius: 6,
                    padding: '7px 8px',
                    fontSize: 11,
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                    background: active ? T.accentSoft : 'transparent',
                    color: active ? '#93c5fd' : T.textSecondary,
                  }}
                >
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Secondary node list */}
      {!nodesCollapsed && (
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 10px 8px', borderBottom: `1px solid ${T.borderSubtle}` }}>
            <span style={{ fontSize: 11, fontWeight: 650, color: T.text }}>
              {query ? 'Results' : CATEGORIES.find((c) => c.id === categoryId)?.label}
            </span>
            <button type="button" onClick={() => setNodesCollapsed(true)} title="Hide node list" style={iconRailBtn}>
              <Icon d={ICONS.chevron} size={12} />
            </button>
          </div>
          <div style={{ overflow: 'auto', padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {nodes.length === 0 && (
              <p style={{ fontSize: 11, color: T.textMuted, padding: 8 }}>No nodes match.</p>
            )}
            {nodes.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => onAddTemplate(template.id)}
                style={{
                  textAlign: 'left',
                  borderRadius: 8,
                  border: `1px solid ${T.borderSubtle}`,
                  background: T.bg2,
                  padding: '8px 10px',
                  cursor: 'pointer',
                  color: T.text,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 650 }}>{template.title}</div>
                <div style={{ fontSize: 10, color: T.textMuted, marginTop: 3, lineHeight: 1.35 }}>
                  {template.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {nodesCollapsed && (
        <button
          type="button"
          onClick={() => setNodesCollapsed(false)}
          title="Show node list"
          style={{
            width: 28,
            border: 'none',
            borderLeft: `1px solid ${T.borderSubtle}`,
            background: T.bg2,
            color: T.textSecondary,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon d={ICONS.chevron} size={12} />
        </button>
      )}

      <div
        onPointerDown={onResizePointerDown}
        style={{
          position: 'absolute',
          top: 0,
          right: -3,
          width: 6,
          height: '100%',
          cursor: 'col-resize',
          zIndex: 2,
        }}
      />
    </div>
  )
}

const iconRailBtn: CSSProperties = {
  width: 26,
  height: 26,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  border: `1px solid ${T.borderSubtle}`,
  background: 'transparent',
  color: T.textSecondary,
  cursor: 'pointer',
}

// ─── Inspector ───────────────────────────────────────────────────────────────

function Inspector({
  collapsed,
  onToggle,
  width,
  onWidthChange,
  node,
  template,
  onFieldChange,
}: {
  collapsed: boolean
  onToggle: () => void
  width: number
  onWidthChange: (width: number) => void
  node: GraphNode | null
  template: NodeTemplate | null
  onFieldChange: (key: string, value: string | number | boolean) => void
}) {
  const resizing = useRef(false)

  const onResizePointerDown = (event: ReactPointerEvent) => {
    event.preventDefault()
    resizing.current = true
    const startX = event.clientX
    const startW = width
    const onMove = (e: PointerEvent) => {
      if (!resizing.current) return
      onWidthChange(Math.min(420, Math.max(220, startW - (e.clientX - startX))))
    }
    const onUp = () => {
      resizing.current = false
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  if (collapsed) {
    return (
      <div style={{ width: 36, flexShrink: 0, borderLeft: `1px solid ${T.border}`, background: T.bg1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8 }}>
        <button type="button" onClick={onToggle} title="Expand inspector" style={iconRailBtn}>
          <Icon d={ICONS.panelRight} size={14} />
        </button>
        <div style={{ writingMode: 'vertical-rl', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: T.textMuted, textTransform: 'uppercase', marginTop: 10 }}>
          Inspector
        </div>
      </div>
    )
  }

  return (
    <div style={{ width, flexShrink: 0, borderLeft: `1px solid ${T.border}`, background: T.bg1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderBottom: `1px solid ${T.borderSubtle}` }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: T.textMuted, textTransform: 'uppercase' }}>Inspector</span>
        <button type="button" onClick={onToggle} title="Collapse inspector" style={iconRailBtn}>
          <Icon d={ICONS.chevron} size={12} />
        </button>
      </div>

      <div style={{ overflow: 'auto', padding: 12, flex: 1 }}>
        {!node || !template ? (
          <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.5, paddingTop: 8 }}>
            Select a node to inspect its parameters, ports, and details.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{node.title}</div>
              <div style={{ fontSize: 10, color: T.textMuted, marginTop: 3, fontFamily: 'ui-monospace, monospace' }}>{template.id}</div>
              <p style={{ fontSize: 11, color: T.textSecondary, marginTop: 8, lineHeight: 1.45 }}>{template.description}</p>
            </div>

            <section>
              <h4 style={sectionLabel}>Parameters</h4>
              {template.fields.length === 0 ? (
                <p style={{ fontSize: 11, color: T.textMuted }}>No tunable fields on this node.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {template.fields.map((field) => {
                    const value = node.fields[field.key] ?? field.defaultValue
                    return (
                      <label key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <span style={{ fontSize: 11, color: T.textSecondary, fontWeight: 600 }}>{field.label}</span>
                        {field.type === 'toggle' ? (
                          <button
                            type="button"
                            onClick={() => onFieldChange(field.key, !Boolean(value))}
                            style={{
                              alignSelf: 'flex-start',
                              height: 28,
                              padding: '0 10px',
                              borderRadius: 6,
                              border: `1px solid ${T.border}`,
                              background: value ? T.accentSoft : T.bg2,
                              color: value ? '#93c5fd' : T.textSecondary,
                              fontSize: 11,
                              fontWeight: 650,
                              cursor: 'pointer',
                            }}
                          >
                            {value ? 'On' : 'Off'}
                          </button>
                        ) : field.type === 'select' ? (
                          <select
                            value={String(value)}
                            onChange={(e) => onFieldChange(field.key, e.target.value)}
                            style={fieldControlStyle}
                          >
                            {(field.options ?? []).map((option) => (
                              <option key={option.id} value={option.id}>{option.label}</option>
                            ))}
                          </select>
                        ) : field.type === 'slider' ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input
                              type="range"
                              min={field.min}
                              max={field.max}
                              step={field.step ?? 1}
                              value={Number(value)}
                              onChange={(e) => onFieldChange(field.key, Number(e.target.value))}
                              style={{ flex: 1 }}
                            />
                            <span style={{ width: 36, textAlign: 'right', fontSize: 11, color: T.text, fontVariantNumeric: 'tabular-nums' }}>
                              {Number(value)}
                            </span>
                          </div>
                        ) : (
                          <input
                            type={field.type === 'number' ? 'number' : 'text'}
                            value={String(value)}
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            onChange={(e) => {
                              if (field.type === 'number') {
                                const next = e.target.valueAsNumber
                                if (Number.isFinite(next)) onFieldChange(field.key, next)
                                return
                              }
                              onFieldChange(field.key, e.target.value)
                            }}
                            style={fieldControlStyle}
                          />
                        )}
                      </label>
                    )
                  })}
                </div>
              )}
            </section>

            <section>
              <h4 style={sectionLabel}>Ports</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {template.ports.map((port) => (
                  <div key={port.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: T.textSecondary }}>
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: PORT_COLOR[port.type], boxShadow: `0 0 0 1px ${T.border}` }} />
                    <span style={{ width: 42, color: T.textMuted }}>{port.side === 'input' ? 'In' : 'Out'}</span>
                    <span style={{ color: T.text }}>{port.label}</span>
                    <span style={{ marginLeft: 'auto', color: T.textMuted }}>{port.type}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      <div
        onPointerDown={onResizePointerDown}
        style={{
          position: 'absolute',
          top: 0,
          left: -3,
          width: 6,
          height: '100%',
          cursor: 'col-resize',
          zIndex: 2,
        }}
      />
    </div>
  )
}

const sectionLabel: CSSProperties = {
  margin: '0 0 8px',
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: T.textMuted,
}

const fieldControlStyle: CSSProperties = {
  height: 30,
  borderRadius: 6,
  border: `1px solid ${T.border}`,
  background: T.bg0,
  color: T.text,
  fontSize: 12,
  padding: '0 8px',
  outline: 'none',
}

// ─── Graph canvas ────────────────────────────────────────────────────────────

function GraphCanvasView({
  mode,
  nodes,
  edges,
  selectedNodeId,
  selectedEdgeId,
  viewport,
  onViewportChange,
  onSelectNode,
  onSelectEdge,
  onMoveNode,
  onConnect,
  fitToken,
}: {
  mode: EditorMode
  nodes: GraphNode[]
  edges: GraphEdge[]
  selectedNodeId: string | null
  selectedEdgeId: string | null
  viewport: Viewport
  onViewportChange: (viewport: Viewport) => void
  onSelectNode: (id: string | null) => void
  onSelectEdge: (id: string | null) => void
  onMoveNode: (id: string, x: number, y: number) => void
  onConnect: (fromNodeId: string, fromPortId: string, toNodeId: string, toPortId: string) => void
  fitToken: number
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [dragNode, setDragNode] = useState<{ id: string; ox: number; oy: number } | null>(null)
  const [panning, setPanning] = useState<{ x: number; y: number; vx: number; vy: number } | null>(null)
  const [wire, setWire] = useState<{
    fromNodeId: string
    fromPortId: string
    x: number
    y: number
    curX: number
    curY: number
  } | null>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el || nodes.length === 0) return
    const rect = el.getBoundingClientRect()
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    for (const node of nodes) {
      const template = CATALOG_BY_ID.get(node.templateId)
      if (!template) continue
      const h = nodeHeight(template)
      minX = Math.min(minX, node.x)
      minY = Math.min(minY, node.y)
      maxX = Math.max(maxX, node.x + NODE_W)
      maxY = Math.max(maxY, node.y + h)
    }
    const gw = maxX - minX
    const gh = maxY - minY
    const zoom = Math.min(1.15, Math.max(0.55, Math.min((rect.width - 80) / gw, (rect.height - 80) / gh)))
    onViewportChange({
      zoom,
      x: rect.width / 2 - ((minX + maxX) / 2) * zoom,
      y: rect.height / 2 - ((minY + maxY) / 2) * zoom,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitToken])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      const rect = el.getBoundingClientRect()
      const mx = event.clientX - rect.left
      const my = event.clientY - rect.top
      const factor = event.deltaY > 0 ? 0.92 : 1.08
      onViewportChange({
        zoom: Math.min(2.2, Math.max(0.35, viewport.zoom * factor)),
        x: mx - (mx - viewport.x) * factor,
        y: my - (my - viewport.y) * factor,
      })
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [onViewportChange, viewport])

  const nodesById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes])

  const resolvePort = (nodeId: string, portId: string) => {
    const node = nodesById.get(nodeId)
    if (!node) return null
    const template = CATALOG_BY_ID.get(node.templateId)
    if (!template) return null
    const port = template.ports.find((p) => p.id === portId)
    if (!port) return null
    return { node, template, port, pos: portWorldPos(node, port, template) }
  }

  const onBackgroundPointerDown = (event: ReactPointerEvent) => {
    if (mode === 'pan' || event.altKey || event.button === 1) {
      setPanning({ x: event.clientX, y: event.clientY, vx: viewport.x, vy: viewport.y })
      onSelectNode(null)
      onSelectEdge(null)
      return
    }
    if (event.button !== 0) return
    if (mode === 'select') {
      onSelectNode(null)
      onSelectEdge(null)
    }
  }

  const onPointerMove = (event: ReactPointerEvent) => {
    const el = rootRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()

    if (panning) {
      onViewportChange({
        ...viewport,
        x: panning.vx + (event.clientX - panning.x),
        y: panning.vy + (event.clientY - panning.y),
      })
      return
    }

    if (dragNode && mode === 'select') {
      const world = screenToWorld(event.clientX, event.clientY, rect, viewport)
      onMoveNode(dragNode.id, world.x - dragNode.ox, world.y - dragNode.oy)
      return
    }

    if (wire) {
      const world = screenToWorld(event.clientX, event.clientY, rect, viewport)
      setWire({ ...wire, curX: world.x, curY: world.y })
    }
  }

  const onPointerUp = () => {
    setPanning(null)
    setDragNode(null)
    setWire(null)
  }

  return (
    <div
      ref={rootRef}
      onPointerDown={onBackgroundPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{
        flex: 1,
        minWidth: 0,
        position: 'relative',
        overflow: 'hidden',
        background: T.bg0,
        cursor: mode === 'pan' || panning ? 'grab' : mode === 'connect' ? 'crosshair' : 'default',
        touchAction: 'none',
      }}
    >
      {/* Grid */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <pattern
            id="ms-playground-grid"
            width={24 * viewport.zoom}
            height={24 * viewport.zoom}
            patternUnits="userSpaceOnUse"
            x={viewport.x % (24 * viewport.zoom)}
            y={viewport.y % (24 * viewport.zoom)}
          >
            <path d={`M ${24 * viewport.zoom} 0 L 0 0 0 ${24 * viewport.zoom}`} fill="none" stroke={T.grid} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ms-playground-grid)" />
      </svg>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
          transformOrigin: '0 0',
          willChange: 'transform',
        }}
      >
        {/* Edges */}
        <svg
          style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'auto' }}
          width={4000}
          height={4000}
        >
          {edges.map((edge) => {
            const from = resolvePort(edge.fromNodeId, edge.fromPortId)
            const to = resolvePort(edge.toNodeId, edge.toPortId)
            if (!from || !to) return null
            const selected = selectedEdgeId === edge.id
            return (
              <path
                key={edge.id}
                d={bezierPath(from.pos.x, from.pos.y, to.pos.x, to.pos.y)}
                fill="none"
                stroke={PORT_COLOR[edge.portType]}
                strokeWidth={selected ? 2.6 : 1.8}
                strokeOpacity={selected ? 1 : 0.85}
                style={{ pointerEvents: 'stroke', cursor: 'pointer' }}
                onPointerDown={(event) => {
                  event.stopPropagation()
                  onSelectEdge(edge.id)
                  onSelectNode(null)
                }}
              />
            )
          })}
          {wire && (
            <path
              d={bezierPath(wire.x, wire.y, wire.curX, wire.curY)}
              fill="none"
              stroke="#93c5fd"
              strokeWidth={1.8}
              strokeDasharray="6 4"
              style={{ pointerEvents: 'none' }}
            />
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const template = CATALOG_BY_ID.get(node.templateId)
          if (!template) return null
          const selected = selectedNodeId === node.id
          const h = nodeHeight(template)
          const inputs = template.ports.filter((p) => p.side === 'input')
          const outputs = template.ports.filter((p) => p.side === 'output')

          return (
            <div
              key={node.id}
              onPointerDown={(event) => {
                event.stopPropagation()
                onSelectNode(node.id)
                onSelectEdge(null)
                if (mode !== 'select') return
                const el = rootRef.current
                if (!el) return
                const rect = el.getBoundingClientRect()
                const world = screenToWorld(event.clientX, event.clientY, rect, viewport)
                setDragNode({ id: node.id, ox: world.x - node.x, oy: world.y - node.y })
              }}
              style={{
                position: 'absolute',
                left: node.x,
                top: node.y,
                width: NODE_W,
                height: h,
                borderRadius: 10,
                border: `1px solid ${selected ? T.accent : T.border}`,
                boxShadow: selected ? `0 0 0 1px ${T.accent}` : '0 8px 24px rgba(0,0,0,0.35)',
                background: T.nodeBg,
                color: T.text,
                userSelect: 'none',
              }}
            >
              <div style={{ height: NODE_HEADER_H, padding: '0 10px', display: 'flex', alignItems: 'center', borderBottom: `1px solid ${T.borderSubtle}` }}>
                <span style={{ fontSize: 12, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {node.title}
                </span>
              </div>

              <div style={{ position: 'relative', height: h - NODE_HEADER_H }}>
                {inputs.map((port, index) => (
                  <PortRow
                    key={port.id}
                    port={port}
                    top={8 + index * PORT_ROW_H}
                    align="left"
                    connectMode={mode === 'connect'}
                    onPortPointerDown={(event) => {
                      event.stopPropagation()
                      if (mode !== 'connect') return
                      // Inputs don't start wires; they receive them.
                    }}
                    onPortPointerUp={(event) => {
                      event.stopPropagation()
                      if (!wire || mode !== 'connect') return
                      onConnect(wire.fromNodeId, wire.fromPortId, node.id, port.id)
                      setWire(null)
                    }}
                  />
                ))}
                {outputs.map((port, index) => (
                  <PortRow
                    key={port.id}
                    port={port}
                    top={8 + index * PORT_ROW_H}
                    align="right"
                    connectMode={mode === 'connect'}
                    onPortPointerDown={(event) => {
                      event.stopPropagation()
                      if (mode !== 'connect') return
                      const pos = portWorldPos(node, port, template)
                      setWire({
                        fromNodeId: node.id,
                        fromPortId: port.id,
                        x: pos.x,
                        y: pos.y,
                        curX: pos.x,
                        curY: pos.y,
                      })
                    }}
                    onPortPointerUp={() => undefined}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 12,
          bottom: 12,
          fontSize: 10,
          color: T.textMuted,
          background: 'rgba(0,0,0,0.45)',
          border: `1px solid ${T.borderSubtle}`,
          borderRadius: 999,
          padding: '4px 10px',
          pointerEvents: 'none',
        }}
      >
        Scroll to zoom · {mode === 'pan' ? 'Drag to pan' : mode === 'connect' ? 'Drag output → input' : 'Drag nodes to move'}
      </div>
    </div>
  )
}

function PortRow({
  port,
  top,
  align,
  connectMode,
  onPortPointerDown,
  onPortPointerUp,
}: {
  port: PortDef
  top: number
  align: 'left' | 'right'
  connectMode: boolean
  onPortPointerDown: (event: ReactPointerEvent) => void
  onPortPointerUp: (event: ReactPointerEvent) => void
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: align === 'left' ? 0 : undefined,
        right: align === 'right' ? 0 : undefined,
        height: PORT_ROW_H,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: align === 'left' ? '0 10px 0 12px' : '0 12px 0 10px',
        flexDirection: align === 'left' ? 'row' : 'row-reverse',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <button
        type="button"
        onPointerDown={onPortPointerDown}
        onPointerUp={onPortPointerUp}
        title={`${port.label} (${port.type})`}
        style={{
          width: PORT_R * 2,
          height: PORT_R * 2,
          borderRadius: 999,
          border: `1.5px solid ${PORT_COLOR[port.type]}`,
          background: port.type === 'execution' ? PORT_COLOR[port.type] : T.nodeBg,
          padding: 0,
          cursor: connectMode ? 'crosshair' : 'pointer',
          flexShrink: 0,
          marginLeft: align === 'left' ? -16 : 0,
          marginRight: align === 'right' ? -16 : 0,
        }}
      />
      <span style={{ fontSize: 10, color: T.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {port.label}
      </span>
    </div>
  )
}

// ─── Main playground ─────────────────────────────────────────────────────────

export function StudioEditorPlayground({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  const seed = useMemo(() => createSeedGraph(), [])
  const [nodes, setNodes] = useState<GraphNode[]>(seed.nodes)
  const [edges, setEdges] = useState<GraphEdge[]>(seed.edges)
  const [mode, setMode] = useState<EditorMode>('select')
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(seed.nodes[2]?.id ?? null)
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null)
  const [viewport, setViewport] = useState<Viewport>({ x: 420, y: 220, zoom: 0.95 })
  const [fitToken, setFitToken] = useState(0)

  const [paletteCollapsed, setPaletteCollapsed] = useState(false)
  const [inspectorCollapsed, setInspectorCollapsed] = useState(false)
  const [paletteWidth, setPaletteWidth] = useState(300)
  const [inspectorWidth, setInspectorWidth] = useState(280)

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null
  const selectedTemplate = selectedNode ? CATALOG_BY_ID.get(selectedNode.templateId) ?? null : null

  const addTemplate = useCallback((templateId: string) => {
    const worldX = (200 - viewport.x) / viewport.zoom
    const worldY = (160 - viewport.y) / viewport.zoom
    const node = createNode(templateId, worldX + nodes.length * 8, worldY + nodes.length * 8)
    if (!node) return
    setNodes((prev) => [...prev, node])
    setSelectedNodeId(node.id)
    setSelectedEdgeId(null)
    setMode('select')
  }, [nodes.length, viewport])

  const moveNode = useCallback((id: string, x: number, y: number) => {
    setNodes((prev) => prev.map((node) => (node.id === id ? { ...node, x, y } : node)))
  }, [])

  const connect = useCallback((fromNodeId: string, fromPortId: string, toNodeId: string, toPortId: string) => {
    if (fromNodeId === toNodeId) return
    const fromNode = nodes.find((n) => n.id === fromNodeId)
    const toNode = nodes.find((n) => n.id === toNodeId)
    if (!fromNode || !toNode) return
    const fromTemplate = CATALOG_BY_ID.get(fromNode.templateId)
    const toTemplate = CATALOG_BY_ID.get(toNode.templateId)
    if (!fromTemplate || !toTemplate) return
    const fromPort = fromTemplate.ports.find((p) => p.id === fromPortId)
    const toPort = toTemplate.ports.find((p) => p.id === toPortId)
    if (!fromPort || !toPort || !canConnect(fromPort, toPort)) return

    setEdges((prev) => {
      const withoutTarget = prev.filter((edge) => !(edge.toNodeId === toNodeId && edge.toPortId === toPortId))
      return [
        ...withoutTarget,
        {
          id: uid('e'),
          fromNodeId,
          fromPortId,
          toNodeId,
          toPortId,
          portType: fromPort.type,
        },
      ]
    })
  }, [nodes])

  const setField = useCallback((key: string, value: string | number | boolean) => {
    if (!selectedNodeId) return
    setNodes((prev) => prev.map((node) => (
      node.id === selectedNodeId
        ? { ...node, fields: { ...node.fields, [key]: value } }
        : node
    )))
  }, [selectedNodeId])

  const resetDemo = () => {
    const next = createSeedGraph()
    setNodes(next.nodes)
    setEdges(next.edges)
    setSelectedNodeId(next.nodes[2]?.id ?? null)
    setSelectedEdgeId(null)
    setMode('select')
    setFitToken((n) => n + 1)
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.target instanceof HTMLElement) {
        const tag = event.target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || event.target.isContentEditable) return
      }
      if (event.key === 'v' || event.key === 'V') setMode('select')
      if (event.key === 'h' || event.key === 'H') setMode('pan')
      if (event.key === 'c' || event.key === 'C') setMode('connect')
      if (event.key === 'Delete' || event.key === 'Backspace') {
        if (selectedEdgeId) {
          setEdges((prev) => prev.filter((edge) => edge.id !== selectedEdgeId))
          setSelectedEdgeId(null)
          return
        }
        if (selectedNodeId) {
          setNodes((prev) => prev.filter((node) => node.id !== selectedNodeId))
          setEdges((prev) => prev.filter((edge) => edge.fromNodeId !== selectedNodeId && edge.toNodeId !== selectedNodeId))
          setSelectedNodeId(null)
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedEdgeId, selectedNodeId])

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minHeight: 560,
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${T.border}`,
        background: T.bg0,
        color: T.text,
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        ...style,
      }}
    >
      <PlaygroundToolbar
        mode={mode}
        onModeChange={setMode}
        onFit={() => setFitToken((n) => n + 1)}
        onReset={resetDemo}
      />

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <NodePalette
          collapsed={paletteCollapsed}
          onToggle={() => setPaletteCollapsed((v) => !v)}
          width={paletteWidth}
          onWidthChange={setPaletteWidth}
          onAddTemplate={addTemplate}
        />

        <GraphCanvasView
          mode={mode}
          nodes={nodes}
          edges={edges}
          selectedNodeId={selectedNodeId}
          selectedEdgeId={selectedEdgeId}
          viewport={viewport}
          onViewportChange={setViewport}
          onSelectNode={setSelectedNodeId}
          onSelectEdge={setSelectedEdgeId}
          onMoveNode={moveNode}
          onConnect={connect}
          fitToken={fitToken}
        />

        <Inspector
          collapsed={inspectorCollapsed}
          onToggle={() => setInspectorCollapsed((v) => !v)}
          width={inspectorWidth}
          onWidthChange={setInspectorWidth}
          node={selectedNode}
          template={selectedTemplate}
          onFieldChange={setField}
        />
      </div>
    </div>
  )
}

export default StudioEditorPlayground
