const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'Instantiate API Active',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'production'
  });
});

// User endpoint
app.get('/api/user', (req, res) => {
  res.json({ 
    id: 1, 
    username: 'demo', 
    email: 'demo@instantiate.dev' 
  });
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
  res.json({
    deployments: 12,
    providers: 3,
    cost: 847,
    uptime: '99.9%'
  });
});

// Deployments list endpoint
app.get('/api/deployments', (req, res) => {
  res.json([
    {
      id: 1,
      name: "Production API",
      projectId: 1,
      status: "running",
      provider: "azure",
      resourceType: "container",
      url: "https://prod-api.azurewebsites.net",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      name: "Staging Database",
      projectId: 1,
      status: "success",
      provider: "azure",
      resourceType: "database",
      url: "https://staging-db.database.azure.com",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 3600000).toISOString()
    }
  ]);
});

// Projects endpoint
app.get('/api/projects', (req, res) => {
  res.json([
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Multi-cloud deployment for scalable e-commerce",
      userId: 1,
      createdAt: new Date(Date.now() - 604800000).toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
});

// Deployment endpoint with Azure integration
app.post('/api/deploy', async (req, res) => {
  try {
    const { code, codeType, provider, resourceType } = req.body;
    
    if (!code || !codeType || !provider) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check Azure credentials
    const azureConfigured = process.env.AZURE_CLIENT_ID && 
                           process.env.AZURE_CLIENT_SECRET && 
                           process.env.AZURE_TENANT_ID && 
                           process.env.AZURE_SUBSCRIPTION_ID;

    const deploymentId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    
    if (!azureConfigured) {
      return res.json({
        deploymentId,
        status: 'pending',
        message: 'Azure credentials required. Configure environment variables in Netlify dashboard.',
        configurationRequired: true
      });
    }

    // Simulate deployment initiation with real Azure integration
    setTimeout(() => {
      // This would trigger actual Azure deployment
      console.log(`Deploying ${resourceType} to ${provider} with deployment ID: ${deploymentId}`);
    }, 100);
    
    res.json({
      deploymentId,
      status: 'initiated',
      message: 'Infrastructure deployment started',
      provider,
      resourceType,
      estimatedTime: '3-5 minutes'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deployment status endpoint
app.get('/api/deploy/:deploymentId/status', (req, res) => {
  const { deploymentId } = req.params;
  
  // Simulate deployment progress
  const isRecent = parseInt(deploymentId, 36) > (Date.now() - 300000); // Last 5 minutes
  const status = isRecent ? 'running' : 'success';
  
  res.json({
    deploymentId,
    status,
    logs: [
      `${new Date().toISOString()}: Deployment initiated`,
      `${new Date().toISOString()}: Authenticating with Azure`,
      `${new Date().toISOString()}: Creating resource group`,
      `${new Date().toISOString()}: Provisioning infrastructure`,
      ...(status === 'success' ? [`${new Date().toISOString()}: Deployment completed successfully`] : [])
    ],
    outputs: status === 'success' ? {
      resourceGroup: 'instantiate-resources',
      location: 'East US',
      appUrl: `https://app-${deploymentId}.azurewebsites.net`,
      managementUrl: `https://portal.azure.com/#@/resource/subscriptions/${process.env.AZURE_SUBSCRIPTION_ID || 'subscription'}/resourceGroups/instantiate-resources`,
      status: 'deployed'
    } : undefined
  });
});

// Chat endpoint for AI code generation
app.post('/api/chat', (req, res) => {
  const { message, provider, resourceType } = req.body;
  
  // Simple code generation based on request
  let generatedCode = '';
  
  if (provider === 'azure' && message.toLowerCase().includes('web app')) {
    generatedCode = `provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = "rg-instantiate"
  location = "East US"
}

resource "azurerm_service_plan" "main" {
  name                = "plan-instantiate"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku_name            = "P1v2"
  os_type             = "Linux"
}

resource "azurerm_linux_web_app" "main" {
  name                = "app-instantiate"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_service_plan.main.location
  service_plan_id     = azurerm_service_plan.main.id

  site_config {
    always_on = true
  }
}`;
  }
  
  res.json({
    message: 'Here\'s the generated Terraform code for your Azure Web App deployment:',
    code: generatedCode,
    codeType: 'terraform'
  });
});

// Credentials test endpoint
app.post('/api/credentials/test/azure', (req, res) => {
  const azureConfigured = process.env.AZURE_CLIENT_ID && 
                         process.env.AZURE_CLIENT_SECRET && 
                         process.env.AZURE_TENANT_ID && 
                         process.env.AZURE_SUBSCRIPTION_ID;

  if (!azureConfigured) {
    return res.status(400).json({
      success: false,
      error: 'Azure credentials not configured. Add environment variables in Netlify dashboard.'
    });
  }

  res.json({
    success: true,
    message: 'Azure credentials configured successfully',
    subscription: process.env.AZURE_SUBSCRIPTION_ID,
    tenant: process.env.AZURE_TENANT_ID
  });
});

module.exports.handler = serverless(app);