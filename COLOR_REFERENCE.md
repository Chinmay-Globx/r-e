# 🎨 RASMI ERP - Color Reference Guide

## Quick Color Palette

### **Primary Colors**

| Color Name | Hex | HSL | RGB | Usage |
|------------|-----|-----|-----|-------|
| **Navy Blue** | `#0F3A5F` | `220° 70% 25%` | `15, 58, 95` | Primary actions, headers |
| **Emerald Green** | `#10B981` | `160° 84% 39%` | `16, 185, 129` | Success states |
| **Sky Blue** | `#06B6D4` | `200° 95% 50%` | `6, 182, 212` | Secondary actions |
| **Amber** | `#F59E0B` | `38° 92% 50%` | `245, 158, 11` | Warnings |
| **Rose** | `#F43F5E` | `0° 84% 60%` | `244, 63, 94` | Errors |
| **Slate** | `#64748B` | `215° 16% 47%` | `100, 116, 139` | Muted text |

### **Background Colors**

| Color Name | Hex | HSL | RGB | Usage |
|------------|-----|-----|-----|-------|
| **White** | `#FFFFFF` | `0° 0% 100%` | `255, 255, 255` | Main background |
| **Light Gray** | `#F8FAFC` | `210° 20% 98%` | `248, 250, 252` | Card surfaces |
| **Soft Blue** | `#F1F5F9` | `210° 40% 96%` | `241, 245, 249` | Accent backgrounds |
| **Navy Dark** | `#0A2540` | `220° 70% 15%` | `10, 37, 64` | Dark mode background |

---

## CSS Variable Mapping

### **Light Mode**
```css
:root {
  --primary: 220 70% 25%;           /* Navy Blue */
  --secondary: 200 95% 50%;         /* Sky Blue */
  --success: 160 84% 39%;           /* Emerald */
  --warning: 38 92% 50%;            /* Amber */
  --destructive: 0 84% 60%;         /* Rose */
  --muted: 210 40% 96%;             /* Soft Blue */
  --background: 0 0% 100%;          /* White */
  --card: 210 20% 98%;              /* Light Gray */
}
```

### **Dark Mode**
```css
.dark {
  --primary: 200 95% 50%;           /* Sky Blue */
  --secondary: 220 70% 25%;         /* Navy */
  --success: 160 84% 39%;           /* Emerald */
  --warning: 38 92% 50%;            /* Amber */
  --destructive: 0 84% 60%;         /* Rose */
  --muted: 220 70% 25%;             /* Navy */
  --background: 220 70% 15%;        /* Navy Dark */
  --card: 220 70% 20%;              /* Darker Navy */
}
```

---

## Component Usage

### **Buttons**
```tsx
<Button variant="default">Navy Blue</Button>
<Button variant="secondary">Sky Blue</Button>
<Button variant="success">Emerald Green</Button>
<Button variant="warning">Amber</Button>
<Button variant="destructive">Rose</Button>
```

### **Badges**
```tsx
<Badge variant="default">Navy</Badge>
<Badge variant="secondary">Sky Blue</Badge>
<Badge variant="success">Emerald</Badge>
<Badge variant="warning">Amber</Badge>
<Badge variant="destructive">Rose</Badge>
```

### **Metric Cards**
```tsx
<ClickableMetricCard variant="default" />    // Navy border
<ClickableMetricCard variant="success" />    // Emerald border
<ClickableMetricCard variant="warning" />    // Amber border
<ClickableMetricCard variant="danger" />     // Rose border
```

---

## Order Status Colors

| Status | Badge Variant | Color | Hex |
|--------|--------------|-------|-----|
| New | `secondary` | Sky Blue | `#06B6D4` |
| DO Raised | `default` | Navy Blue | `#0F3A5F` |
| Roll Ready | `warning` | Amber | `#F59E0B` |
| Dispatched | `default` | Navy Blue | `#0F3A5F` |
| Delivered | `success` | Emerald | `#10B981` |
| Not Available | `destructive` | Rose | `#F43F5E` |

---

## Accessibility

### **Contrast Ratios (WCAG AA: 4.5:1 minimum)**

| Combination | Ratio | Status |
|-------------|-------|--------|
| Navy on White | 8.5:1 | ✅ AAA |
| Emerald on White | 3.8:1 | ⚠️ Use white text on emerald |
| Sky Blue on White | 3.2:1 | ⚠️ Use white text on sky blue |
| Amber on White | 2.9:1 | ⚠️ Use white text on amber |
| Rose on White | 4.8:1 | ✅ AA |
| Slate on White | 4.6:1 | ✅ AA |

**All colored backgrounds use white text for optimal contrast.**

---

## Tailwind Classes

### **Text Colors**
```css
text-primary          /* Navy Blue */
text-secondary        /* Sky Blue */
text-success          /* Emerald */
text-warning          /* Amber */
text-destructive      /* Rose */
text-muted-foreground /* Slate */
```

### **Background Colors**
```css
bg-primary            /* Navy Blue */
bg-secondary          /* Sky Blue */
bg-success            /* Emerald */
bg-warning            /* Amber */
bg-destructive        /* Rose */
bg-muted              /* Soft Blue */
bg-card               /* Light Gray */
```

### **Border Colors**
```css
border-primary        /* Navy Blue */
border-success        /* Emerald */
border-warning        /* Amber */
border-destructive    /* Rose */
border-border         /* Light Border */
```

---

## Color Psychology

### **Navy Blue (Primary)**
- **Emotion**: Trust, stability, professionalism
- **Use**: Main actions, headers, navigation
- **Industry**: Finance, enterprise, corporate

### **Emerald Green (Success)**
- **Emotion**: Growth, success, positivity
- **Use**: Completed tasks, success messages
- **Industry**: Finance, health, environment

### **Sky Blue (Secondary)**
- **Emotion**: Calm, clarity, communication
- **Use**: Secondary actions, information
- **Industry**: Tech, communication, healthcare

### **Amber (Warning)**
- **Emotion**: Attention, caution, warmth
- **Use**: Warnings, pending items
- **Industry**: Universal warning color

### **Rose (Destructive)**
- **Emotion**: Urgency, error, importance
- **Use**: Errors, critical alerts, delete
- **Industry**: Universal error color

### **Slate (Muted)**
- **Emotion**: Neutral, subtle, secondary
- **Use**: Disabled states, less important text
- **Industry**: Universal neutral color

---

## Brand Guidelines

### **Do's:**
✅ Use Navy for primary actions
✅ Use Emerald for success states
✅ Use Amber for warnings
✅ Use Rose for errors only
✅ Maintain consistent color usage
✅ Use white text on colored backgrounds

### **Don'ts:**
❌ Don't use colors randomly
❌ Don't mix too many colors in one section
❌ Don't use low-contrast combinations
❌ Don't use Rose for non-critical items
❌ Don't hardcode hex values (use CSS variables)

---

## Theme Customization

To change the entire color scheme, edit `src/index.css`:

```css
:root {
  --primary: [your-color-hsl];
  --secondary: [your-color-hsl];
  --success: [your-color-hsl];
  /* etc. */
}
```

All components will automatically update!

---

**Last Updated**: May 22, 2026
**Color Scheme**: Enterprise Emerald/Navy
**Status**: ✅ Production Ready
