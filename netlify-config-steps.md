# Netlify Environment Variables Setup

## Step 1: Access Netlify Dashboard
1. Go to: https://app.netlify.com/sites/instantiate-dev/settings/env
2. Click "Add new variable" for each of the following:

## Step 2: Add Azure Credentials

**Variable 1:**
- Key: `AZURE_CLIENT_ID`
- Value: `4a7525be-f9dd-437b-bf77-9a5a87bb5129`

**Variable 2:**
- Key: `AZURE_CLIENT_SECRET`
- Value: `[AZURE_CLIENT_SECRET_REDACTED]`

**Variable 3:**
- Key: `AZURE_TENANT_ID`
- Value: `4d2858d9-441d-46f0-b085-60e4ca7a5e75`

**Variable 4:**
- Key: `AZURE_SUBSCRIPTION_ID`
- Value: `b5afed01-d5e1-4c1c-9834-5431940b0f25`

## Step 3: Add Database and Environment

**Variable 5:**
- Key: `DATABASE_URL`
- Value: `postgresql://neondb_owner:npg_FE5lzguCWNQ7@ep-plain-cake-a5dj6iy2.us-east-2.aws.neon.tech/neondb?sslmode=require`

**Variable 6:**
- Key: `NODE_ENV`
- Value: `production`

## Step 4: Deploy
After adding all variables:
1. Click "Save" 
2. Go to Deploys tab
3. Click "Trigger deploy" > "Deploy site"

## Verification
Once deployed, test:
- Health: `http://instantiate-dev.netlify.app/.netlify/functions/server`
- Azure test: `http://instantiate-dev.netlify.app/api/credentials/test/azure`