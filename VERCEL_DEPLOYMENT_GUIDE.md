# 🌐 Vercel Frontend Deployment Guide

## 📋 **Prerequisites**
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Your School Directory project ready for deployment

## 🚀 **Step 1: Prepare Your Repository**

### 1.1 Initialize Git Repository (if not already done)
```bash
# Navigate to your project root
cd C:\Users\devas\OneDrive\Desktop\assignment

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: School Directory Application"
```

### 1.2 Create GitHub Repository
1. Go to [github.com](https://github.com) and create a new repository
2. Name it: `school-directory-app`
3. Set it as **Public** or **Private** (your choice)
4. **Don't** initialize with README, .gitignore, or license (since you already have files)

### 1.3 Push Code to GitHub
```bash
# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/school-directory-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🎯 **Step 2: Deploy Frontend to Vercel**

### 2.1 Import Project to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository: `school-directory-app`
5. Click **"Import"**

### 2.2 Configure Build Settings
Vercel should auto-detect your setup, but verify:

**Framework Preset**: `Vite`
**Root Directory**: `client` ⚠️ **IMPORTANT**
**Build Command**: `npm run build`
**Output Directory**: `dist`
**Install Command**: `npm install`

### 2.3 Add Environment Variables
Before deploying, add your environment variable:

1. In the Vercel import page, scroll to **"Environment Variables"**
2. Add the following:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://placeholder-backend.onrender.com` (we'll update this after backend deployment)
   - **Environment**: `Production`

### 2.4 Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete (usually 2-5 minutes)
3. You'll get a URL like: `https://your-app-name.vercel.app`

## 📝 **Step 3: Post-Deployment Configuration**

### 3.1 Note Your Vercel URL
Save your Vercel URL - you'll need it for backend CORS configuration:
```
https://your-app-name.vercel.app
```

### 3.2 Custom Domain (Optional)
1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain if you have one

## 🔧 **Step 4: Update Backend URL (After Backend Deployment)**

After you deploy your backend to Render:

### 4.1 Update Environment Variable
1. Go to Vercel dashboard → Your project
2. Click **"Settings"** → **"Environment Variables"**
3. Find `VITE_API_BASE_URL`
4. Click **"Edit"**
5. Update value to your Render backend URL: `https://your-backend.onrender.com`
6. Click **"Save"**

### 4.2 Trigger Redeployment
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on the latest deployment
3. Wait for redeployment to complete

## ✅ **Step 5: Verification**

### 5.1 Test Your Frontend
Visit your Vercel URL and verify:
- [ ] Page loads without errors
- [ ] All styles and assets load correctly
- [ ] Navigation works properly
- [ ] Console shows no critical errors

### 5.2 Check Build Logs (If Issues)
If deployment fails:
1. Go to **"Deployments"** tab
2. Click on the failed deployment
3. Check **"Build Logs"** for errors

## 🐛 **Common Issues & Solutions**

### Issue 1: Build Fails - TypeScript Errors
**Solution**: Fix TypeScript errors locally first
```bash
cd client
npm run build
# Fix any errors shown
```

### Issue 2: Assets Not Loading
**Solution**: Check if all imports are correct and files exist in the repository

### Issue 3: Environment Variables Not Working
**Solution**: 
- Ensure variable name starts with `VITE_`
- Redeploy after adding environment variables
- Check case sensitivity

### Issue 4: Routing Issues (404 on refresh)
**Solution**: The `vercel.json` file should handle this, but verify it's in the `client` directory

## 🎯 **Vercel Project Settings Summary**

**Final Configuration**:
- **Framework**: Vite
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: 18.x (default)
- **Environment Variables**: `VITE_API_BASE_URL`

## 🔗 **Next Steps**
1. ✅ Frontend deployed to Vercel
2. 🔄 Deploy backend to Render (see `RENDER_DEPLOYMENT_GUIDE.md`)
3. 🔄 Update environment variables with actual URLs
4. 🔄 Test full application functionality

## 📞 **Support**
If you encounter issues:
1. Check Vercel build logs
2. Verify all files are committed to GitHub
3. Ensure `vercel.json` is in the correct location
4. Check that environment variables are properly set

Your frontend should now be live at `https://your-app-name.vercel.app`! 🎉
