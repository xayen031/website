# Multilingual Implementation Guide for BidMaster AI

This document provides guidelines for implementing and extending the multilingual support in the BidMaster AI website.

## Current Implementation

The website currently supports English (en) and Turkish (tr) languages. The implementation includes:

1. A central `translations.js` file with all text content in both languages
2. A language context (`LanguageContext.js`) to manage the language state
3. A language switch component (`LanguageSwitch.js`) to toggle between languages
4. Integration with existing components (ContactSection, Hero, etc.)

## How to Add a New Component with Multilingual Support

To add a new component with multilingual support, follow these steps:

### 1. Add Translations

First, add the necessary translations to the `translations.js` file:

```javascript
const translations = {
  en: {
    // Existing translations...
    
    // Add your new component translations
    newComponentTitle: "Your English Title",
    newComponentDescription: "Your English description text",
    // Add more as needed
  },
  tr: {
    // Existing translations...
    
    // Add your new component translations
    newComponentTitle: "Your Turkish Title",
    newComponentDescription: "Your Turkish description text",
    // Add more as needed
  }
};
```

### 2. Create Your Component

Create your component with language support:

```javascript
'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';
import './YourComponent.css';

export default function YourComponent() {
  // Get the current language and translations
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="your-component">
      <div className="your-component__content">
        <h2>{t.newComponentTitle}</h2>
        <p>{t.newComponentDescription}</p>
        {/* Add more content using translations */}
      </div>
    </section>
  );
}
```

### 3. Add to Page

Add your component to the page:

```javascript
import YourComponent from './components/YourComponent';

export default function Home() {
  return (
    <main>
      <LanguageSwitch />
      <Hero />
      {/* Other components */}
      <YourComponent />
      <ContactSection />
    </main>
  );
}
```

## How to Add a New Language

To add support for a new language, follow these steps:

### 1. Update Translations

Add the new language to the `translations.js` file:

```javascript
const translations = {
  en: {
    // English translations...
  },
  tr: {
    // Turkish translations...
  },
  fr: {
    // French translations
    languageSwitch: "English",
    languageIndicator: "FR | EN",
    
    // Add all required translations
    heroTitle: "Gagnez plus d'appels d'offres avec BidMaster AI",
    // ...and so on for all text content
  }
};
```

### 2. Update Language Switch Component

Modify the `LanguageSwitch.js` component to support multiple languages:

```javascript
'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';
import './LanguageSwitch.css';

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  
  // Define available languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'fr', name: 'Français' }
  ];
  
  // Get languages other than the current one
  const otherLanguages = languages.filter(lang => lang.code !== language);
  
  return (
    <motion.div 
      className="language-switch"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="language-switch__dropdown">
        <span className="language-switch__current">
          {language.toUpperCase()}
        </span>
        <div className="language-switch__options">
          {otherLanguages.map(lang => (
            <button
              key={lang.code}
              className="language-switch__option"
              onClick={() => setLanguage(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
```

### 3. Update Language Context

Modify the `LanguageContext.js` to support setting any language:

```javascript
'use client';

import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
```

## Best Practices

1. **Keep translations organized**: Group related translations together in the translations file
2. **Use descriptive keys**: Make translation keys descriptive of their content
3. **Test thoroughly**: Test all languages on different devices and screen sizes
4. **Consider RTL languages**: If adding languages like Arabic or Hebrew, implement RTL support
5. **Optimize loading**: Consider lazy-loading translations for better performance
6. **Validate with native speakers**: Have translations reviewed by native speakers
7. **Consider SEO**: Implement proper language meta tags and URL structures for SEO

## Testing

Always test your multilingual implementation with:

1. Native speakers of each language
2. Different devices and screen sizes
3. Different browsers
4. Screen readers and accessibility tools

## Future Improvements

Consider these future improvements:

1. Server-side language detection based on user's browser settings
2. URL-based language selection (e.g., /tr/contact, /en/contact)
3. Persistent language preference using localStorage
4. Automatic translation of dynamic content
5. Integration with a translation management system for easier updates

## Ensuring Complete Translation Coverage

To ensure that all text content is properly translated, follow these steps:

### 1. Identify All Text Content

Go through each component in your application and identify all text content that needs to be translated, including:

- Headings and subheadings
- Paragraphs and descriptions
- Button labels and call-to-action text
- Form labels, placeholders, and validation messages
- Success and error messages
- Alt text for images
- Meta data (titles, descriptions)
- Footer content

### 2. Add to Translations File

Add all identified text to the `translations.js` file, organizing them by component or section:

```javascript
const translations = {
  en: {
    // Component 1
    component1Title: "English Title",
    component1Description: "English description",
    
    // Component 2
    component2Title: "Another English Title",
    // ...
  },
  tr: {
    // Component 1
    component1Title: "Turkish Title",
    component1Description: "Turkish description",
    
    // Component 2
    component2Title: "Another Turkish Title",
    // ...
  }
};
```

### 3. Update Components

Update each component to use the translations:

```javascript
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';

export default function YourComponent() {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <div>
      <h2>{t.component1Title}</h2>
      <p>{t.component1Description}</p>
      {/* ... */}
    </div>
  );
}
```

### 4. Check for Missing Translations

Regularly check for missing translations by:

- Using a linting tool to identify hardcoded strings
- Implementing a development-mode warning for missing translations
- Creating a script to compare translation keys between languages

### 5. Test Thoroughly

Test your application in all supported languages to ensure:

- All text is properly translated
- No hardcoded strings remain
- Layout accommodates different text lengths
- Special characters display correctly 