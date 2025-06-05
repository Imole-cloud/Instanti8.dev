import { ClientSecretCredential } from '@azure/identity';
import { SubscriptionClient } from '@azure/arm-subscriptions';

// Direct Azure test with your credentials
const config = {
  clientId: '4a7525be-f9dd-437b-bf77-9a5a87bb5129',
  clientSecret: '[AZURE_CLIENT_SECRET_REDACTED]',
  tenantId: '4d2858d9-441d-46f0-b085-60e4ca7a5e75',
  subscriptionId: '3e513234-2b8a-4b15-8632-203397fae29f'
};

async function testAzureConnection() {
  try {
    console.log('Testing Azure connection with:');
    console.log('Client ID:', config.clientId);
    console.log('Tenant ID:', config.tenantId);
    console.log('Subscription ID:', config.subscriptionId);
    
    const credential = new ClientSecretCredential(
      config.tenantId,
      config.clientId,
      config.clientSecret
    );
    
    const subscriptionClient = new SubscriptionClient(credential);
    const subscription = await subscriptionClient.subscriptions.get(config.subscriptionId);
    
    console.log('✓ Azure connection successful!');
    console.log('Subscription:', subscription.displayName);
    console.log('State:', subscription.state);
    
  } catch (error) {
    console.error('✗ Azure connection failed:');
    console.error('Error:', error.message);
    
    if (error.code === 'AADSTS7000215') {
      console.error('The client secret may not match the App Registration.');
      console.error('Please verify the secret belongs to App ID: 4a7525be-f9dd-437b-bf77-9a5a87bb5129');
    }
  }
}

testAzureConnection();