# Design Document

## Overview

This design transforms the blood test tracking application to follow Apple's Human Interface Guidelines, specifically inspired by the Health app's clean, card-based interface. The design maintains all existing functionality while implementing Apple's visual language through typography, spacing, colors, and interaction patterns that work seamlessly across platforms including Windows.

## Architecture

### Design System Foundation

The design system will be built on Apple's core principles:
- **8-point grid system** for consistent spacing
- **SF Pro font family** with cross-platform fallbacks
- **Semantic color system** supporting light/dark modes
- **Component-based architecture** following Apple's design patterns
- **Accessibility-first approach** meeting Apple's standards

### Visual Hierarchy

Following the Health app's approach:
1. **Large Title** (34px) - Main page headers
2. **Title 1** (28px) - Section headers  
3. **Title 2** (22px) - Card titles
4. **Headline** (17px semibold) - Metric labels
5. **Body** (17px) - Primary content
6. **Callout** (16px) - Secondary content
7. **Caption** (12px) - Tertiary information

## Components and Interfaces

### Color System

Based on Apple's semantic colors with Windows compatibility:

```css
/* Light Mode */
--apple-system-background: #ffffff;
--apple-secondary-background: #f2f2f7;
--apple-tertiary-background: #ffffff;
--apple-grouped-background: #f2f2f7;
--apple-separator: rgba(60, 60, 67, 0.29);
--apple-label: #000000;
--apple-secondary-label: rgba(60, 60, 67, 0.6);
--apple-tertiary-label: rgba(60, 60, 67, 0.3);
--apple-blue: #007aff;
--apple-red: #ff3b30;
--apple-green: #34c759;
--apple-orange: #ff9500;

/* Dark Mode */
--apple-system-background-dark: #000000;
--apple-secondary-background-dark: #1c1c1e;
--apple-tertiary-background-dark: #2c2c2e;
--apple-grouped-background-dark: #000000;
--apple-separator-dark: rgba(84, 84, 88, 0.65);
--apple-label-dark: #ffffff;
--apple-secondary-label-dark: rgba(235, 235, 245, 0.6);
--apple-tertiary-label-dark: rgba(235, 235, 245, 0.3);
```

### Typography System

Cross-platform font stack:
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', system-ui, sans-serif;
```

Text styles matching Apple's specifications:
- **Large Title**: 34px/41px, weight 400
- **Title 1**: 28px/34px, weight 400  
- **Title 2**: 22px/28px, weight 400
- **Headline**: 17px/22px, weight 600
- **Body**: 17px/22px, weight 400
- **Callout**: 16px/21px, weight 400
- **Caption**: 12px/16px, weight 400

### Card Design Pattern

Following Health app's card system:
- **Background**: System background with subtle shadow
- **Corner radius**: 12px for primary cards, 8px for nested elements
- **Padding**: 16px internal padding
- **Shadow**: `0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)`
- **Border**: 1px solid separator color in light mode, none in dark mode

### Button System

Apple's button hierarchy:
1. **Filled buttons**: Primary actions (blue background)
2. **Tinted buttons**: Secondary actions (blue text, tinted background)
3. **Bordered buttons**: Tertiary actions (border with system color)
4. **Plain buttons**: Navigation and subtle actions

### Layout Patterns

#### Main Dashboard Layout
- **Header section**: Large title with navigation elements
- **Content area**: Card-based grid following Health app patterns
- **Sidebar** (desktop): Collapsible navigation matching macOS patterns
- **Responsive breakpoints**: Following Apple's size classes

#### Metric Cards
Inspired by Health app's data cards:
- **Primary metric**: Large number with unit
- **Trend indicator**: Color-coded arrow or line
- **Sparkline chart**: Subtle background visualization
- **Status indicator**: Color-coded border or background tint

## Data Models

### Theme Configuration
```typescript
interface AppleTheme {
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };
  typography: TypographyScale;
  spacing: SpacingScale;
  borderRadius: BorderRadiusScale;
  shadows: ShadowScale;
}

interface ColorPalette {
  systemBackground: string;
  secondarySystemBackground: string;
  tertiarySystemBackground: string;
  systemGroupedBackground: string;
  separator: string;
  label: string;
  secondaryLabel: string;
  tertiaryLabel: string;
  systemBlue: string;
  systemRed: string;
  systemGreen: string;
  systemOrange: string;
}
```

### Component Props Extensions
Existing components will be enhanced with Apple design props:
```typescript
interface AppleCardProps {
  variant: 'primary' | 'secondary' | 'tertiary';
  elevation: 'none' | 'low' | 'medium' | 'high';
  cornerRadius: 'small' | 'medium' | 'large';
}

interface AppleButtonProps {
  variant: 'filled' | 'tinted' | 'bordered' | 'plain';
  size: 'small' | 'medium' | 'large';
  prominence: 'primary' | 'secondary' | 'tertiary';
}
```

## Error Handling

### Theme System Errors
- **Fallback colors**: Graceful degradation to system defaults
- **Font loading**: Progressive enhancement with system fonts
- **Dark mode detection**: Fallback to light mode if detection fails

### Cross-platform Compatibility
- **Windows-specific adjustments**: Segoe UI font integration
- **Browser compatibility**: CSS custom properties with fallbacks
- **Performance optimization**: Lazy loading of theme assets

## Testing Strategy

### Visual Regression Testing
- **Component screenshots**: Automated visual testing for each component
- **Theme switching**: Verify smooth transitions between light/dark modes
- **Cross-platform rendering**: Test on Windows, macOS, and Linux

### Accessibility Testing
- **Color contrast**: Automated testing for WCAG compliance
- **Keyboard navigation**: Ensure all interactive elements are accessible
- **Screen reader compatibility**: Test with NVDA (Windows) and VoiceOver

### Performance Testing
- **Theme switching speed**: Measure transition performance
- **Font loading impact**: Monitor typography loading times
- **Animation performance**: Ensure 60fps for all transitions

### Integration Testing
- **Existing functionality**: Verify all features work with new design
- **Data visualization**: Ensure charts integrate with Apple color palette
- **File upload/export**: Confirm UI changes don't break core features

## Implementation Phases

### Phase 1: Foundation
- Implement color system and CSS custom properties
- Set up typography scale and font loading
- Create base spacing and layout utilities

### Phase 2: Core Components
- Transform existing cards to Apple design patterns
- Implement button system with proper states
- Update form elements and inputs

### Phase 3: Data Visualization
- Apply Apple color palette to charts
- Implement Health app-style metric cards
- Update trend indicators and status elements

### Phase 4: Polish & Accessibility
- Add smooth animations and transitions
- Implement proper focus states and keyboard navigation
- Fine-tune responsive behavior and cross-platform compatibility