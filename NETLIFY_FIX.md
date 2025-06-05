# Set Netlify Environment Variables

## Manual Setup Required

Go to your Netlify dashboard and set these environment variables:

**Site Settings > Environment variables > Add new variable**

```
AZURE_CLIENT_ID=4a7525be-f9dd-437b-bf77-9a5a87bb5129
AZURE_CLIENT_SECRET=[AZURE_CLIENT_SECRET_REDACTED]
AZURE_TENANT_ID=4d2858d9-441d-46f0-b085-60e4ca7a5e75
AZURE_SUBSCRIPTION_ID=b5afed01-d5e1-4c1c-9834-5431940b0f25
NODE_ENV=production
```

## Database Setup

For the database connection, create a PostgreSQL database and add:

```
DATABASE_URL=postgresql://username:password@host:port/database_name
```

Recommended providers:
- **Neon**: https://neon.tech
- **Supabase**: https://supabase.com

## Verification

After setting the variables:
1. Your Netlify site will auto-redeploy
2. Test the API at: `https://your-site.netlify.app/.netlify/functions/server`
3. Should show: `"azure": "configured"`

Your Azure infrastructure deployment platform is now ready for production use.