---
id: ssdks-and-tools
title: Bibliothèques & Outils (SDKs)
sidebar_position: 5
---

# Bibliothèques & Outils (SDKs) 

Pour accélérer votre intégration avec l'API Fiscalis, voici des exemples de code prêts à l'emploi dans les langages et frameworks les plus courants de notre écosystème.

## 1. C# / .NET 9.0 (MAUI & ASP.NET Core)

Si vous développez une application native mobile avec **.NET MAUI (utilisant Prism)** ou un backend ASP.NET Core sous **.NET 9.0**, nous recommandons l'utilisation de `IHttpClientFactory` pour gérer vos appels API.

Voici un exemple de service encapsulant l'appel vers la création de facture :

```csharp
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;

namespace FiscalisIntegration.Services;

public class FiscalisApiService : IFiscalisApiService
{
    private readonly HttpClient _httpClient;

    // Injection de dépendance (idéal avec Prism)
    public FiscalisApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("http://87.106.10.40/api/v1/");
    }

    public async Task<FiscalisResponse?> SubmitInvoiceAsync(InvoicePayload payload, string apiKey)
    {
        // 1. Configuration du Bearer Token
        _httpClient.DefaultRequestHeaders.Authorization = 
            new AuthenticationHeaderValue("Bearer", apiKey);

        // 2. Envoi de la requête POST
        var response = await _httpClient.PostAsJsonAsync("Invoice", payload);

        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            throw new Exception($"Erreur API Fiscalis ({response.StatusCode}): {errorContent}");
        }

        // 3. Désérialisation de la réponse
        return await response.Content.ReadFromJsonAsync<FiscalisResponse>();
    }
}
```
:::tip Performances .NET 9.0
La méthode PostAsJsonAsync de System.Net.Http.Json utilise par défaut System.Text.Json, qui est hautement optimisé dans .NET 9.0. Cela garantit une empreinte mémoire minimale sur vos applications mobiles.
:::

## 2. Intégration PHP (Spécial Dolibarr)

Si vous intégrez Fiscalis directement dans un module Dolibarr (compatible v22.0.0-alpha), voici comment effectuer l'appel HTTP en utilisant cURL, après avoir récupéré les données via l'ORM de Dolibarr.

:::info Bonnes pratiques 
N'utilisez jamais de requêtes SQL brutes pour récupérer les données de la facture. Utilisez toujours la classe Facture ($object->fetch($id)) et ses méthodes associées ($object->fetch_lines()) pour construire votre tableau PHP ($payload) avant de l'envoyer à l'API.
:::

```php
<?php
/**
 * Fonction pour certifier une facture via l'API Fiscalis
 * @param array  $payload Tableau associatif contenant les données formatées de la facture
 * @param string $apiKey  Clé API de l'organisation
 * @return array|false    Réponse décodée ou false en cas d'erreur
 */
function fiscalis_certify_invoice($payload, $apiKey) {
    $url = 'http://87.106.10.40/api/v1/Invoice';
    
    // Encodage en JSON
    $jsonData = json_encode($payload);
    
    // Initialisation de cURL
    $ch = curl_init($url);
    
    // Configuration de la requête POST
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    
    // Définition des Headers (Bearer Token et Content-Type)
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
        'Accept: application/json',
        'Content-Length: ' . strlen($jsonData)
    ));
    
    // Exécution et récupération de la réponse
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    curl_close($ch);
    
    if ($httpCode >= 200 && $httpCode < 300) {
        return json_decode($response, true);
    } else {
        dol_syslog("Erreur API Fiscalis: Code HTTP $httpCode - Réponse: $response", LOG_ERR);
        return false;
    }
}
?>
```


## 3. Outils de test (Swagger / Postman)

Pour tester rapidement l'API sans écrire une ligne de code, vous pouvez utiliser notre spécification OpenAPI.

    Interface Swagger : Une interface interactive est disponible directement sur le portail (à configurer selon votre déploiement) pour tester les endpoints /Invoice avec le bouton "Try it out".

    Collection Postman : Télécharger la collection Postman (Lien à insérer). Importez ce fichier JSON dans Postman, ajoutez votre clé API dans l'onglet d'autorisation de la collection, et testez les routes instantanément.