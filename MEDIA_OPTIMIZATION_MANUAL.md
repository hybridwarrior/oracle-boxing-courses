# 🎬 Oracle Boxing Media Optimization Manual

**Last Updated:** 2025-10-24
**Website:** /opt/shop (Next.js)
**CDN:** media.oracleboxing.com

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Complete Media Inventory](#complete-media-inventory)
3. [Optimization Guidelines by Category](#optimization-guidelines-by-category)
4. [Priority Matrix](#priority-matrix)
5. [Implementation Checklist](#implementation-checklist)
6. [Tools & Commands](#tools--commands)

---

## 🎯 Executive Summary

### Current State
- **7 Videos** (MP4 + WebM formats) totaling estimated 50-150MB
- **80+ Images** across PNG, JPG, JPEG, WebP formats
- All external media hosted on: `media.oracleboxing.com/Website/`
- Local assets in `/opt/shop/public/`

### Performance Impact
- **Hero video** (`hero-section.mp4`) - largest impact on page load
- **VSL videos** (`VSL2_2.mp4/.webm`) - critical for conversions
- **Product thumbnails** - repeated across multiple pages
- **Profile pictures** - many already optimized to WebP

### Quick Wins (High Priority)
1. Optimize hero-section.mp4 → target 5-10MB max
2. Convert all PNG thumbnails to WebP
3. Create responsive image variants (mobile/tablet/desktop)
4. Implement lazy loading for below-fold images

---

## 📦 Complete Media Inventory

### 🎥 VIDEO FILES

#### 1. Hero Background Videos
| File | Current Format | Est. Size | Usage | Priority |
|------|---------------|-----------|-------|----------|
| `hero-section.mp4` | MP4 | Large | Homepage hero background | 🔴 HIGH |
| `membership_hero.mp4` | MP4 | Large | Membership page hero | 🔴 HIGH |

**Location:** Homepage (app/page.tsx:54), Membership (app/membership/page.tsx:215)

#### 2. Testimonial Videos
| File | Current Formats | Usage | Priority |
|------|----------------|-------|----------|
| `obcoachingcall.webm` + `.mp4` | WebM + MP4 | Live coaching testimonial | 🟡 MEDIUM |
| `online_rating.webm` + `.mp4` | WebM + MP4 | Community testimonial | 🟡 MEDIUM |

**Location:** TestimonialsWithMediaSection.tsx (lines 71-72, 144-145)

#### 3. VSL (Video Sales Letter)
| File | Current Formats | Usage | Priority |
|------|----------------|-------|----------|
| `VSL2_2.webm` + `.mp4` | WebM + MP4 | Main sales video | 🔴 HIGH |
| `vsl2_thumbnail.webp` | WebP | Video poster | 🟢 LOW |

**Location:** WistiaVideo.tsx (line 30-31), VideoPlayer.tsx (line 9)

#### 4. Membership Videos (Dynamic)
Multiple videos loaded dynamically with pattern: `https://media.oracleboxing.com/Website/${video}`

**Location:** app/membership/page.tsx (lines 329, 347)

---

### 🖼️ IMAGE FILES

#### A. BRAND LOGOS

##### Primary Logo
| File | Format | Dimensions | Usage | Priority |
|------|--------|-----------|-------|----------|
| `long_white.png` | PNG | Unknown | Header, pricing cards | 🔴 HIGH |
| `long_black.png` | PNG | Unknown | Checkout, order confirmation | 🔴 HIGH |
| `logo_site_white.webp` | WebP | Unknown | 6WC page logo | 🟢 LOW |

**Optimization:** Convert to WebP with fallback. Create SVG version if possible for perfect scaling.

**Locations:**
- Header.tsx:28
- CoursePriceCard.tsx:38
- EpicOfferStackSection.tsx:38
- OrderConfirmation.tsx:27
- app/checkout/order-bumps/page.tsx:239
- app/checkout/page.tsx:240

##### Payment Provider Logos
| File | Format | Dimensions | Usage | Priority |
|------|--------|-----------|-------|----------|
| `payment1.svg` | SVG | - | Visa/Mastercard | ✅ OPTIMAL |
| `payment2.svg` | SVG | - | Amex/Discover | ✅ OPTIMAL |
| `paypal2.svg` | SVG | - | PayPal | ✅ OPTIMAL |
| `klarna.svg` | SVG | - | Klarna | ✅ OPTIMAL |

**Status:** Already optimized as SVG. No action needed.

##### Local Assets (in /public/)
| File | Format | Usage | Priority |
|------|--------|-------|----------|
| `favicon.ico` | ICO | Browser favicon | 🟢 LOW |
| `file.svg` | SVG | Unknown | 🟢 LOW |
| `window.svg` | SVG | Unknown | 🟢 LOW |
| `next.svg` | SVG | Next.js default | 🟢 LOW |
| `vercel.svg` | SVG | Vercel default | 🟢 LOW |
| `globe.svg` | SVG | Unknown | 🟢 LOW |
| `logo-white.png` | PNG | Unknown | 🟡 MEDIUM |

---

#### B. PRODUCT & COURSE THUMBNAILS

##### Bundle Images
| File | Current Format | Usage | Dimensions Needed | Priority |
|------|---------------|-------|-------------------|----------|
| `obm_tn.png` | PNG | Bundle product card | 800x600, 400x300 | 🔴 HIGH |

**Locations:** lib/products.ts:16, 261, 289

##### BFFP (Boxing Masterclass) Images
| File | Current Format | Usage | Priority |
|------|---------------|-------|----------|
| `bffp_tn5.png` | PNG | Product thumbnail | 🔴 HIGH |
| `bffp_tn.webp` | WebP | Course card | 🟢 LOW |
| `bffp_tn4.png` | PNG | Course content | 🟡 MEDIUM |
| `bffp_course3.png` | PNG | Course content | 🟡 MEDIUM |
| `bbffp_course4.png` | PNG | Course content | 🟡 MEDIUM |

**Note:** `bffp_tn.webp` already optimized. Convert PNG versions to WebP.

**Locations:**
- lib/products.ts:43, 235
- lib/courses.ts:48, 88
- components/BundleTimelineProcess.tsx:42, 49, 56
- components/WhatsIncludedSection.tsx:19
- app/courses/bffp/page.tsx:61, 66, 71

##### Roadmap Images
| File | Current Format | Usage | Priority |
|------|---------------|-------|----------|
| `tbrtn5hq.png` | PNG | Roadmap thumbnail | 🔴 HIGH |
| `phase1.webp` | WebP | Phase 1 | ✅ OPTIMAL |
| `phase2.webp` | WebP | Phase 2 | ✅ OPTIMAL |
| `phase3.webp` | WebP | Phase 3 | ✅ OPTIMAL |
| `phase4.webp` | WebP | Phase 4 | ✅ OPTIMAL |
| `phase5.webp` | WebP | Phase 5 | ✅ OPTIMAL |
| `tbr_course1.png` | PNG | Course content | 🟡 MEDIUM |
| `tbr_course2.png` | PNG | Course content | 🟡 MEDIUM |
| `tbr_course22.png` | PNG | Course content | 🟡 MEDIUM |
| `tbr_course4.png` | PNG | Course content | 🟡 MEDIUM |

**Locations:**
- lib/products.ts:75
- lib/courses.ts:79, 110, 120, 130, 140, 150
- components/BundleTimelineProcess.tsx:89, 96, 103, 110
- app/courses/roadmap/page.tsx:56, 61, 66, 71

##### Membership/Clinic Images
| File | Current Format | Usage | Priority |
|------|---------------|-------|----------|
| `boxing_clinic.webp` | WebP | Membership cards | ✅ OPTIMAL |
| `boxing_clinic.png` | PNG | Alt version | 🔴 HIGH |
| `6wc_tn.png` | PNG | Challenge thumbnail | 🔴 HIGH |
| `1on1_coaching.png` | PNG | Coaching product | 🟡 MEDIUM |

**Locations:**
- lib/products.ts:102, 125, 147, 206, 318, 380
- lib/courses.ts:26
- components/WhatsIncludedSection.tsx:24

##### General Boxing/Fight Images
| File | Current Format | Usage | Priority |
|------|---------------|-------|----------|
| `ob_fight3.png` | PNG | Course hero | 🟡 MEDIUM |
| `bcr_course1.png` | PNG | Course content | 🟡 MEDIUM |
| `bcr_course2.png` | PNG | Course content | 🟡 MEDIUM |
| `bcr_course4.png` | PNG | Course content | 🟡 MEDIUM |
| `bcr_course6.png` | PNG | Course content | 🟡 MEDIUM |

**Locations:**
- components/BundleTimelineProcess.tsx:35, 143, 150, 157, 164
- app/courses/bffp/page.tsx:56

---

#### C. PLATFORM SCREENSHOTS

| File | Current Format | Usage | Priority |
|------|---------------|-------|----------|
| `inside1.png` | PNG | Platform carousel | 🟡 MEDIUM |
| `inside2.png` | PNG | Platform carousel | 🟡 MEDIUM |
| `inside3.png` | PNG | Platform carousel | 🟡 MEDIUM |
| `inside4.png` | PNG | Platform carousel | 🟡 MEDIUM |
| `phone_mockup1.png` | PNG | Mobile mockup | 🟡 MEDIUM |
| `laptop_mockup.webp` | WebP | Laptop mockup | ✅ OPTIMAL |
| `skool_invite.webp` | WebP | Success page invite | ✅ OPTIMAL |

**Locations:**
- components/PlatformScreenshotsCarousel.tsx:15, 20, 25, 30, 35
- components/WhatsIncludedSection.tsx:29
- components/TestimonialsWithMediaSection.tsx:53
- app/success/page.tsx:103
- app/success/challenge/page.tsx:105

---

#### D. TESTIMONIAL PROFILE PICTURES

##### Already Optimized (WebP)
| File | Format | Usage | Status |
|------|--------|-------|--------|
| `niclas.webp` | WebP | Testimonial | ✅ OPTIMAL |
| `torey.webp` | WebP | Testimonial | ✅ OPTIMAL |
| `balal.webp` | WebP | Testimonial | ✅ OPTIMAL |

**Location:** components/TestimonialsWithMediaSection.tsx:34, 88, 120

##### Need Optimization (JPG/JPEG)
| File | Current Format | Usage | Priority |
|------|---------------|-------|----------|
| `bruno.jpg` | JPG | Transformation story | 🟡 MEDIUM |
| `daniel.jpeg` | JPEG | Transformation story | 🟡 MEDIUM |
| `iilya.jpg` | JPG | Transformation story | 🟡 MEDIUM |
| `torey.jpg` | JPG | Membership testimonial | 🟡 MEDIUM |
| `harvey.jpg` | JPG | Membership testimonial | 🟡 MEDIUM |
| `luacs.jpg` | JPG | Membership testimonial | 🟡 MEDIUM |
| `charlie.jpg` | JPG | Membership testimonial | 🟡 MEDIUM |
| `balal.jpg` | JPG | Membership testimonial | 🟡 MEDIUM |
| `niko.jpg` | JPG | Membership testimonial | 🟡 MEDIUM |
| `niclas.jpeg` | JPEG | Membership testimonial | 🟡 MEDIUM |
| `bernardo.jpeg` | JPEG | Membership testimonial | 🟡 MEDIUM |

**Locations:**
- components/TransformationStory.tsx:30, 44, 56
- app/membership/page.tsx:24, 30, 36, 42, 48, 54, 60, 66, 290

---

#### E. MISCELLANEOUS IMAGES

| File | Current Format | Usage | Priority |
|------|---------------|-------|----------|
| `apparel.png` | PNG | Apparel section hero | 🔴 HIGH |
| `favicon.png` | PNG | Site favicon (metadata) | 🟢 LOW |

**Locations:**
- app/page.tsx:117
- app/layout.tsx:16

---

## 🎨 Optimization Guidelines by Category

### 1. HERO VIDEOS (Background)

**Current Files:**
- `hero-section.mp4`
- `membership_hero.mp4`

**Optimization Strategy:**

#### Target Specifications:
```
Resolution: 1920x1080 (1080p max)
Bitrate: 2-4 Mbps
Frame Rate: 24-30fps
Codec: H.264 (MP4), VP9 (WebM)
File Size Target: 5-10MB max
Duration: Keep original or trim to essential seconds
```

#### FFmpeg Commands:

**High Quality (5-8MB):**
```bash
ffmpeg -i hero-section.mp4 \
  -c:v libx264 -preset slow -crf 28 \
  -vf scale=1920:1080 -r 30 \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  hero-section-optimized.mp4
```

**Medium Quality (3-5MB):**
```bash
ffmpeg -i hero-section.mp4 \
  -c:v libx264 -preset slow -crf 32 \
  -vf scale=1920:1080 -r 24 \
  -c:a aac -b:a 96k \
  -movflags +faststart \
  hero-section-optimized.mp4
```

**WebM Version (Better compression):**
```bash
ffmpeg -i hero-section.mp4 \
  -c:v libvpx-vp9 -crf 35 -b:v 0 \
  -vf scale=1920:1080 -r 30 \
  -c:a libopus -b:a 96k \
  hero-section-optimized.webm
```

**Mobile Version (1-2MB):**
```bash
ffmpeg -i hero-section.mp4 \
  -c:v libx264 -preset slow -crf 35 \
  -vf scale=1280:720 -r 24 \
  -c:a aac -b:a 64k \
  -movflags +faststart \
  hero-section-mobile.mp4
```

#### Implementation:
1. Create optimized versions with commands above
2. Upload to storage box: `/Website/optimized/`
3. Update code to use `<source>` tags with multiple versions
4. Add mobile detection for smaller version

---

### 2. VSL (Video Sales Letter)

**Current Files:**
- `VSL2_2.mp4` + `VSL2_2.webm`
- `vsl2_thumbnail.webp` (already optimized)

**Optimization Strategy:**

#### Target Specifications:
```
Resolution: 1920x1080 or 1280x720
Bitrate: 1.5-3 Mbps (this is a longer video)
Frame Rate: 30fps
Codec: H.264 (MP4), VP9 (WebM)
Keep both formats for browser compatibility
```

#### FFmpeg Commands:

**MP4 Version:**
```bash
ffmpeg -i VSL2_2.mp4 \
  -c:v libx264 -preset slow -crf 30 \
  -vf scale=1920:1080 -r 30 \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  VSL2_2-optimized.mp4
```

**WebM Version:**
```bash
ffmpeg -i VSL2_2.mp4 \
  -c:v libvpx-vp9 -crf 37 -b:v 0 \
  -vf scale=1920:1080 -r 30 \
  -c:a libopus -b:a 96k \
  VSL2_2-optimized.webm
```

**Thumbnail:** Already optimized as WebP ✅

---

### 3. TESTIMONIAL VIDEOS

**Current Files:**
- `obcoachingcall.webm` + `.mp4`
- `online_rating.webm` + `.mp4`

**Optimization Strategy:**

#### Target Specifications:
```
Resolution: 1280x720 or 1920x1080
Bitrate: 1.5-2.5 Mbps
Frame Rate: 30fps
Codec: H.264 (MP4), VP9 (WebM)
File Size Target: 2-5MB
```

#### FFmpeg Commands:

**Template for all testimonial videos:**
```bash
# MP4 version
ffmpeg -i [INPUT].mp4 \
  -c:v libx264 -preset slow -crf 30 \
  -vf scale=1280:720 -r 30 \
  -c:a aac -b:a 96k \
  -movflags +faststart \
  [OUTPUT]-optimized.mp4

# WebM version
ffmpeg -i [INPUT].mp4 \
  -c:v libvpx-vp9 -crf 37 -b:v 0 \
  -vf scale=1280:720 -r 30 \
  -c:a libopus -b:a 96k \
  [OUTPUT]-optimized.webm
```

**Apply to:**
- `obcoachingcall.mp4/webm`
- `online_rating.mp4/webm`

---

### 4. PRODUCT THUMBNAILS

**Files to Optimize:**
- `obm_tn.png`
- `bffp_tn5.png`
- `tbrtn5hq.png`
- `boxing_clinic.png`
- `6wc_tn.png`
- `1on1_coaching.png`

**Optimization Strategy:**

#### Target Specifications:
```
Format: WebP (primary), AVIF (future), PNG (fallback)
Dimensions: Create 3 versions:
  - Large: 800x600px (desktop)
  - Medium: 600x450px (tablet)
  - Small: 400x300px (mobile)
Quality: 80-85% WebP
```

#### Image Processing Commands:

**Using ImageMagick + cwebp:**

```bash
# For each PNG file:
INPUT="obm_tn.png"
BASENAME="obm_tn"

# Resize to different sizes
convert $INPUT -resize 800x600 -strip ${BASENAME}-large.png
convert $INPUT -resize 600x450 -strip ${BASENAME}-medium.png
convert $INPUT -resize 400x300 -strip ${BASENAME}-small.png

# Convert to WebP (primary)
cwebp -q 82 ${BASENAME}-large.png -o ${BASENAME}-large.webp
cwebp -q 82 ${BASENAME}-medium.png -o ${BASENAME}-medium.webp
cwebp -q 82 ${BASENAME}-small.png -o ${BASENAME}-small.webp

# Optional: AVIF for future
avifenc -s 5 -q 75 ${BASENAME}-large.png ${BASENAME}-large.avif
avifenc -s 5 -q 75 ${BASENAME}-medium.png ${BASENAME}-medium.avif
avifenc -s 5 -q 75 ${BASENAME}-small.png ${BASENAME}-small.avif
```

**Batch Script for All Product Thumbnails:**
```bash
#!/bin/bash
# save as: optimize-product-thumbnails.sh

IMAGES=(
  "obm_tn.png"
  "bffp_tn5.png"
  "tbrtn5hq.png"
  "boxing_clinic.png"
  "6wc_tn.png"
  "1on1_coaching.png"
)

for IMG in "${IMAGES[@]}"; do
  BASENAME="${IMG%.*}"

  echo "Processing $IMG..."

  # Create responsive sizes
  convert "$IMG" -resize 800x600 -strip "${BASENAME}-large.png"
  convert "$IMG" -resize 600x450 -strip "${BASENAME}-medium.png"
  convert "$IMG" -resize 400x300 -strip "${BASENAME}-small.png"

  # Convert to WebP
  cwebp -q 82 "${BASENAME}-large.png" -o "${BASENAME}-large.webp"
  cwebp -q 82 "${BASENAME}-medium.png" -o "${BASENAME}-medium.webp"
  cwebp -q 82 "${BASENAME}-small.png" -o "${BASENAME}-small.webp"

  echo "✅ Completed $IMG"
done

echo "🎉 All product thumbnails optimized!"
```

---

### 5. COURSE CONTENT IMAGES

**Files to Optimize:**
```
- bffp_tn4.png
- bffp_course3.png
- bbffp_course4.png
- tbr_course1.png
- tbr_course2.png
- tbr_course22.png
- tbr_course4.png
- ob_fight3.png
- bcr_course1.png
- bcr_course2.png
- bcr_course4.png
- bcr_course6.png
```

**Optimization Strategy:**

#### Target Specifications:
```
Format: WebP
Dimensions: 1200x800px (max), 800x600px (standard)
Quality: 80% WebP
```

#### Batch Optimization:

```bash
#!/bin/bash
# save as: optimize-course-images.sh

COURSE_IMAGES=(
  "bffp_tn4.png"
  "bffp_course3.png"
  "bbffp_course4.png"
  "tbr_course1.png"
  "tbr_course2.png"
  "tbr_course22.png"
  "tbr_course4.png"
  "ob_fight3.png"
  "bcr_course1.png"
  "bcr_course2.png"
  "bcr_course4.png"
  "bcr_course6.png"
)

for IMG in "${COURSE_IMAGES[@]}"; do
  BASENAME="${IMG%.*}"

  echo "Processing $IMG..."

  # Standard size (maintain aspect ratio, max 1200px width)
  convert "$IMG" -resize 1200x900\> -strip "${BASENAME}-optimized.png"

  # Convert to WebP
  cwebp -q 80 "${BASENAME}-optimized.png" -o "${BASENAME}.webp"

  echo "✅ Completed $IMG"
done

echo "🎉 All course images optimized!"
```

---

### 6. PLATFORM SCREENSHOTS

**Files to Optimize:**
```
- inside1.png
- inside2.png
- inside3.png
- inside4.png
- phone_mockup1.png
```

**Already Optimized:**
- `laptop_mockup.webp` ✅
- `skool_invite.webp` ✅

**Optimization Strategy:**

#### Target Specifications:
```
Format: WebP
Dimensions: Keep original (these are UI screenshots)
Quality: 85% WebP (higher quality for text clarity)
```

#### Batch Optimization:

```bash
#!/bin/bash
# save as: optimize-screenshots.sh

SCREENSHOTS=(
  "inside1.png"
  "inside2.png"
  "inside3.png"
  "inside4.png"
  "phone_mockup1.png"
)

for IMG in "${SCREENSHOTS[@]}"; do
  BASENAME="${IMG%.*}"

  echo "Processing $IMG..."

  # Convert to WebP with high quality for text readability
  cwebp -q 85 "$IMG" -o "${BASENAME}.webp"

  echo "✅ Completed $IMG"
done

echo "🎉 All screenshots optimized!"
```

---

### 7. TESTIMONIAL PROFILE PICTURES

**Files to Optimize:**
```
JPG/JPEG Format:
- bruno.jpg
- daniel.jpeg
- iilya.jpg
- torey.jpg
- harvey.jpg
- luacs.jpg
- charlie.jpg
- balal.jpg
- niko.jpg
- niclas.jpeg
- bernardo.jpeg
```

**Already Optimized:**
- `niclas.webp` ✅
- `torey.webp` ✅
- `balal.webp` ✅

**Optimization Strategy:**

#### Target Specifications:
```
Format: WebP
Dimensions: 256x256px (standard), 128x128px (mobile)
Quality: 80% WebP
Shape: Square crop (center focus on face)
```

#### Batch Optimization:

```bash
#!/bin/bash
# save as: optimize-profile-pictures.sh

PROFILES=(
  "bruno.jpg"
  "daniel.jpeg"
  "iilya.jpg"
  "torey.jpg"
  "harvey.jpg"
  "luacs.jpg"
  "charlie.jpg"
  "balal.jpg"
  "niko.jpg"
  "niclas.jpeg"
  "bernardo.jpeg"
)

for IMG in "${PROFILES[@]}"; do
  BASENAME="${IMG%.*}"

  echo "Processing $IMG..."

  # Create square crop centered, resize to 256x256
  convert "$IMG" \
    -gravity Center \
    -crop 1:1 \
    -resize 256x256 \
    -strip \
    "${BASENAME}-256.png"

  # Create smaller mobile version
  convert "${BASENAME}-256.png" \
    -resize 128x128 \
    "${BASENAME}-128.png"

  # Convert to WebP
  cwebp -q 80 "${BASENAME}-256.png" -o "${BASENAME}-256.webp"
  cwebp -q 80 "${BASENAME}-128.png" -o "${BASENAME}-128.webp"

  echo "✅ Completed $IMG"
done

echo "🎉 All profile pictures optimized!"
```

---

### 8. BRAND LOGOS

**Files to Optimize:**
```
- long_white.png → convert to WebP + create SVG version
- long_black.png → convert to WebP + create SVG version
- logo-white.png → convert to WebP
```

**Already Optimized:**
- `logo_site_white.webp` ✅
- All payment logos (SVG) ✅

**Optimization Strategy:**

#### Target Specifications:
```
Format: SVG (preferred for logos), WebP (fallback)
Dimensions: Multiple sizes:
  - Large: 300px width (header)
  - Medium: 200px width
  - Small: 150px width
Quality: 90% WebP (high quality for brand assets)
```

#### Logo Optimization:

```bash
#!/bin/bash
# save as: optimize-logos.sh

LOGOS=(
  "long_white.png"
  "long_black.png"
  "logo-white.png"
)

for LOGO in "${LOGOS[@]}"; do
  BASENAME="${LOGO%.*}"

  echo "Processing $LOGO..."

  # Create multiple sizes
  convert "$LOGO" -resize 300x -strip "${BASENAME}-large.png"
  convert "$LOGO" -resize 200x -strip "${BASENAME}-medium.png"
  convert "$LOGO" -resize 150x -strip "${BASENAME}-small.png"

  # Convert to WebP with high quality
  cwebp -q 90 "${BASENAME}-large.png" -o "${BASENAME}-large.webp"
  cwebp -q 90 "${BASENAME}-medium.png" -o "${BASENAME}-medium.webp"
  cwebp -q 90 "${BASENAME}-small.png" -o "${BASENAME}-small.webp"

  echo "✅ Completed $LOGO"
done

echo "🎉 All logos optimized!"
echo "⚠️  MANUAL TASK: Convert logos to SVG for best quality"
```

**IMPORTANT:** Consider creating SVG versions of logos for perfect scaling at any size.

---

### 9. HERO IMAGES

**Files to Optimize:**
- `apparel.png` (used in app/page.tsx:117)

**Optimization Strategy:**

#### Target Specifications:
```
Format: WebP (primary), AVIF (future)
Dimensions: Create responsive versions:
  - Desktop: 2560x1440px
  - Tablet: 1920x1080px
  - Mobile: 1280x720px
Quality: 80% WebP
```

#### Optimization Commands:

```bash
# Hero image - apparel.png
INPUT="apparel.png"

# Desktop version
convert "$INPUT" -resize 2560x1440^ -gravity Center -extent 2560x1440 -strip apparel-desktop.png
cwebp -q 80 apparel-desktop.png -o apparel-desktop.webp

# Tablet version
convert "$INPUT" -resize 1920x1080^ -gravity Center -extent 1920x1080 -strip apparel-tablet.png
cwebp -q 80 apparel-tablet.png -o apparel-tablet.webp

# Mobile version
convert "$INPUT" -resize 1280x720^ -gravity Center -extent 1280x720 -strip apparel-mobile.png
cwebp -q 80 apparel-mobile.png -o apparel-mobile.webp

echo "✅ Hero image optimized with responsive versions"
```

---

## 📊 Priority Matrix

### 🔴 HIGH PRIORITY (Immediate Impact)

**Videos:**
1. `hero-section.mp4` - Homepage hero, largest file
2. `membership_hero.mp4` - Membership page hero
3. `VSL2_2.mp4/.webm` - Critical for conversions

**Images:**
4. `obm_tn.png` - Bundle thumbnail (used multiple times)
5. `bffp_tn5.png` - BFFP thumbnail (used multiple times)
6. `tbrtn5hq.png` - Roadmap thumbnail
7. `boxing_clinic.png` - Membership thumbnail
8. `6wc_tn.png` - Challenge thumbnail
9. `long_white.png` - Header logo (every page)
10. `long_black.png` - Checkout logo (conversion pages)
11. `apparel.png` - Hero section image

**Estimated Impact:** 40-60% reduction in page load time

---

### 🟡 MEDIUM PRIORITY (Moderate Impact)

**Videos:**
1. `obcoachingcall.mp4/.webm` - Testimonial video
2. `online_rating.mp4/.webm` - Testimonial video

**Images:**
3. All course content images (12 files)
4. Platform screenshots (5 files)
5. Testimonial profile pictures (11 JPG/JPEG files)
6. `1on1_coaching.png` - Product thumbnail

**Estimated Impact:** 20-30% additional optimization

---

### 🟢 LOW PRIORITY (Nice to Have)

**Images:**
1. Local assets in `/public/` folder
2. `favicon.png`
3. Already optimized WebP files (verify compression)

**Estimated Impact:** 5-10% additional optimization

---

## ✅ Implementation Checklist

### Phase 1: High Priority Assets (Week 1)

#### Videos
- [ ] **hero-section.mp4**
  - [ ] Download from CDN to local machine
  - [ ] Optimize with FFmpeg (desktop + mobile versions)
  - [ ] Upload to storage box: `/Website/optimized/`
  - [ ] Test on staging environment
  - [ ] Update production URLs

- [ ] **membership_hero.mp4**
  - [ ] Download from CDN
  - [ ] Optimize with FFmpeg
  - [ ] Upload optimized version
  - [ ] Test and deploy

- [ ] **VSL2_2.mp4/.webm**
  - [ ] Download both versions
  - [ ] Optimize with FFmpeg
  - [ ] Upload optimized versions
  - [ ] Test video playback
  - [ ] Deploy

#### Product Thumbnails
- [ ] **obm_tn.png**
  - [ ] Download original
  - [ ] Create 3 responsive sizes (800px, 600px, 400px)
  - [ ] Convert to WebP
  - [ ] Upload all versions
  - [ ] Update code to use `<picture>` element with srcset

- [ ] **bffp_tn5.png** (same process as above)
- [ ] **tbrtn5hq.png**
- [ ] **boxing_clinic.png**
- [ ] **6wc_tn.png**

#### Logos
- [ ] **long_white.png**
  - [ ] Create responsive versions
  - [ ] Convert to WebP
  - [ ] Consider SVG version (manual)
  - [ ] Upload and update code

- [ ] **long_black.png** (same process)

#### Hero Image
- [ ] **apparel.png**
  - [ ] Create 3 responsive versions
  - [ ] Convert to WebP
  - [ ] Upload all versions
  - [ ] Implement responsive image in code

---

### Phase 2: Medium Priority Assets (Week 2)

#### Testimonial Videos
- [ ] **obcoachingcall.mp4/.webm**
  - [ ] Optimize both formats
  - [ ] Upload to storage box
  - [ ] Update and test

- [ ] **online_rating.mp4/.webm** (same process)

#### Course Content Images
Run batch script: `optimize-course-images.sh`
- [ ] Execute script on all 12 course images
- [ ] Upload WebP versions to storage box
- [ ] Update code references (bulk find & replace)
- [ ] Test on all course pages

#### Platform Screenshots
Run batch script: `optimize-screenshots.sh`
- [ ] Execute script on 5 screenshot files
- [ ] Upload WebP versions
- [ ] Update carousel component
- [ ] Test carousel functionality

#### Profile Pictures
Run batch script: `optimize-profile-pictures.sh`
- [ ] Execute script on 11 profile images
- [ ] Upload 256px and 128px WebP versions
- [ ] Update testimonial components
- [ ] Test on testimonial sections

---

### Phase 3: Code Implementation (Week 3)

#### Update Components for Responsive Images

**Example: Product Card Component**
```jsx
<picture>
  <source
    media="(min-width: 1024px)"
    srcSet="https://media.oracleboxing.com/Website/obm_tn-large.webp"
    type="image/webp"
  />
  <source
    media="(min-width: 768px)"
    srcSet="https://media.oracleboxing.com/Website/obm_tn-medium.webp"
    type="image/webp"
  />
  <source
    srcSet="https://media.oracleboxing.com/Website/obm_tn-small.webp"
    type="image/webp"
  />
  <img
    src="https://media.oracleboxing.com/Website/obm_tn-large.png"
    alt="Oracle Boxing Method Bundle"
    loading="lazy"
  />
</picture>
```

#### Implementation Tasks:
- [ ] Update `lib/products.ts` with new image paths
- [ ] Update `lib/courses.ts` with new image paths
- [ ] Modify `CourseCard.tsx` to use `<picture>` element
- [ ] Modify `ProductCard.tsx` to use `<picture>` element
- [ ] Update all video components with optimized sources
- [ ] Add lazy loading to all below-fold images
- [ ] Test responsive images on all devices

---

### Phase 4: Verification & Testing (Week 4)

#### Performance Testing
- [ ] Run Lighthouse audit (before optimization)
- [ ] Deploy all optimizations to production
- [ ] Run Lighthouse audit (after optimization)
- [ ] Document performance improvements

#### Visual Regression Testing
- [ ] Verify all images load correctly
- [ ] Check image quality across devices
- [ ] Test video playback on all browsers
- [ ] Verify no broken images
- [ ] Check responsive image switching

#### Browser Compatibility
- [ ] Test on Chrome (WebP + video)
- [ ] Test on Firefox (WebP + video)
- [ ] Test on Safari (WebP + video)
- [ ] Test on Edge (WebP + video)
- [ ] Test on mobile browsers (iOS/Android)

---

### Phase 5: Monitoring & Maintenance

#### Setup Monitoring
- [ ] Configure CDN caching headers
- [ ] Setup analytics for page load times
- [ ] Monitor Core Web Vitals
- [ ] Track conversion rate changes

#### Documentation
- [ ] Document final file structure
- [ ] Create naming convention guide
- [ ] Update team on new media workflow
- [ ] Schedule quarterly media audits

---

## 🛠️ Tools & Commands Reference

### Required Software

#### 1. FFmpeg (Video Processing)
```bash
# Install on Mac
brew install ffmpeg

# Install on Ubuntu/Debian
sudo apt-get install ffmpeg

# Install on Windows
# Download from: https://ffmpeg.org/download.html
```

#### 2. ImageMagick (Image Processing)
```bash
# Install on Mac
brew install imagemagick

# Install on Ubuntu/Debian
sudo apt-get install imagemagick

# Install on Windows
# Download from: https://imagemagick.org/script/download.php
```

#### 3. WebP Tools (cwebp)
```bash
# Install on Mac
brew install webp

# Install on Ubuntu/Debian
sudo apt-get install webp

# Install on Windows
# Download from: https://developers.google.com/speed/webp/download
```

#### 4. Optional: AVIF Tools
```bash
# Install on Mac
brew install libavif

# Install on Ubuntu/Debian
sudo apt-get install libavif-bin
```

---

### Quick Reference Commands

#### Video Optimization Templates

**Hero Background Video (High Quality):**
```bash
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 28 \
  -vf scale=1920:1080 -r 30 -c:a aac -b:a 128k \
  -movflags +faststart output.mp4
```

**Hero Background Video (WebM):**
```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 \
  -vf scale=1920:1080 -r 30 -c:a libopus -b:a 96k \
  output.webm
```

**Mobile Video (Smaller Size):**
```bash
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 35 \
  -vf scale=1280:720 -r 24 -c:a aac -b:a 64k \
  -movflags +faststart output-mobile.mp4
```

#### Image Optimization Templates

**PNG to WebP (Standard Quality):**
```bash
cwebp -q 80 input.png -o output.webp
```

**PNG to WebP (High Quality - for logos):**
```bash
cwebp -q 90 input.png -o output.webp
```

**Create Responsive Sizes:**
```bash
convert input.png -resize 800x600 output-large.png
convert input.png -resize 600x450 output-medium.png
convert input.png -resize 400x300 output-small.png
```

**Profile Picture (Square Crop):**
```bash
convert input.jpg -gravity Center -crop 1:1 \
  -resize 256x256 -strip output.png
```

**Check Image Dimensions:**
```bash
identify -format "%wx%h\n" image.png
```

**Check Video Info:**
```bash
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,duration,bit_rate \
  -of default=noprint_wrappers=1 video.mp4
```

---

### Batch Processing Scripts

All batch scripts are included in the optimization sections above. Save them with `.sh` extension and run:

```bash
chmod +x script-name.sh
./script-name.sh
```

**Available Scripts:**
1. `optimize-product-thumbnails.sh` - Product images
2. `optimize-course-images.sh` - Course content images
3. `optimize-screenshots.sh` - Platform screenshots
4. `optimize-profile-pictures.sh` - Testimonial profiles
5. `optimize-logos.sh` - Brand logos

---

## 📈 Expected Performance Improvements

### Before Optimization (Estimated)
- **Homepage Load Time:** 4-6 seconds
- **Total Page Weight:** 8-15 MB
- **Largest Contentful Paint (LCP):** 3.5-5s
- **First Contentful Paint (FCP):** 2-3s

### After Optimization (Target)
- **Homepage Load Time:** 1.5-2.5 seconds (60% improvement)
- **Total Page Weight:** 2-4 MB (70% reduction)
- **Largest Contentful Paint (LCP):** <2.5s ✅
- **First Contentful Paint (FCP):** <1.5s ✅

### Specific File Size Reductions

| File Type | Before | After | Savings |
|-----------|--------|-------|---------|
| Hero Videos | 20-50MB | 5-10MB | 70-80% |
| Product Thumbnails (PNG→WebP) | 500KB-2MB | 100KB-300KB | 70-85% |
| Profile Pictures (JPG→WebP) | 100KB-500KB | 30KB-100KB | 70-80% |
| Course Images (PNG→WebP) | 300KB-1MB | 80KB-250KB | 70-75% |
| VSL Videos | 15-30MB | 8-15MB | 40-50% |

---

## 🎯 Next Steps

### Immediate Actions (Today)
1. Review this manual completely
2. Install required tools (FFmpeg, ImageMagick, cwebp)
3. Download 3-5 high-priority files to test optimization
4. Run optimization commands on test files
5. Verify quality and file size

### This Week
1. Complete Phase 1 (High Priority Assets)
2. Upload optimized files to storage box
3. Create backup of originals
4. Test on staging environment

### Next Week
1. Complete Phase 2 (Medium Priority Assets)
2. Begin code implementation for responsive images
3. Test on multiple devices and browsers

### Month 1 Goal
- Complete all optimization phases
- Deploy to production
- Measure and document performance improvements
- 60%+ reduction in page load time ✅

---

## 📞 Support & Resources

### Learning Resources
- **FFmpeg Documentation:** https://ffmpeg.org/documentation.html
- **ImageMagick Guides:** https://imagemagick.org/Usage/
- **WebP Documentation:** https://developers.google.com/speed/webp/docs/using
- **Responsive Images Guide:** https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

### Testing Tools
- **Google Lighthouse:** https://developers.google.com/web/tools/lighthouse
- **WebPageTest:** https://www.webpagetest.org/
- **GTmetrix:** https://gtmetrix.com/
- **PageSpeed Insights:** https://pagespeed.web.dev/

---

## 📝 Notes & Tips

### General Best Practices
1. **Always keep originals** - Never delete source files
2. **Test quality** - View optimized images/videos before deploying
3. **Use version control** - Keep track of what's been optimized
4. **Measure impact** - Run performance tests before/after
5. **Progressive enhancement** - Provide fallbacks for older browsers

### File Naming Convention
```
Original: hero-section.mp4
Optimized: hero-section-optimized.mp4
Responsive: hero-section-desktop.mp4, hero-section-mobile.mp4
Format: hero-section-desktop.webp, hero-section-desktop.mp4
```

### Storage Structure Recommendation
```
/Website/
├── originals/          # Keep all source files
├── optimized/          # Optimized versions
│   ├── videos/
│   │   ├── desktop/
│   │   └── mobile/
│   └── images/
│       ├── products/
│       ├── profiles/
│       ├── course-content/
│       └── logos/
```

---

**Document Version:** 1.0
**Created:** 2025-10-24
**Last Updated:** 2025-10-24

---

## 🚀 Ready to Optimize!

Start with the **High Priority** videos and product thumbnails for maximum impact. Follow the checklist step-by-step, and you'll see significant performance improvements within 1-2 weeks.

Good luck! 💪🥊
