#!/bin/bash

# Netlify Environment Variables Setup Script
TOKEN="nfp_ieS75iREmcjSQJZhDn5sFN2SDtWKYk9Wbdfa"
SITE_ID="eb46184e-3e02-4734-9202-a772ecd463e8"

echo "Setting up Netlify environment variables..."

# Function to set environment variable
set_env_var() {
    local key=$1
    local value=$2
    
    echo "Setting $key..."
    curl -H "Authorization: Bearer $TOKEN" \
         -H "Content-Type: application/json" \
         -X POST \
         "https://api.netlify.com/api/v1/sites/$SITE_ID/env" \
         -d "{\"key\": \"$key\", \"values\": [\"$value\"], \"scopes\": [\"builds\", \"functions\"]}"
    echo ""
}

# Set Azure credentials
set_env_var "AZURE_CLIENT_ID" "4a7525be-f9dd-437b-bf77-9a5a87bb5129"
set_env_var "AZURE_CLIENT_SECRET" "[AZURE_CLIENT_SECRET_REDACTED]"
set_env_var "AZURE_TENANT_ID" "4d2858d9-441d-46f0-b085-60e4ca7a5e75"
set_env_var "AZURE_SUBSCRIPTION_ID" "b5afed01-d5e1-4c1c-9834-5431940b0f25"

# Set database URL
set_env_var "DATABASE_URL" "postgresql://neondb_owner:npg_FE5lzguCWNQ7@ep-plain-cake-a5dj6iy2.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Set environment
set_env_var "NODE_ENV" "production"

echo "Environment variables setup complete!"
echo "Your deployment URL: http://instantiate-dev.netlify.app"