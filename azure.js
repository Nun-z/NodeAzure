const { DefaultAzureCredential } = require("@azure/identity");
const credentials = new DefaultAzureCredential();

var subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;

const { ResourceManagementClient } = require("@azure/arm-resources");
const resourceManagement = new ResourceManagementClient(credentials, subscriptionId);

module.exports = resourceManagement;