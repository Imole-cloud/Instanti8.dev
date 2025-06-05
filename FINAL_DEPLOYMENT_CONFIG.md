# Complete Azure Deployment Configuration

## Azure Authentication Status
✓ Client ID: 4a7525be-f9dd-437b-bf77-9a5a87bb5129
✓ Client Secret: Configured (CYo8Q~...)
✓ Tenant ID: 4d2858d9-441d-46f0-b085-60e4ca7a5e75
✓ Subscription ID: 3e513234-2b8a-4b15-8632-203397fae29f

## Netlify Environment Variables
Copy these exact values to your Netlify dashboard:

```
AZURE_CLIENT_ID=4a7525be-f9dd-437b-bf77-9a5a87bb5129
AZURE_CLIENT_SECRET=[AZURE_CLIENT_SECRET_REDACTED]
AZURE_TENANT_ID=4d2858d9-441d-46f0-b085-60e4ca7a5e75
AZURE_SUBSCRIPTION_ID=3e513234-2b8a-4b15-8632-203397fae29f
DATABASE_URL=postgresql://neondb_owner:npg_FE5lzguCWNQ7@ep-plain-cake-a5dj6iy2.us-east-2.aws.neon.tech/neondb?sslmode=require
NODE_ENV=production
```

## Azure Permissions Setup
Your App Registration needs Contributor access:

1. Go to Azure Portal > Subscriptions > "Azure subscription 1"
2. Click "Access control (IAM)"
3. Click "Add" > "Add role assignment"
4. Select Role: "Contributor"
5. Assign access to: "User, group, or service principal"
6. Search for: "Instantiate" (your app)
7. Click "Save"

## Deployment URLs
- Local: http://localhost:5000
- Netlify: http://instantiate-dev.netlify.app

## API Endpoints
- Health: /api/
- Azure Test: /api/credentials/test/azure
- Deploy: /api/deploy
- Status: /api/deploy/{id}/status

Your platform is configured for production Azure infrastructure deployment.