# Troubleshooting Guide

## Common Issues and Solutions

### Issue: Tailwind CSS Not Working

**Error:**
```
[postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin
```

**Solution:**
Make sure you have the correct versions installed:
```bash
npm install -D tailwindcss@^3.4.0 postcss@^8.4.0 autoprefixer@^10.4.0
```

Verify `postcss.config.js`:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

### Issue: Dev Server Won't Start

**Solution:**
1. Kill any running Node processes:
```bash
# Windows
taskkill /F /IM node.exe

# Mac/Linux
killall node
```

2. Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

3. Start dev server:
```bash
npm run dev
```

---

### Issue: Port Already in Use

**Error:**
```
Port 5173 is already in use
```

**Solution:**
1. Kill the process using port 5173:
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill
```

2. Or use a different port:
```bash
npm run dev -- --port 3000
```

---

### Issue: Styles Not Loading

**Solution:**
1. Check that `index.css` is imported in `main.tsx`
2. Verify Tailwind directives are in `index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Restart dev server

---

### Issue: TypeScript Errors

**Solution:**
1. Check `tsconfig.json` is properly configured
2. Restart TypeScript server in VS Code:
   - Press `Ctrl+Shift+P`
   - Type "TypeScript: Restart TS Server"
   - Press Enter

---

### Issue: Components Not Rendering

**Solution:**
1. Check browser console for errors (F12)
2. Verify all imports are correct
3. Check that React Router is properly configured
4. Clear localStorage and refresh:
```js
// In browser console
localStorage.clear()
location.reload()
```

---

### Issue: Mock Data Not Loading

**Solution:**
1. Check browser console for errors
2. Clear localStorage:
```js
localStorage.removeItem('rasmi-erp-storage')
```
3. Refresh the page
4. Mock data will be re-initialized

---

### Issue: Login Not Working

**Solution:**
1. Use one of the quick login buttons
2. Or enter exact email from demo users:
   - `admin@rasmi.com`
   - `rajesh@rasmi.com`
   - `suresh@rasmi.com`
   - `amit@rasmi.com`
   - `vijay@rasmi.com`

---

### Issue: Build Fails

**Error:**
```
npm run build fails
```

**Solution:**
1. Check for TypeScript errors:
```bash
npm run type-check
```

2. Fix any type errors

3. Try building again:
```bash
npm run build
```

---

### Issue: Blank Page After Login

**Solution:**
1. Check browser console for routing errors
2. Verify React Router is installed:
```bash
npm list react-router-dom
```

3. If missing, install:
```bash
npm install react-router-dom
```

---

### Issue: Icons Not Showing

**Solution:**
1. Verify lucide-react is installed:
```bash
npm list lucide-react
```

2. If missing:
```bash
npm install lucide-react
```

---

### Issue: State Not Persisting

**Solution:**
1. Check localStorage is enabled in browser
2. Check browser console for quota errors
3. Try clearing localStorage and starting fresh:
```js
localStorage.clear()
```

---

### Issue: CSS Warnings in Console

**Warning:**
```
Unknown at rule @tailwind
Unknown at rule @apply
```

**Note:** These warnings are normal and can be ignored. They appear because the CSS language server doesn't recognize Tailwind directives, but they work correctly at runtime.

---

### Issue: Module Not Found

**Error:**
```
Cannot find module 'xyz'
```

**Solution:**
1. Install missing dependency:
```bash
npm install xyz
```

2. If it's a dev dependency:
```bash
npm install -D xyz
```

3. Restart dev server

---

### Issue: Hot Reload Not Working

**Solution:**
1. Check that files are being saved
2. Restart dev server
3. Check Vite config for HMR settings
4. Try hard refresh: `Ctrl+Shift+R`

---

## Getting Help

If you encounter an issue not listed here:

1. **Check Browser Console** (F12) for error messages
2. **Check Terminal** for build/server errors
3. **Clear Cache** and restart:
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```
4. **Fresh Install**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

---

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit

# Clear cache
rm -rf node_modules/.vite

# Fresh install
rm -rf node_modules package-lock.json && npm install
```

---

## Browser DevTools Tips

1. **React DevTools**: Install React DevTools extension
2. **Console**: Check for errors and warnings
3. **Network Tab**: Monitor API calls (when backend is integrated)
4. **Application Tab**: View localStorage data
5. **Elements Tab**: Inspect CSS and styles

---

## Performance Issues

If the app is slow:

1. Check browser extensions (disable ad blockers temporarily)
2. Clear browser cache
3. Check system resources (RAM, CPU)
4. Try a different browser
5. Restart computer

---

## Development Tips

1. **Use TypeScript**: It catches errors before runtime
2. **Check Console**: Always keep browser console open
3. **Hot Reload**: Save files to see changes instantly
4. **Component Isolation**: Test components individually
5. **Mock Data**: Use mock data for testing workflows

---

**Last Updated**: May 21, 2026
