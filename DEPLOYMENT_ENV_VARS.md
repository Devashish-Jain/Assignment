# 🔐 Environment Variables for Deployment

## 🚀 **Render (Backend) Environment Variables**

Set these environment variables in your Render dashboard:

### **Database Configuration**
```env
DB_HOST=serverless-us-central1.sysp0000.db2.skysql.com
DB_PORT=4057
DB_USER=dbpgf01458622
DB_PASSWORD=%a(y77HQkPtezYXA89b*K
DB_NAME=defaultdb
```

### **Server Configuration**
```env
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-school-directory.vercel.app
```

⚠️ **Important**: Replace `https://your-school-directory.vercel.app` with your actual Vercel deployment URL after deployment.

## 🌐 **Vercel (Frontend) Environment Variables**

Set these environment variables in your Vercel dashboard:

### **API Configuration**
```env
VITE_API_BASE_URL=https://your-backend.onrender.com
```

⚠️ **Important**: Replace `https://your-backend.onrender.com` with your actual Render deployment URL after backend deployment.

## 📋 **Environment Variables Checklist**

### **Backend (Render)**
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `10000`
- [ ] `DB_HOST` = Your SkySQL host
- [ ] `DB_PORT` = `4057`
- [ ] `DB_USER` = Your SkySQL username
- [ ] `DB_PASSWORD` = Your SkySQL password
- [ ] `DB_NAME` = `defaultdb`
- [ ] `FRONTEND_URL` = Your Vercel frontend URL

### **Frontend (Vercel)**
- [ ] `VITE_API_BASE_URL` = Your Render backend URL

## 🔄 **Post-Deployment Updates**

After both services are deployed, you'll need to update these URLs:

1. **Update Backend CORS**: Update `FRONTEND_URL` in Render with your Vercel URL
2. **Update Frontend API**: Update `VITE_API_BASE_URL` in Vercel with your Render URL
3. **Redeploy both services** after URL updates
