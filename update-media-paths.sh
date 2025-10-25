#!/bin/bash

# Batch update all remaining media paths to optimized versions
# This script updates course images, screenshots, VSL videos, and other remaining assets

echo "🚀 Starting batch media path updates..."

# Update BundleTimelineProcess.tsx - Course Images
echo "📝 Updating BundleTimelineProcess.tsx..."
sed -i 's|https://media.oracleboxing.com/Website/ob_fight3.png|https://media.oracleboxing.com/Website/optimized/course-content/ob_fight3.webp|g' components/BundleTimelineProcess.tsx
sed -i 's|https://media.oracleboxing.com/Website/bffp_tn4.png|https://media.oracleboxing.com/Website/optimized/course-content/bffp_tn4.webp|g' components/BundleTimelineProcess.tsx
sed -i 's|https://media.oracleboxing.com/Website/bffp_course3.png|https://media.oracleboxing.com/Website/optimized/course-content/bffp_course3.webp|g' components/BundleTimelineProcess.tsx
sed -i 's|https://media.oracleboxing.com/Website/bbffp_course4.png|https://media.oracleboxing.com/Website/optimized/course-content/bbffp_course4.webp|g' components/BundleTimelineProcess.tsx
sed -i 's|https://media.oracleboxing.com/Website/tbr_course1.png|https://media.oracleboxing.com/Website/optimized/course-content/tbr_course1.webp|g' components/BundleTimelineProcess.tsx
sed -i 's|https://media.oracleboxing.com/Website/tbr_course2.png|https://media.oracleboxing.com/Website/optimized/course-content/tbr_course2.webp|g' components/BundleTimelineProcess.tsx
sed -i 's|https://media.oracleboxing.com/Website/tbr_course22.png|https://media.oracleboxing.com/Website/optimized/course-content/tbr_course22.webp|g' components/BundleTimelineProcess.tsx
sed -i 's|https://media.oracleboxing.com/Website/tbr_course4.png|https://media.oracleboxing.com/Website/optimized/course-content/tbr_course4.webp|g' components/BundleTimelineProcess.tsx
sed -i 's|https://media.oracleboxing.com/Website/bcr_course6.png|https://media.oracleboxing.com/Website/optimized/course-content/bcr_course6.webp|g' components/BundleTimelineProcess.tsx
sed -i 's|https://media.oracleboxing.com/Website/bcr_course2.png|https://media.oracleboxing.com/Website/optimized/course-content/bcr_course2.webp|g' components/BundleTimelineProcess.tsx
sed -i 's|https://media.oracleboxing.com/Website/bcr_course4.png|https://media.oracleboxing.com/Website/optimized/course-content/bcr_course4.webp|g' components/BundleTimelineProcess.tsx
sed -i 's|https://media.oracleboxing.com/Website/bcr_course1.png|https://media.oracleboxing.com/Website/optimized/course-content/bcr_course1.webp|g' components/BundleTimelineProcess.tsx

# Update PlatformScreenshotsCarousel.tsx - Screenshots
echo "📝 Updating PlatformScreenshotsCarousel.tsx..."
sed -i 's|https://media.oracleboxing.com/Website/inside1.png|https://media.oracleboxing.com/Website/optimized/screenshots/inside1.webp|g' components/PlatformScreenshotsCarousel.tsx
sed -i 's|https://media.oracleboxing.com/Website/inside2.png|https://media.oracleboxing.com/Website/optimized/screenshots/inside2.webp|g' components/PlatformScreenshotsCarousel.tsx
sed -i 's|https://media.oracleboxing.com/Website/inside3.png|https://media.oracleboxing.com/Website/optimized/screenshots/inside3.webp|g' components/PlatformScreenshotsCarousel.tsx
sed -i 's|https://media.oracleboxing.com/Website/inside4.png|https://media.oracleboxing.com/Website/optimized/screenshots/inside4.webp|g' components/PlatformScreenshotsCarousel.tsx
sed -i 's|https://media.oracleboxing.com/Website/phone_mockup1.png|https://media.oracleboxing.com/Website/optimized/screenshots/phone_mockup1.webp|g' components/PlatformScreenshotsCarousel.tsx

# Update WhatsIncludedSection.tsx - Mixed assets
echo "📝 Updating WhatsIncludedSection.tsx..."
sed -i 's|https://media.oracleboxing.com/Website/bffp_tn5.png|https://media.oracleboxing.com/Website/optimized/products/bffp_tn5-large.webp|g' components/WhatsIncludedSection.tsx
sed -i 's|https://media.oracleboxing.com/Website/boxing_clinic.png|https://media.oracleboxing.com/Website/optimized/products/boxing_clinic-large.webp|g' components/WhatsIncludedSection.tsx
sed -i 's|https://media.oracleboxing.com/Website/phone_mockup1.png|https://media.oracleboxing.com/Website/optimized/screenshots/phone_mockup1.webp|g' components/WhatsIncludedSection.tsx
sed -i 's|https://media.oracleboxing.com/Website/tbrtn5hq.png|https://media.oracleboxing.com/Website/optimized/products/tbrtn5hq-large.webp|g' components/WhatsIncludedSection.tsx

