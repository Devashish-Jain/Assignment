# 🚀 Render Backend Deployment Guide

## 📋 **Prerequisites**
- GitHub account with your code already pushed
- Render account (sign up at [render.com](https://render.com))
- SkySQL database credentials ready

## 🎯 **Step 1: Create Render Account & Connect GitHub**

### 1.1 Sign Up for Render
1. Go to [render.com](https://render.com)
2. Click **"Get Started"**
3. Sign up with your GitHub account (recommended)
4. Verify your email if required

### 1.2 Connect GitHub Repository
1. In Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Click **"Connect a repository"**
4. Authorize Render to access your GitHub repositories
5. Select your `school-directory-app` repository

## 🔧 **Step 2: Configure Web Service**

### 2.1 Basic Configuration
Fill in the following details:

**Name**: `school-directory-backend`
**Region**: `Oregon (US West)` or `Frankfurt (EU Central)` (choose closest to your users)
**Branch**: `main`
**Root Directory**: `server` ⚠️ **IMPORTANT**
**Runtime**: `Node`
**Build Command**: `npm ci && npm run build`
**Start Command**: `npm start`

### 2.2 Service Plans
- **Free Plan**: Select "Free" for testing (has limitations)
- **Paid Plan**: Select "Starter" ($7/month) for better performance (recommended for production)

### 2.3 Advanced Settings
**Auto-Deploy**: `Yes` (enabled by default)

## 🔐 **Step 3: Add Environment Variables**

### 3.1 Add Database Environment Variables
In the "Environment Variables" section, add these one by one:

```env
NODE_ENV=production
PORT=10000
DB_HOST=serverless-us-central1.sysp0000.db2.skysql.com
DB_PORT=4057
DB_USER=dbpgf01458622
DB_PASSWORD=%a(y77HQkPtezYXA89b*K
DB_NAME=defaultdb
FRONTEND_URL=https://placeholder-frontend.vercel.app
```

⚠️ **Important**: 
- Use your actual SkySQL database credentials
- `FRONTEND_URL` will be updated after Vercel deployment
- Each variable should be added separately (Name → Value)

### 3.2 Environment Variables Setup
For each variable:
1. Click **"Add Environment Variable"**
2. Enter **Name** (e.g., `NODE_ENV`)
3. Enter **Value** (e.g., `production`)
4. Click **"Add"**

## 🚀 **Step 4: Deploy Backend**

### 4.1 Start Deployment
1. Review all settings
2. Click **"Create Web Service"**
3. Render will start building and deploying your service
4. This process takes 5-15 minutes

### 4.2 Monitor Deployment
Watch the deployment logs:
1. You'll see build logs in real-time
2. Look for successful database connection: `✅ Database connected successfully to SkySQL`
3. Look for server start message: `🚀 School Directory Server Started Successfully!`

### 4.3 Get Your Backend URL
Once deployed successfully:
1. Your service URL will be: `https://school-directory-backend.onrender.com`
2. Copy this URL - you'll need it for frontend configuration

## ✅ **Step 5: Verify Backend Deployment**

### 5.1 Test Health Check
1. Open your browser
2. Go to: `https://your-backend-url.onrender.com/health`
3. You should see a JSON response like:
```json
{
  "success": true,
  "message": "Server is running successfully",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

### 5.2 Test API Endpoints
Test these endpoints in your browser or Postman:
- `GET https://your-backend-url.onrender.com/health`
- `GET https://your-backend-url.onrender.com/api/schools`

## 🔧 **Step 6: Update Frontend URL in Backend**

After you get your Vercel frontend URL:

### 6.1 Update FRONTEND_URL
1. Go to Render dashboard → Your service
2. Click **"Environment"** tab
3. Find `FRONTEND_URL` variable
4. Click **"Edit"**
5. Update to your actual Vercel URL: `https://your-frontend.vercel.app`
6. Click **"Save Changes"**

### 6.2 Trigger Redeploy
1. Go to **"Settings"** tab
2. Scroll to **"Deploy Hook"**
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. Wait for redeployment to complete

## 📊 **Step 7: Configure Custom Domain (Optional)**

### 7.1 Add Custom Domain
If you have a custom domain:
1. Go to **"Settings"** → **"Custom Domains"**
2. Click **"Add Custom Domain"**
3. Enter your domain: `api.yourdomain.com`
4. Update your DNS settings as instructed

## 🐛 **Common Issues & Solutions**

### Issue 1: Build Fails - Dependencies
**Symptoms**: Build fails during `npm ci`
**Solution**: 
```bash
# Test locally first
cd server
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue 2: Database Connection Fails
**Symptoms**: "Failed to connect to database"
**Solution**:
- Verify all database environment variables are correct
- Check SkySQL firewall settings (should allow all IPs for serverless)
- Ensure DB credentials are not expired

### Issue 3: Server Won't Start
**Symptoms**: Build succeeds but service doesn't start
**Solution**:
- Check start command is `npm start`
- Verify `dist/server.js` exists after build
- Check environment variable `PORT=10000`

### Issue 4: CORS Errors
**Symptoms**: Frontend can't connect to backend
**Solution**:
- Verify `FRONTEND_URL` environment variable is correct
- Check that CORS configuration includes your frontend URL
- Redeploy after updating environment variables

## 📈 **Render Service Management**

### Performance Monitoring
1. **Metrics**: View CPU, memory, and response time
2. **Logs**: Real-time application logs
3. **Events**: Deployment history and system events

### Scaling (Paid Plans)
1. **Auto-scaling**: Automatically scale based on traffic
2. **Manual scaling**: Set minimum/maximum instances
3. **Health checks**: Automatic service recovery

## 🔧 **Production Optimizations**

### 1. Enable Persistent Disks (If Needed)
For file uploads:
1. Go to **"Settings"** → **"Disk"**
2. Add persistent disk for file storage
3. Mount at `/var/data` or similar

### 2. Set up Monitoring
1. **Uptime Robot**: Monitor service availability
2. **LogRocket/Sentry**: Error tracking
3. **New Relic**: Performance monitoring

## 📝 **Render Configuration Summary**

**Final Configuration**:
- **Name**: `school-directory-backend`
- **Runtime**: Node
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm start`
- **Root Directory**: `server`
- **Environment**: Production
- **Health Check Path**: `/health`

## 🔗 **Next Steps**

1. ✅ Backend deployed to Render
2. ✅ Health check working
3. 🔄 Update Vercel frontend with Render backend URL
4. 🔄 Update Render backend with Vercel frontend URL
5. 🔄 Test full application functionality

## 📞 **Support**

### Render Support
- **Documentation**: [render.com/docs](https://render.com/docs)
- **Community**: [community.render.com](https://community.render.com)
- **Support**: Email support for paid plans

### Troubleshooting Checklist
- [ ] All environment variables set correctly
- [ ] Build command succeeds locally
- [ ] Database connection works
- [ ] Health check endpoint responds
- [ ] CORS configured for frontend URL

Your backend should now be live at `https://school-directory-backend.onrender.com`! 🎉

## ⚡ **Free Tier Limitations**
If using the free tier, be aware of:
- **Sleep Mode**: Service sleeps after 15 minutes of inactivity
- **Build Minutes**: 500 build minutes per month
- **Bandwidth**: 100GB/month
- **Performance**: Limited CPU and memory

Consider upgrading to Starter plan ($7/month) for production use.
