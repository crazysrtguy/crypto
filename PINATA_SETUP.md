# 📌 Pinata IPFS Setup Guide

## 🚀 Quick Setup for IPFS Meme Storage

### Step 1: Create Pinata Account
1. Go to [https://app.pinata.cloud](https://app.pinata.cloud)
2. Sign up for a **FREE** account
3. Verify your email

### Step 2: Generate API Keys
1. Go to **Developers** → **API Keys** in your Pinata dashboard
2. Click **"New Key"**
3. **Key Name**: `crypto-meme-generator`
4. **Permissions**: Check these boxes:
   - ✅ `pinFileToIPFS`
   - ✅ `pinJSONToIPFS`
   - ✅ `unpin`
   - ✅ `userPinnedDataTotal`
5. Click **"Create Key"**
6. **IMPORTANT**: Copy the keys immediately (they won't be shown again!)

### Step 3: Update Environment Variables

Replace the placeholder values in your `.env` file:

```env
# Replace these with your actual Pinata credentials
PINATA_API_KEY="your_actual_api_key_here"
PINATA_SECRET_API_KEY="your_actual_secret_key_here"
PINATA_JWT="your_actual_jwt_token_here"
```

### Step 4: For Vercel Deployment

In your Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add these three variables:
   - `PINATA_API_KEY` = your API key
   - `PINATA_SECRET_API_KEY` = your secret key
   - `PINATA_JWT` = your JWT token

## 🎯 What This Enables

✅ **Permanent meme storage** on IPFS  
✅ **Decentralized hosting** (no single point of failure)  
✅ **Global accessibility** via IPFS gateways  
✅ **Metadata tracking** for each meme  
✅ **Professional NFT-ready** storage  

## 📊 Pinata Free Tier

- **1GB** of storage
- **100,000** requests per month
- **Unlimited** bandwidth
- **Perfect** for meme storage!

## 🔧 How It Works

1. **Meme Creation**: User generates AI meme with text
2. **Canvas Capture**: Complete meme (image + text) captured
3. **IPFS Upload**: Meme uploaded to Pinata/IPFS
4. **Database Storage**: IPFS hash stored in database
5. **Gallery Display**: Memes loaded from IPFS URLs

## 🌐 IPFS URLs

Your memes will be accessible via:
- `https://ipfs.io/ipfs/{hash}`
- `https://gateway.pinata.cloud/ipfs/{hash}`
- Any IPFS gateway worldwide!

## 🚨 Security Notes

- **Never commit** API keys to Git
- **Use environment variables** only
- **Regenerate keys** if compromised
- **Monitor usage** in Pinata dashboard

Ready to make your memes immortal on IPFS! 🚀
