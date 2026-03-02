---
id: support-and-maintenance
title: Support & Maintenance
sidebar_position: 7
---

# Support & Maintenance

L'équipe Fiscalis s'engage à fournir une infrastructure hautement disponible pour garantir que vos processus de facturation ne soient jamais interrompus. Cette section vous explique comment suivre l'état de nos services, vous tenir informé des mises à jour, et contacter notre support technique.

## 1. Statut du Système & Disponibilité

Étant donné que notre API agit comme un pont vers les serveurs de la DGI, la disponibilité dépend à la fois de notre infrastructure et de celle de l'administration fiscale.

### Vérifier l'état de l'API Fiscalis
Pour vérifier si nos serveurs sont opérationnels avant de lancer une série de requêtes, vous pouvez utiliser notre endpoint de statut public :

```http
GET http://87.106.10.40/api/v1/status
Accept: application/json
```

### Réponse attendue (200 OK) :
```json
{
  "status": true,
  "version": "1.0",
  "serverDateTime": "2026-03-01T10:00:00Z"
}
```
:::tip Gestion des pannes DGI
Si les serveurs de la DGI (e-MCF) rencontrent des lenteurs ou une indisponibilité temporaire, notre API vous renverra une erreur spécifique (ex: HTTP 503 ou un code d'erreur interne spécifique). Nous vous recommandons d'implémenter un mécanisme de retry (nouvelle tentative) avec un délai exponentiel (Exponential Backoff) dans votre ERP pour les factures échouées.
:::

## 2. Journal des modifications (Changelog)
L'API Fiscalis est versionnée (actuellement `v1`). Nous garantissons que toutes les mises à jour mineures au sein de cette version seront rétrocompatibles.

Si des changements majeurs imposés par la législation (comme une mise à jour du protocole e-MCF de la DGI) nécessitent de modifier la structure du payload JSON, nous procéderons ainsi :
1. Communication anticipée : Un e-mail sera envoyé aux administrateurs de l'organisation 30 jours avant le changement.
2. Nouvelle version : Une nouvelle version de l'API (ex: v2) sera déployée en parallèle de l'ancienne pour vous laisser le temps de migrer votre code.

## 3. FAQ Technique

Voici les problèmes les plus fréquemment rencontrés lors de l'intégration :

- Je reçois une erreur `401 Unauthorized` à chaque requête.
    - Vérification : Assurez-vous que l'en-tête de votre requête contient bien `Authorization: Bearer VOTRE_CLE`. Vérifiez également sur votre tableau de bord que la clé API n'a pas été désactivée via le toggle.
- L'API me renvoie l'erreur "La référence de la facture ne peut pas être vide" (Code 31).
    - *Vérification : Vérifiez que le champ `rn` (votre numéro de facture interne) est bien renseigné dans votre payload JSON*.
- Je reçois une erreur `429 Too Many Requests`.
    - *Vérification : Votre organisation a atteint la limite de factures annuelles autorisée par votre forfait SaaS. Veuillez contacter votre administrateur pour passer au palier supérieur (ex: forfait Grow)*.

## 4. Contacter le Support Technique

Si vous rencontrez un comportement inattendu de l'API qui n'est pas documenté dans ce Wiki, notre équipe de maintenance technique est là pour vous aider.

Pour un traitement rapide de votre demande, veuillez inclure les éléments suivants dans votre ticket :

- L'environnement concerné (`Sandbox` ou `Production`).
- La date et l'heure exactes de la requête échouée.
- Le payload JSON complet de la requête (en masquant votre clé API).
- Le message et le code d'erreur exacts retournés par Fiscalis.

### Contactez-nous :
📧 Email : support-dev@fiscalis-app.com
💬 Portail client : Accessible depuis votre tableau de bord administrateur.
