---
id: authentication
title: Authentication & Security
sidebar_position: 2
---

# Authentication & Security

Billing data security and tax compliance are at the heart of Fiscalis' architecture. To interact with our API, all your requests must be strictly and securely authenticated.

This section guides you on generating, using, and securing your API keys.

## Obtaining API Keys

Access to the Fiscalis API is protected by a unique key system. You can generate and manage your keys directly from your administrator area.

1. Log in to your Fiscalis dashboard.
2. Go to the **Dashboard** section.
3. Click on **Generate a new API key**.

:::tip Simplified Management
From your interface, you have the ability to **activate or deactivate your API keys as well as your MCF keys** at any time using a simple toggle switch. This allows you to react instantly and cut off access if necessary without having to permanently delete the integration.
:::

## Authenticating Requests

The Fiscalis API uses simple and direct token authentication. The design was intended to be as lightweight as possible: **there is only one entry point for authentication and no complex temporary access token mechanism to refresh**. 

You simply need to use your API key as a `Bearer Token`.

All requests sent to the API (especially to your submission endpoint `http://87.106.10.40/api/v1/Invoice`) must imperatively include this token in the HTTP `Authorization` header.

### Header Format

Here's how to format your HTTP request header:

```http
Authorization: Bearer YOUR_SECRET_API_KEY
Content-Type: application/json
```

### Integration Examples

#### In C# (.NET / MAUI / ASP.NET Core):
```csharp
using System.Net.Http.Headers;

var client = new HttpClient();
// Bearer Token Configuration
client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "YOUR_SECRET_API_KEY");

// Ready to send the invoice to the API
var response = await client.PostAsJsonAsync("http://87.106.10.40/api/v1/Invoice", invoiceData);
```

#### In PHP (CURL - ideal for Dolibarr integration):

```php
$ch = curl_init('[http://87.106.10.40/api/v1/Invoice](http://87.106.10.40/api/v1/Invoice)');
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Authorization: Bearer YOUR_SECRET_API_KEY',
    'Content-Type: application/json'
));
```

### Organization Management (Multitenancy)

If you manage multiple legal entities or different clients (tenants) from Fiscalis, be aware that each **API key is strictly linked to the environment and the organization** for which it was created.

It is not necessary to add a company identifier in the body of your requests: our middleware automatically deduces the fiscal context and billing parameters thanks to the provided Bearer token.

### Security Best Practices
To guarantee the integrity of your flows with the DGI, please respect the following rules:

    - **Never share your keys**: Do not publish them in a public directory, in forums, or in client-side accessible source code (front-end HTML/JavaScript).

    - **Secure Storage**: 
        - If you are developing a native mobile application, use the device's secure storage (like MAUI's ```SecureStorage```) to store the API key, rather than hardcoding it into the application.

        - For server-side integrations (Backend ERP), always use ```environment variables (.env)```.

    - **Rotation**: Plan to renew your keys periodically. Create a new key, update your billing software, then deactivate the old one from the Fiscalis dashboard.

:::danger Error 401 Unauthorized
If your request omits the authorization header, if the format is incorrect (forgetting the word Bearer followed by a space), or if the key has been deactivated from the interface, the API will reject the request with a 401 Unauthorized error.
:::
