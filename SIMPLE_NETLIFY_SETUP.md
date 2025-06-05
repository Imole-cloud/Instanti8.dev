# Manual Netlify Configuration

## Go to Netlify Dashboard
Visit: https://app.netlify.com/sites/instantiate-dev/settings/env

## Add These Variables (copy-paste each)

```
AZURE_CLIENT_ID
4a7525be-f9dd-437b-bf77-9a5a87bb5129

AZURE_CLIENT_SECRET
[AZURE_CLIENT_SECRET_REDACTED]

AZURE_TENANT_ID
4d2858d9-441d-46f0-b085-60e4ca7a5e75

AZURE_SUBSCRIPTION_ID
b5afed01-d5e1-4c1c-9834-5431940b0f25

DATABASE_URL
postgresql://neondb_owner:npg_FE5lzguCWNQ7@ep-plain-cake-a5dj6iy2.us-east-2.aws.neon.tech/neondb?sslmode=require

NODE_ENV
production
```

## Deploy
After adding variables, trigger a new deploy in Netlify dashboard.

Your deployment URL: http://instantiate-dev.netlify.app