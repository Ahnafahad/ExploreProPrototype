# ExplorePro Mobile - Deployment Guide

## Vercel Deployment

This application is optimized for deployment on Vercel with zero configuration.

### Quick Deploy

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Import to Vercel:**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import the repository: `Ahnafahad/ExploreProPrototype`
   - Click "Deploy" (all settings are pre-configured)

3. **Done!** Your app will be live at `https://your-project.vercel.app`

### Features

- **Zero Dependencies Issues:** All dependencies are npm-based, no CDN or external APIs
- **Mobile-First Design:** Optimized viewport settings for mobile devices
- **Fast Build Times:** ~3 seconds build time
- **Optimized Bundle:** Tailwind CSS purges unused styles (42.85 kB CSS)
- **Production Ready:** Security headers and caching configured

### Build Configuration

The project uses:
- **Framework:** Vite + React 19
- **Styling:** Tailwind CSS 3
- **TypeScript:** Full type safety
- **Build Output:** Static HTML/CSS/JS in `dist/`

### Environment

No environment variables required. The app runs completely client-side.

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Mobile Testing

The app is designed to look like a native iOS app with:
- iPhone frame simulation
- Dynamic Island/notch styling
- iOS status bar
- Home indicator
- iOS-style navigation and animations

Best viewed on mobile devices or in mobile viewport mode (393x852).

### Performance

- **First Load:** ~344 KB JS (gzipped: 89 KB)
- **CSS:** 42.85 KB (gzipped: 7.59 KB)
- **HTML:** 0.95 KB (gzipped: 0.50 KB)

### Troubleshooting

If build fails:
1. Ensure Node.js ≥20.19.0
2. Delete `node_modules` and `package-lock.json`
3. Run `npm install` again
4. Run `npm run build`

For Vercel-specific issues, check:
- Build logs in Vercel dashboard
- Ensure `vercel.json` is present
- Verify all dependencies are in `package.json`
