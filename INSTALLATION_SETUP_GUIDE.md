# KAL's Consulting App - Installation & Setup Guide

## Prerequisites

### System Requirements
- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Git**: For version control (optional but recommended)
- **Web Browser**: Chrome, Firefox, Safari, or Edge

### Installing Node.js
1. **Visit**: https://nodejs.org
2. **Download**: LTS version (recommended)
3. **Install**: Follow the installer instructions
4. **Verify**: Open terminal/command prompt and type:
   ```
   node --version
   npm --version
   ```

## Installation Steps

### 1. Install Dependencies
Open terminal/command prompt in the app folder and run:

```bash
npm install
```

This will install all required packages including:
- Next.js framework
- React components
- Tailwind CSS
- Accessibility libraries
- Theme management
- Social sharing components

### 2. Environment Configuration
Create a `.env.local` file in the root directory with:

```env
# App Configuration
NEXT_PUBLIC_APP_NAME="KAL's Consulting"
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database Configuration (when ready)
DATABASE_URL="your-database-connection-string"

# Authentication (when implementing)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL=http://localhost:3000

# Email Configuration (for contact forms)
SMTP_HOST="your-email-host"
SMTP_PORT=587
SMTP_USER="your-email@kalsconsulting.com"
SMTP_PASSWORD="your-email-password"

# Social Media Integration
FACEBOOK_APP_ID="your-facebook-app-id"
TWITTER_API_KEY="your-twitter-api-key"

# File Upload (for testimonials)
UPLOAD_MAX_SIZE=50MB
ALLOWED_FILE_TYPES="jpg,jpeg,png,mp4,mp3,wav"
```

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at: http://localhost:3000

### 4. Build for Production
When ready to deploy:
```bash
npm run build
npm start
```

## Project Structure

```
KAL-s-Consulting-App/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── about/          # About page
│   │   ├── admin/          # Admin dashboard
│   │   ├── services/       # Services page
│   │   ├── testimonials/   # Testimonials page
│   │   ├── contact/        # Contact page
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Main layout
│   │   └── page.tsx        # Homepage
│   └── components/         # Reusable components
│       ├── ui/             # Basic UI components
│       ├── providers/      # Context providers
│       ├── accessibility/  # Accessibility features
│       ├── testimonials/   # Testimonial components
│       └── admin/          # Admin components
├── public/                 # Static files
│   ├── icons/             # App icons
│   ├── images/            # Images and graphics
│   └── manifest.json      # PWA manifest
├── package.json           # Dependencies
├── tailwind.config.js     # Styling configuration
├── next.config.js         # Next.js configuration
└── README.md             # Project documentation
```

## Key Features Implemented

### ✅ Core Application
- Professional homepage with services
- About page with business information
- Contact form and information
- Responsive design for all devices

### ✅ Accessibility Features
- **Theme Provider**: Light/dark mode support
- **Accessibility Menu**: Font size, contrast, motion controls
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Keyboard Navigation**: Full app access via keyboard
- **High Contrast Mode**: Enhanced visibility
- **Reduced Motion**: Respects user preferences

### ✅ Testimonial System
- **Client Submission**: Text, audio, and video testimonials
- **Admin Moderation**: Approve, reject, or feature testimonials
- **Social Sharing**: Automatic social media post generation
- **Audio/Video Support**: 5-minute recording limits
- **Rating System**: 1-5 star client ratings

### ✅ Admin Dashboard
- **Testimonial Management**: Full moderation interface
- **Content Management**: Edit website content
- **Analytics Dashboard**: Performance metrics
- **User Management**: Role-based access control

### ✅ Social Media Integration
- **React Share**: Facebook, Twitter, LinkedIn, WhatsApp
- **Auto-Generation**: Branded social media posts
- **Custom Messages**: Editable post templates
- **Privacy Protection**: Client information security

## Configuration Options

### Customizing Colors and Branding
Edit `tailwind.config.js` to change color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your brand colors
        500: '#2563eb', // Main blue
        600: '#1d4ed8', // Darker blue
      },
      veteran: {
        // Veteran-themed colors
        500: '#0ea5e9', // Service blue
        600: '#0284c7', // Darker service blue
      }
    }
  }
}
```

### Adding Your Business Information
Update these files with your specific information:
- `src/app/page.tsx` - Homepage content
- `src/app/about/page.tsx` - Business story
- `src/app/services/page.tsx` - Service descriptions
- `src/app/contact/page.tsx` - Contact information

### Logo and Images
Replace files in `public/images/` with your:
- Business logo
- Professional headshots
- Service-related images
- Background images

## Security Setup

### Environment Variables
Never commit sensitive information. Keep these secure:
- Database passwords
- API keys
- Email credentials
- Social media tokens

### HTTPS Configuration
For production deployment, ensure:
- SSL certificate installed
- HTTPS redirects configured
- Secure headers enabled
- Content Security Policy set

### Data Protection
Implement proper:
- User authentication
- Data encryption
- Privacy policy compliance
- GDPR/CCPA requirements

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run accessibility tests
npm run test:a11y
```

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Navigation works on mobile/desktop
- [ ] Accessibility menu functions
- [ ] Dark/light mode toggle works
- [ ] Contact form submits properly
- [ ] Admin login functions
- [ ] Testimonial submission works
- [ ] Audio/video recording works
- [ ] Social sharing generates posts

## Deployment Options

### 1. Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### 2. Netlify
```bash
npm run build
# Upload 'out' folder to Netlify
```

### 3. Traditional Hosting
```bash
npm run build
npm run export
# Upload 'out' folder to web server
```

## Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit
npm audit fix
```

### Performance Monitoring
- Monitor page load speeds
- Check mobile responsiveness
- Test accessibility features
- Verify social media integration

### Content Updates
- Review business information quarterly
- Update service descriptions as needed
- Refresh testimonials regularly
- Add new features based on user feedback

## Troubleshooting

### Common Installation Issues

**Node.js Version Error**:
```
Error: Requires Node.js 18.0 or higher
```
**Solution**: Update Node.js from https://nodejs.org

**npm Install Fails**:
```
npm ERR! peer dep missing
```
**Solution**: Clear npm cache and reinstall
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 Already in Use**:
```
Error: Port 3000 is already in use
```
**Solution**: Use different port
```bash
npm run dev -- --port 3001
```

### Development Issues

**Styles Not Loading**:
- Check Tailwind CSS configuration
- Verify CSS imports in layout.tsx
- Clear browser cache

**Components Not Rendering**:
- Check for JavaScript errors in browser console
- Verify component imports
- Check for missing dependencies

**Accessibility Features Not Working**:
- Verify providers are properly wrapped
- Check browser compatibility
- Test with different accessibility tools

## Getting Help

### Documentation
- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React**: https://react.dev

### Support Contact
- **Technical Issues**: [support-email]@kalsconsulting.com
- **Feature Requests**: [features-email]@kalsconsulting.com
- **Emergency Support**: [phone-number]

### Community Resources
- **Next.js Discord**: https://discord.gg/nextjs
- **Stack Overflow**: Tag questions with "nextjs" and "kalsconsulting"
- **GitHub Issues**: Report bugs in the project repository

---

*This installation guide provides everything needed to set up and run the KAL's Consulting app. Follow the steps in order for the smoothest setup experience.*

**Setup Time**: 15-30 minutes  
**Difficulty**: Beginner-friendly  
**Support Available**: Full technical support included