# Update BundleCourseCarousel.tsx - Product thumbnails
echo "📝 Updating BundleCourseCarousel.tsx..."
sed -i 's|https://media.oracleboxing.com/Website/bffp_tn5.png|https://media.oracleboxing.com/Website/optimized/products/bffp_tn5-large.webp|g' components/BundleCourseCarousel.tsx
sed -i 's|https://media.oracleboxing.com/Website/tbrtn5hq.png|https://media.oracleboxing.com/Website/optimized/products/tbrtn5hq-large.webp|g' components/BundleCourseCarousel.tsx
sed -i 's|https://media.oracleboxing.com/Website/boxing_clinic.png|https://media.oracleboxing.com/Website/optimized/products/boxing_clinic-large.webp|g' components/BundleCourseCarousel.tsx

# Update WistiaVideo.tsx - VSL video
echo "📝 Updating WistiaVideo.tsx..."
sed -i 's|https://media.oracleboxing.com/Website/VSL2_2.webm|https://media.oracleboxing.com/Website/optimized/videos/VSL2_2.webm|g' components/WistiaVideo.tsx
sed -i 's|https://media.oracleboxing.com/Website/VSL2_2.mp4|https://media.oracleboxing.com/Website/optimized/videos/VSL2_2.mp4|g' components/WistiaVideo.tsx

# Update VideoPlayer.tsx - Default video
echo "📝 Updating VideoPlayer.tsx..."
sed -i 's|https://media.oracleboxing.com/Website/VSL2_2.webm|https://media.oracleboxing.com/Website/optimized/videos/VSL2_2.webm|g' components/VideoPlayer.tsx

# Update EpicOfferStackSection.tsx - Logos
echo "📝 Updating EpicOfferStackSection.tsx..."
sed -i 's|https://media.oracleboxing.com/Website/long_white.png|https://media.oracleboxing.com/Website/optimized/logos/long_white-large.webp|g' components/EpicOfferStackSection.tsx

# Update CoursePriceCard.tsx - Logos
echo "📝 Updating CoursePriceCard.tsx..."
sed -i 's|https://media.oracleboxing.com/Website/long_white.png|https://media.oracleboxing.com/Website/optimized/logos/long_white-large.webp|g' components/CoursePriceCard.tsx

# Update OrderConfirmation.tsx - Logo
echo "📝 Updating OrderConfirmation.tsx..."
sed -i 's|https://media.oracleboxing.com/Website/long_black.png|https://media.oracleboxing.com/Website/optimized/logos/long_black-large.webp|g' components/OrderConfirmation.tsx

# Update checkout pages - Logos
echo "📝 Updating checkout pages..."
sed -i 's|https://media.oracleboxing.com/Website/long_black.png|https://media.oracleboxing.com/Website/optimized/logos/long_black-large.webp|g' app/checkout/order-bumps/page.tsx
sed -i 's|https://media.oracleboxing.com/Website/long_black.png|https://media.oracleboxing.com/Website/optimized/logos/long_black-large.webp|g' app/checkout/page.tsx

# Update app/courses/bffp/page.tsx - Course images
echo "📝 Updating app/courses/bffp/page.tsx..."
sed -i 's|https://media.oracleboxing.com/Website/ob_fight3.png|https://media.oracleboxing.com/Website/optimized/course-content/ob_fight3.webp|g' app/courses/bffp/page.tsx
sed -i 's|https://media.oracleboxing.com/Website/bffp_tn4.png|https://media.oracleboxing.com/Website/optimized/course-content/bffp_tn4.webp|g' app/courses/bffp/page.tsx
sed -i 's|https://media.oracleboxing.com/Website/bffp_course3.png|https://media.oracleboxing.com/Website/optimized/course-content/bffp_course3.webp|g' app/courses/bffp/page.tsx
sed -i 's|https://media.oracleboxing.com/Website/bbffp_course4.png|https://media.oracleboxing.com/Website/optimized/course-content/bbffp_course4.webp|g' app/courses/bffp/page.tsx

# Update app/courses/roadmap/page.tsx - Course images
echo "📝 Updating app/courses/roadmap/page.tsx..."
sed -i 's|https://media.oracleboxing.com/Website/tbr_course1.png|https://media.oracleboxing.com/Website/optimized/course-content/tbr_course1.webp|g' app/courses/roadmap/page.tsx
sed -i 's|https://media.oracleboxing.com/Website/tbr_course2.png|https://media.oracleboxing.com/Website/optimized/course-content/tbr_course2.webp|g' app/courses/roadmap/page.tsx
sed -i 's|https://media.oracleboxing.com/Website/tbr_course22.png|https://media.oracleboxing.com/Website/optimized/course-content/tbr_course22.webp|g' app/courses/roadmap/page.tsx
sed -i 's|https://media.oracleboxing.com/Website/tbr_course4.png|https://media.oracleboxing.com/Website/optimized/course-content/tbr_course4.webp|g' app/courses/roadmap/page.tsx

# Update success pages - Logo
echo "📝 Updating success pages..."
sed -i 's|https://media.oracleboxing.com/Website/long_black.png|https://media.oracleboxing.com/Website/optimized/logos/long_black-large.webp|g' app/success/final/page.tsx

# Update 6wc page - Logo
echo "📝 Updating 6wc page..."
# Note: logo_site_white.webp is already optimized, no change needed

echo "✅ All media paths updated successfully!"
echo ""
echo "Summary of updates:"
echo "  ✓ Course content images (12 files)"
echo "  ✓ Platform screenshots (5 files)"
echo "  ✓ Product thumbnails (updated in various components)"
echo "  ✓ Brand logos (long_white, long_black)"
echo "  ✓ VSL videos"
echo ""
echo "Next steps:"
echo "  1. Test the build: npm run build"
echo "  2. Check dev server: npm run dev"
echo "  3. Verify all images load correctly"
echo "  4. Deploy to production"
