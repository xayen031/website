# BidMaster AI Website

This repository contains the codebase for the BidMaster AI website, built with Next.js 15.2.1, React 19.0.0, Framer Motion, Heroicons, and CSS modules.

## Contact Section Refactoring

The contact section has been refactored to enhance the mail section's functionality and design for BidMaster AI's B2B audience. The key changes include:

### Title and Layout
- Retained the headline 'Book Your Consultation' with bold Geist font (2.5rem)
- Added subtext 'Plan your consultation today' with italicized Geist font (1.2rem)
- Implemented a two-column flexbox layout with equal width columns (50% each)

### Enhanced Mail Section (Left Column)
- Created a card-based form with white background and subtle shadow
- Added two input fields:
  - 'Your Work Email' with envelope icon and validation
  - 'Company Name' with building icon
- Implemented a full-width submit button with hover effects
- Added privacy message below the form
- Implemented client-side validation for both fields
- Added success message on form submission
- Integrated with a mock API endpoint

### Calendly Embed (Right Column)
- Retained the Calendly embed with 400px height
- Added a header with calendar icon and "Select Your Time" text
- Configured the iframe to show a compact calendar view

### Visual Balance and Usability
- Set consistent margins and padding
- Added Framer Motion animations for enhanced user experience
- Used subtle borders to separate columns

### Footer Integration
- Maintained the full-width dark footer with copyright information
- Centered content with appropriate font sizes

### Responsive Design
- Implemented responsive adjustments for mobile devices
- Stacked columns vertically on smaller screens
- Adjusted font sizes and spacing for better mobile experience

### Performance and Testing
- Optimized animations for performance
- Added comments for future testing with B2B users

### API Integration

A mock API endpoint has been created at `/api/submit` to handle form submissions. In a production environment, this would be connected to:
- Database storage
- Email notification system
- CRM integration
- Analytics tracking

## Multilingual Support

The website now supports both English and Turkish languages with a language switch button at the top right of the hero section. Key features include:

### Language Switch Implementation
- A 'Türkçe' button at the top right of the hero section with a fixed position
- Uses a state management system to toggle between English and Turkish
- Includes a language indicator (e.g., 'EN | TR') next to the button

### Content Translation
- All static text across the site is available in both English and Turkish
- Translations are stored in a central `translations.js` file
- Text is dynamically rendered based on the selected language

### Visual Balance and Usability
- The language switch button has a consistent design with the rest of the site
- Button position is fixed at the top right with appropriate margins
- Includes a fade-in animation for smooth appearance

### Responsive Design
- The language switch adapts to different screen sizes
- On mobile devices, the button remains accessible without disrupting the layout

### Testing
- Recommended testing with 5-10 Turkish-speaking B2B users to validate translation accuracy and usability

## Testing Instructions

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact section
3. Test form validation by:
   - Submitting without filling fields
   - Entering invalid email formats
   - Entering valid information
4. Verify the success message appears after submission
5. Test the Calendly integration by clicking on available time slots
6. Test responsive behavior by resizing the browser window

## Testing Instructions for Multilingual Support

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the website and locate the language switch button at the top right
3. Click the button to toggle between English and Turkish
4. Verify that all text content changes appropriately
5. Test the form validation in both languages
6. Check that the Calendly embed adapts to the selected language
7. Test responsive behavior by resizing the browser window

## Future Improvements

- Implement actual backend integration
- Add analytics to track form submissions and Calendly bookings
- Conduct user testing with 5-10 B2B users
- Consider adding additional form fields based on user feedback
- Enhance accessibility features

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
