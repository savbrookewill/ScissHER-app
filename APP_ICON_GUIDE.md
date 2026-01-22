# App Icon Design Guide for ScissHER

## Required Icon Sizes for iOS

Apple requires app icons in multiple sizes for different devices and contexts:

### iOS App Icon Sizes
| Size (pixels) | Usage | Required |
|--------------|-------|----------|
| 1024 x 1024 | App Store | ✅ Yes |
| 180 x 180 | iPhone (3x) | ✅ Yes |
| 120 x 120 | iPhone (2x) | ✅ Yes |
| 87 x 87 | iPhone Settings (3x) | ✅ Yes |
| 80 x 80 | iPhone Spotlight (2x) | ✅ Yes |
| 60 x 60 | iPhone Spotlight (1x) | ✅ Yes |
| 58 x 58 | iPhone Settings (2x) | ✅ Yes |
| 40 x 40 | iPhone Spotlight (1x) | ✅ Yes |
| 29 x 29 | iPhone Settings (1x) | ✅ Yes |
| 20 x 20 | iPhone Notification (1x) | ✅ Yes |

### iPad-Specific (if supporting iPad)
| Size (pixels) | Usage |
|--------------|-------|
| 167 x 167 | iPad Pro |
| 152 x 152 | iPad (2x) |
| 76 x 76 | iPad (1x) |

## Design Guidelines

### Brand Colors (ScissHER Theme)
Based on your app's gradient:
- **Primary Pink**: `#ff0080` (rgb(255, 0, 128))
- **Primary Purple**: `#7928ca` (rgb(121, 40, 202))
- **Gradient**: 135° from pink to purple

### Design Requirements
1. **Square canvas** - All icons must be square (no transparency in corners)
2. **No transparency** - Fill the entire canvas
3. **High resolution** - Start with 1024x1024 and scale down
4. **Rounded corners** - iOS adds these automatically; design with square corners
5. **Simple & recognizable** - Should be clear at small sizes
6. **No text** (optional) - Icons with text should be readable at 40x40px

### ScissHER Icon Concepts

#### Option 1: Scissor Symbol
- Stylized scissors icon in gradient colors
- Clean, modern, minimalist design
- Pink to purple gradient background

#### Option 2: Interlocking Symbol
- Two interlocking elements (representing connection)
- Abstract "SH" monogram
- Gradient background

#### Option 3: Petal Design
- Stylized petal or flower element
- Aligns with "Petals" feature in app
- Gradient with subtle depth

## Tools for Creating Icons

### Professional Tools
1. **Figma** (Free/Paid) - https://figma.com
   - Best for design and prototyping
   - Easy export to multiple sizes

2. **Adobe Illustrator** (Paid)
   - Vector-based for perfect scaling
   - Professional results

3. **Sketch** (Paid, Mac only)
   - Industry standard for app design

### Free/Budget-Friendly Tools
1. **Canva** - https://canva.com
   - Templates available
   - Easy to use
   - Free tier available

2. **Affinity Designer** ($55 one-time)
   - Similar to Illustrator
   - No subscription

3. **Icon generators**:
   - https://www.appicon.co/ (generates all sizes from 1024x1024)
   - https://makeappicon.com/

### Hire a Designer
- **Fiverr**: $25-$200 for app icon design
- **99designs**: Contest-based, $299+
- **Upwork**: Hourly rates $25-$100+

## Implementation Steps

### 1. Create 1024x1024 Master Icon
Design at this size first - it's the App Store icon.

### 2. Generate All Required Sizes
Use one of these methods:
- Online generator (appicon.co)
- Export from design tool
- Use Xcode (can sometimes handle this automatically)

### 3. Add to Xcode Project
1. Open project in Xcode
2. Navigate to: `ios/App/App/Assets.xcassets/AppIcon.appiconset`
3. Drag and drop each icon size into the appropriate slot
4. Xcode shows exactly which sizes are needed

### 4. Test on Device
- Icons may look different on device vs. computer
- Test on actual iPhone/iPad
- Check in different contexts (home screen, settings, search)

## Launch Screen (Splash Screen)

### Also Required for iOS:
Create a launch screen that appears while app loads.

**Recommendations**:
- Simple logo on solid background
- Match app branding
- No loading text or animations (iOS guidelines)
- Keep minimal - users see it briefly

**Location in Xcode**:
`ios/App/App/Base.lproj/LaunchScreen.storyboard`

## Quick Start: Free Icon Template

### Using Canva (Free):
1. Go to Canva.com
2. Create custom size: 1024 x 1024 px
3. Use gradient background (pink #ff0080 to purple #7928ca)
4. Add simple scissor icon or "SH" text
5. Download as PNG (highest quality)
6. Use appicon.co to generate all sizes
7. Import into Xcode

## Common Mistakes to Avoid

❌ **Don't**:
- Use photos or realistic images (hard to see at small sizes)
- Include too much detail
- Use very thin lines (won't be visible)
- Add text smaller than 40pt
- Use transparency or gradients on edges
- Copy other apps' icons

✅ **Do**:
- Keep it simple and bold
- Use high contrast
- Test at 40x40 pixels
- Use vector graphics when possible
- Follow Apple's Human Interface Guidelines
- Make it memorable and unique

## Apple's Official Guidelines

Read the full guidelines:
https://developer.apple.com/design/human-interface-guidelines/app-icons

## Current Status

- [ ] 1024x1024 master icon designed
- [ ] All required sizes generated
- [ ] Icons added to Xcode project
- [ ] Launch screen designed
- [ ] Tested on actual device
- [ ] Reviewed against Apple guidelines

## Need Help?

If you need help designing your icon:
1. Hire on Fiverr (budget-friendly)
2. Use Canva templates (DIY)
3. Post in design communities (Reddit: r/design_critiques)

Remember: Your icon is users' first impression - invest time in getting it right!
