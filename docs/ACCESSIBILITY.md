# Week 3 Accessibility and Visual QA

## Included in the interface

- Responsive layout for desktop, tablet, and mobile widths.
- High-contrast dark palette with cyan, violet, green, amber, and red status cues.
- Text labels accompany visual status colors.
- Buttons have visible hover states and readable labels.
- `prefers-reduced-motion` disables decorative transforms and transitions.
- Content remains usable without JavaScript-generated imagery because comic characters are decorative and dialogue is real text.
- Safety states are written in plain language, not color alone.

## Manual Windows review

In the browser, press `Tab` through the navigation, mode switch, scenario buttons, quiz buttons, mentor input, and review controls. Confirm that the focused control is visible and that every action has a readable label.

Resize the browser to a narrow width. Confirm cards stack, comic panels remain readable, and no horizontal scrolling is required.

## 3D comic visual language

The visual system uses CSS depth, comic panel borders, halftone texture, speech bubbles, neon city lighting, card shadows, and small perspective transforms. It deliberately avoids external image downloads so the project stays free, local, and reproducible on Windows.
