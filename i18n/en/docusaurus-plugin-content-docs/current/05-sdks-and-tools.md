---
id: sdks-and-tools
title: Libraries & Tools (SDKs)
sidebar_position: 5
---

# Libraries & Tools (SDKs) 

To accelerate your integration with the Fiscalis API, here are ready-to-use code examples in the most common languages and frameworks in our ecosystem.

## 1. C# / .NET 9.0 (MAUI & ASP.NET Core)

If you are developing a native mobile application with **.NET MAUI (using Prism)** or an ASP.NET Core backend under **.NET 9.0**, we recommend using `IHttpClientFactory` to manage your API calls.

Here is an example of a service encapsulating the call to invoice creation:

```csharp
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;

namespace FiscalisIntegration.Services;

public class FiscalisApiService : IFiscalisApiService
{
    private readonly HttpClient _httpClient;

    // Dependency injection (ideal with Prism)
    public FiscalisApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("http://87.106.10.40/api/v1/");
    }

    public async Task<FiscalisResponse?> SubmitInvoiceAsync(InvoicePayload payload, string apiKey)
    {
        // 1. Bearer Token Configuration
        _httpClient.DefaultRequestHeaders.Authorization = 
            new AuthenticationHeaderValue("Bearer", apiKey);

        // 2. Sending the POST request
        var response = await _httpClient.PostAsJsonAsync("Invoice", payload);

        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            throw new Exception($"Fiscalis API Error ({response.StatusCode}): {errorContent}");
        }

        // 3. Deserializing the response
        return await response.Content.ReadFromJsonAsync<FiscalisResponse>();
    }
}
```
:::tip .NET 9.0 Performance
The PostAsJsonAsync method of System.Net.Http.Json uses System.Text.Json by default, which is highly optimized in .NET 9.0. This ensures a minimal memory footprint on your mobile applications.
:::

## 2. PHP Integration (Dolibarr Special)

If you are integrating Fiscalis directly into a Dolibarr module (compatible with v22.0.0-alpha), here is how to make the HTTP call using cURL, after retrieving the data via the Dolibarr ORM.

:::info Best Practices 
Never use raw SQL queries to retrieve invoice data. Always use the Invoice class ($object->fetch($id)) and its associated methods ($object->fetch_lines()) to build your PHP array ($payload) before sending it to the API.
:::

```php
<?php
/**
 * Function to certify an invoice via the Fiscalis API
 * @param array  $payload Associative array containing the formatted invoice data
 * @param string $apiKey  Organization's API key
 * @return array|false    Decoded response or false in case of error
 */
function fiscalis_certify_invoice($payload, $apiKey) {
    $url = 'http://87.106.10.40/api/v1/Invoice';
    
    // JSON encoding
    $jsonData = json_encode($payload);
    
    // cURL initialization
    $ch = curl_init($url);
    
    // POST request configuration
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    
    // Definition of Headers (Bearer Token and Content-Type)
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
        'Accept: application/json',
        'Content-Length: ' . strlen($jsonData)
    ));
    
    // Execution and retrieval of the response
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    curl_close($ch);
    
    if ($httpCode >= 200 && $httpCode < 300) {
        return json_decode($response, true);
    } else {
        dol_syslog("Fiscalis API Error: HTTP Code $httpCode - Response: $response", LOG_ERR);
        return false;
    }
}
?>
```


## 3. Test Tools (Swagger / Postman)

To quickly test the API without writing a line of code, you can use our OpenAPI specification.

    Swagger Interface: An interactive interface is available directly on the portal (to be configured according to your deployment) to test the /Invoice endpoints with the "Try it out" button.

    Postman Collection: Download the Postman collection (Link to be inserted). Import this JSON file into Postman, add your API key in the collection's authorization tab, and test the routes instantly.