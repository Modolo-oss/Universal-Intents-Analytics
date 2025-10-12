# Universal Intents Analytics Platform - Design Guidelines

## Design Approach: Carbon Design System + Data Analytics Best Practices

**Rationale**: As a data-intensive blockchain analytics platform serving developers, researchers, and ecosystem builders, this project prioritizes clarity, efficiency, and information density over visual flourish. Carbon Design System (IBM) provides the perfect foundation for enterprise-grade data applications, enhanced with patterns from leading blockchain explorers like Etherscan and Dune Analytics.

**Core Principles**:
- Data First: Every design decision serves data comprehension
- Professional Authority: Establish trust through clean, systematic design
- Scan-friendly Hierarchy: Enable rapid information scanning
- Performance Over Decoration: Minimal animations, maximum clarity

---

## Color Palette

### Dark Mode (Primary Interface)
- **Background**: 220 15% 8% (deep charcoal)
- **Surface**: 220 15% 12% (elevated panels)
- **Surface Elevated**: 220 15% 16% (cards, modals)
- **Primary Brand**: 210 100% 55% (vibrant blue for CTAs, active states)
- **Success**: 142 76% 45% (intent success indicators)
- **Error**: 0 72% 58% (failed intents, alerts)
- **Warning**: 38 92% 50% (pending states)
- **Text Primary**: 0 0% 95%
- **Text Secondary**: 0 0% 70%
- **Border Subtle**: 220 15% 20%
- **Border**: 220 15% 25%

### Light Mode (Alternative)
- **Background**: 0 0% 98%
- **Surface**: 0 0% 100%
- **Primary Brand**: 210 100% 48%
- **Text Primary**: 220 15% 15%
- **Text Secondary**: 220 10% 45%
- **Border**: 220 15% 88%

---

## Typography

**Font Stack**: 
- Primary: 'Inter', system-ui, -apple-system, sans-serif
- Monospace: 'IBM Plex Mono', 'Courier New', monospace (for addresses, hashes, code)

**Scale**:
- **Hero Display** (Dashboard titles): 2.5rem / 600 weight / -0.02em tracking
- **Section Headings**: 1.75rem / 600 weight
- **Card Titles**: 1.125rem / 500 weight
- **Body**: 0.9375rem / 400 weight / 1.6 line-height
- **Data Labels**: 0.8125rem / 500 weight / uppercase / 0.05em tracking
- **Metric Numbers**: 2rem / 600 weight / tabular-nums

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistent rhythm
- Component padding: p-6 (cards), p-8 (sections)
- Gap spacing: gap-4 (default grids), gap-6 (dashboard sections)
- Section margins: mb-8, mb-12

**Grid System**:
- **Dashboard Layout**: 12-column responsive grid
- **Sidebar**: Fixed 256px (desktop), full-width drawer (mobile)
- **Main Content**: max-w-7xl with px-6 padding
- **Data Tables**: Full-width with horizontal scroll on mobile

**Containers**:
- Dashboard wrapper: min-h-screen with sidebar + main content flex
- Content sections: max-w-7xl mx-auto
- Metric cards: Grid of 2-4 columns (responsive)

---

## Component Library

### Navigation
- **Top Bar**: Fixed header (h-16) with logo, global search, theme toggle, wallet connection
- **Sidebar Navigation**: Vertical nav with icon + label, active state with left border accent
- **Breadcrumbs**: Small text trail for deep navigation (Intents > Details > TX Hash)

### Data Visualization
- **Metric Cards**: Elevated surface with large number, label, trend indicator (↑↓), sparkline
- **Charts**: Line charts (trends), bar charts (comparisons), donut charts (distribution) using muted colors with primary accents
- **Chart Controls**: Time range selector (24h, 7d, 30d, All), chain filter, protocol filter

### Tables
- **Intent Table**: Striped rows (subtle bg-surface on alternate), sticky header, sortable columns
- **Columns**: Intent ID (monospace, truncated), Type, Chain, Status (badge), Timestamp, Actions
- **Status Badges**: Pill-shaped with colored background (success: green, error: red, pending: yellow)
- **Pagination**: Bottom-aligned with rows per page selector

### Intent Explorer (Detail View)
- **Header Section**: Large intent ID (monospace), copy button, status badge, timestamp
- **Info Grid**: 2-column layout with label-value pairs (From, To, Solver, Amount, Gas, etc.)
- **Timeline**: Vertical stepper showing intent lifecycle events
- **Related Data**: Tabs for Parameters (JSON), Events Log, Related Intents

### Forms & Filters
- **Filter Panel**: Collapsible sidebar or dropdown with checkbox groups, date pickers, input fields
- **Search Bar**: Prominent global search (h-12) with icon, placeholder "Search by address, hash, or intent ID"
- **Date Range Picker**: Calendar dropdown with preset options

### Feedback Elements
- **Loading States**: Skeleton screens for data tables, shimmer effect for cards
- **Empty States**: Centered illustration + message + CTA for zero-data scenarios
- **Error States**: Alert banner with icon, message, retry action
- **Toast Notifications**: Bottom-right positioned, auto-dismiss, with icon indicators

---

## Animations

**Minimal Motion Strategy**:
- Hover states: 150ms ease transition on background/border only
- Page transitions: None (instant navigation)
- Data updates: Subtle fade-in (200ms) for new rows/values
- Chart animations: Single 800ms ease entry animation, no continuous motion

---

## Images

### Dashboard Hero (Optional)
- **Abstract Data Visualization**: Geometric network pattern or blockchain node visualization as subtle background (20% opacity)
- **Placement**: Top of dashboard below top bar, subtle gradient overlay
- **Alternative**: Skip hero image entirely, lead directly with metric cards

### Marketing/Landing Page (If Applicable)
- **Hero Image**: Clean, technical illustration of cross-chain intent flow or network diagram
- **Feature Sections**: Icon-based illustrations rather than photos (consistent with data platform aesthetic)
- **Background**: Subtle grid patterns or gradient meshes

### Dashboard Sections
- **No decorative images** - focus purely on data visualization (charts, graphs, tables)
- **Status Icons**: Use icon library for success/error/pending states
- **Empty State Illustrations**: Simple, line-art style illustrations for no-data scenarios

---

## Page Structure

### Main Dashboard
1. **Top Metrics Bar** (4 cards): Total Intents, Success Rate, Active Chains, Top Protocol
2. **Primary Chart Section**: Large area chart showing 30-day intent volume with chain breakdown
3. **Quick Stats Grid** (3 columns): Protocol Rankings, Chain Distribution, Solver Performance
4. **Recent Intents Table**: Last 20 intents with real-time updates

### Intent Explorer
1. **Header**: Intent ID, status, quick actions
2. **Overview Cards**: Key metrics grid (4 columns)
3. **Details Tabbed Section**: Parameters, Events, Related
4. **Timeline Visualization**: Execution steps

### Analytics Page
1. **Filter Controls**: Top bar with chain/protocol/date selectors
2. **Comparison Charts**: Side-by-side protocol performance
3. **Deep-dive Tables**: Exportable data with advanced sorting

### API Documentation
- Clean markdown-style docs with code examples
- Endpoint cards with method badges (GET, POST)
- Interactive request/response examples
- Dark code blocks with syntax highlighting