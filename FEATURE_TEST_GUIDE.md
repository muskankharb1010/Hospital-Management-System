# Feature Testing Guide

## Quick Start

### 1. Login as Admin
```
Email: admin@hospital.com
Password: admin123
```
Navigate to Dashboard → Full access to all admin features

### 2. Login as Patient
```
Email: patient@hospital.com
Password: patient123
```
Navigate to Patient Dashboard → Personal appointments & records

---

## Feature Tests

### 1. Dark/Light Theme Toggle
**Location:** Top-right corner (navbar or dashboard header)

**Test Steps:**
1. Click the sun/moon icon
2. Page should smoothly transition to dark mode
3. Reload the page → theme persists
4. Check all pages → theme applies everywhere
5. Toggle back to light mode

**Expected Result:** Smooth color transitions, persistent theme, no flash

---

### 2. Book Appointment (Admin)
**Location:** Dashboard → Appointments → "Book Appointment" button

**Test Steps:**
1. Click "Book Appointment" button
2. Modal appears with smooth animation
3. Fill in patient name
4. Select a doctor from dropdown
5. Click "Next" → proceed to step 2
6. Select date (any future date)
7. Select time
8. Click "Next" → proceed to step 3
9. Select appointment type
10. Describe reason for visit
11. Click "Book Appointment"
12. See loading spinner
13. Modal closes smoothly

**Expected Result:**
- All fields show data clearly (no "...")
- Progress indicator shows current step
- Smooth step transitions with animations
- Form validation shows errors
- Loading spinner appears on submit
- Modal closes after 1.2 seconds

---

### 3. Book Appointment (Patient)
**Location:** Patient Dashboard → "Book Appointment" button

**Test Steps:**
1. As patient user, click "Book Appointment"
2. Patient name pre-fills
3. Follow same process as admin
4. Modal shows same improved UX

**Expected Result:** Same smooth experience with pre-filled patient data

---

### 4. Add Doctor
**Location:** Dashboard → Doctors → "Add Doctor" button (green button)

**Test Steps:**
1. Click "Add Doctor" button
2. Modal appears with form fields
3. Fill all required fields:
   - Doctor name
   - Specialization
   - Department (dropdown)
   - Email
   - Phone
   - Years of experience
   - Qualification
4. Select availability status
5. Click "Add Doctor"
6. See loading animation
7. Modal closes after 1.2 seconds

**Expected Result:**
- Modal has smooth scale animation on open
- Form fields have focus states
- All validations work
- Loading spinner shows
- Modal closes smoothly

---

### 5. Form Validation
**Test in any form (Doctor, Appointment)**

**Test Steps:**
1. Try to submit empty form
2. Errors appear with animated reveal
3. Each error has an icon
4. Focus on field → error disappears
5. Re-fill field → error stays gone

**Expected Result:**
- Animated error messages
- Error icons clearly visible
- Real-time validation feedback

---

### 6. Mobile Responsiveness
**Test on all screen sizes**

**Desktop (1920px+):**
- Theme toggle visible
- All features fully accessible
- Smooth animations

**Tablet (768px-1024px):**
- Responsive modal sizing
- Touch-friendly buttons
- Hamburger menu works

**Mobile (320px-768px):**
- All modals responsive
- Forms stack properly
- Buttons easily tappable

---

### 7. Animations & Performance
**Test across browser tabs**

**Steps:**
1. Open multiple dashboard pages
2. Switch between tabs
3. Observe animation smoothness
4. Check DevTools → Performance tab
5. Animations should not cause jank

**Expected Result:**
- Smooth 60fps animations
- No layout shift
- No stuttering on transitions

---

## Troubleshooting

### Dark Mode Not Persisting
- Check browser localStorage is enabled
- Clear localStorage: `localStorage.clear()`
- Reload page

### Appointment Modal Not Closing
- Check browser console for errors
- Try refreshing the page
- Verify all required fields are filled

### Animations Look Jittery
- Close other browser tabs
- Disable browser extensions
- Clear cache and reload
- Try a different browser

### Add Doctor Button Not Showing
- Ensure you're logged in as admin
- Navigate to Dashboard → Doctors
- Refresh the page

---

## Performance Checklist

- [ ] Dark mode toggle is instant
- [ ] Modals open/close smoothly
- [ ] Form steps transition smoothly
- [ ] No console errors
- [ ] Loading spinners animate
- [ ] Buttons respond immediately to clicks
- [ ] Scroll behavior is smooth
- [ ] Theme persists on reload

---

## Browser Testing

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## Notes for Developers

### Adding New Framer Motion Components
```tsx
import { motion, AnimatePresence } from "framer-motion";

// Fade in animation
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  Content
</motion.div>
```

### Checking Theme in Components
```tsx
import { useTheme } from "@/lib/theme-context";

export function MyComponent() {
  const { theme } = useTheme();
  // theme is "light" or "dark"
}
```

### CSS Dark Mode Selector
```css
:root {
  /* Light mode variables */
}

.dark {
  /* Dark mode variables */
}
```

---

## Success Criteria

All features are working correctly when:
- ✅ Theme toggle changes colors smoothly
- ✅ Appointment modal shows all data clearly
- ✅ Add doctor modal validates and submits
- ✅ Forms don't show "..." truncation
- ✅ All animations are smooth (60fps)
- ✅ Mobile responsive on all devices
- ✅ No console errors
- ✅ Theme persists on page reload
