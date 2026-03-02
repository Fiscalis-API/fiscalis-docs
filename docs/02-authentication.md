---
id: authentication
title: Authentification & Sécurité
sidebar_position: 2
---

# Authentification & Sécurité

La sécurité des données de facturation et de conformité fiscale est au cœur de l'architecture d'Fiscalis. Pour interagir avec notre API, toutes vos requêtes doivent être authentifiées de manière stricte et sécurisée.

Cette section vous guide sur la génération, l'utilisation et la sécurisation de vos clés API.

## Obtenir ses clés API

L'accès à l'API Fiscalis est protégé par un système de clé unique. Vous pouvez générer et gérer vos clés directement depuis votre espace administrateur.

1. Connectez-vous à votre tableau de bord Fiscalis.
2. Rendez-vous dans la section **Dashboard**.
3. Cliquez sur **Générer une nouvelle clé API**.

:::tip Gestion simplifiée
Depuis votre interface, vous avez la possibilité **d'activer ou de désactiver vos clés API ainsi que vos clés MCF** à tout moment grâce à un simple interrupteur (toggle). Cela vous permet de réagir instantanément et de couper l'accès en cas de besoin sans avoir à supprimer définitivement l'intégration.
:::

## Authentifier les requêtes

L'API Fiscalis utilise une authentification simple et directe par jeton. La conception a été pensée pour être la plus légère possible : **il n'y a qu'un seul point d'entrée pour l'authentification et aucun mécanisme complexe de jeton d'accès (access token) temporaire à rafraîchir**. 

Vous devez simplement utiliser votre clé API comme un `Bearer Token`.

Toutes les requêtes adressées à l'API (notamment vers votre endpoint de soumission `http://87.106.10.40/api/v1/Invoice`) doivent impérativement inclure ce jeton dans l'en-tête HTTP `Authorization`.

### Format de l'en-tête (Header)

Voici comment formater l'en-tête de votre requête HTTP :

```http
Authorization: Bearer VOTRE_CLE_API_SECRETE
Content-Type: application/json
```

### Exemples d'intégration

#### En C# (.NET / MAUI / ASP.NET Core) :
```csharp
using System.Net.Http.Headers;

var client = new HttpClient();
// Configuration du Bearer Token
client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "VOTRE_CLE_API_SECRETE");

// Prêt à envoyer la facture vers l'API
var response = await client.PostAsJsonAsync("http://87.106.10.40/api/v1/Invoice", invoiceData);
```

#### En PHP (CURL - idéal pour une intégration Dolibarr) :

```php
$ch = curl_init('[http://87.106.10.40/api/v1/Invoice](http://87.106.10.40/api/v1/Invoice)');
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Authorization: Bearer VOTRE_CLE_API_SECRETE',
    'Content-Type: application/json'
));
```

### Gestion des Organisations (Multitenancy)

Si vous gérez plusieurs entités juridiques ou différents clients (tenant) depuis Fiscalis, sachez que chaque **clé API est strictement liée à l'environnement et à l'organisation** pour laquelle elle a été créée.

Il n'est pas nécessaire d'ajouter un identifiant d'entreprise dans le corps de vos requêtes : notre middleware déduit automatiquement le contexte fiscal et les paramètres de facturation grâce au jeton Bearer fourni.

### Bonnes pratiques de sécurité
Pour garantir l'intégrité de vos flux avec la DGI, veuillez respecter les règles suivantes :

    - **Ne partagez jamais vos clés** : Ne les publiez pas sur un répertoire public, dans des forums, ou dans du code source accessible côté client (HTML/JavaScript frontal).

    - **Stockage sécurisé** : 
        - Si vous développez une application mobile native, utilisez le stockage sécurisé de l'appareil (comme le ```SecureStorage``` de MAUI) pour conserver la clé API, plutôt que de la coder en dur dans l'application.

        - Pour les intégrations côté serveur (Backend ERP), utilisez toujours des ```variables d'environnement (.env)```.

    - Rotation : Prévoyez de renouveler vos clés périodiquement. Créez une nouvelle clé, mettez à jour votre logiciel de facturation, puis désactivez l'ancienne depuis le tableau de bord Fiscalis.

:::danger Erreur 401 Unauthorized
Si votre requête omet l'en-tête d'autorisation, si le format est incorrect (oubli du mot Bearer  suivi d'un espace), ou si la clé a été désactivée depuis l'interface, l'API rejettera la requête avec une erreur 401 Unauthorized.
:::