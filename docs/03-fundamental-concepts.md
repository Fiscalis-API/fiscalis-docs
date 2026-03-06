---
id: fundamental-concepts
title: Concepts Fondamentaux
sidebar_position: 3
---

# Concepts Fondamentaux 🧠

Avant de plonger dans les requêtes API brutes, il est important de comprendre l'architecture métier d'Fiscalis. Cette section détaille les principes fondateurs de la plateforme, de la gestion des limites aux méthodes de certification, en passant par la conservation des données.

## Environnements

Fiscalis met à disposition deux environnements distincts pour sécuriser vos développements :

- **Sandbox (Bac à sable) :** Un environnement de test gratuit pour valider vos intégrations sans envoyer de données réelles à l'administration fiscale. Les certifications générées ici sont factices.
- **Production :** L'environnement réel. Les factures soumises ici sont légalement certifiées et transmises à la DGI.

:::warning Attention
Ne pointez jamais vos applications de test vers l'environnement de production. Assurez-vous que vos clés API (voir [Authentification](./authentication)) correspondent au bon environnement.
:::

## Forfaits et Comptage des Factures

Le modèle de tarification de notre SaaS a été conçu pour être au plus proche de la réalité des entreprises locales. 

Contrairement à d'autres systèmes, **la facturation n'est pas basée sur le nombre de terminaux MCF connectés, mais strictement sur le volume de factures annuelles émises.**

Nos forfaits (comme les paliers *Start* ou *Grow*) proposent des limites de factures annuelles adaptées à la taille de votre entreprise. L'API renverra un code HTTP `429 Too Many Requests` si le quota annuel de l'organisation est atteint. 


## Modes de Certification Fiscale

Pour s'adapter à toutes les infrastructures techniques, Fiscalis propose **deux options de priorité** pour la certification de vos factures :

1. **Le Module de Contrôle Fiscal (MCF) :** Communication directe avec un boîtier matériel physique sur site.
2. **L'API Web de la DGI :** Une intégration purement logicielle (cloud) communiquant directement avec les serveurs de l'administration fiscale, sans nécessité de matériel supplémentaire.

Le choix de l'option s'effectue dans les paramètres de votre organisation et est transparent lors de l'appel API.

:::info Information
La notion de priorité ne veut pas dire que la normalisation se fera uniquement par une des deux option. Ici il s'agit de quel service est contacté en premier, le ***MCF*** ou l'***API Web de la DGI***.
:::


## Le Registre Immuable (`LogInvoices`)

La conformité fiscale exige une traçabilité à toute épreuve. C'est pourquoi Fiscalis maintient une table de journalisation stricte appelée `LogInvoices`.

:::info Source de vérité pour le Reporting
Ce registre contient l'historique complet de toutes les tentatives et réussites de certification. **Il n'est jamais vidé**. Même si une facture est annulée dans votre ERP, la trace de sa certification initiale restera intacte dans `LogInvoices`, garantissant des rapports d'audit (reporting) fiables en cas de contrôle fiscal.
:::

## Filtrage, Recherche et Pagination

Lorsque vous interrogez l'API pour récupérer des factures ou générer des rapports, vous disposez de puissants outils de filtrage :

- **Recherche par identifiant :** Le paramètre de recherche textuelle est intelligent. Si vous cherchez un terme, l'API filtrera automatiquement à la fois sur votre numéro de facture interne (`rn`) et sur le code de certification officiel (`codeDEFDGI`).
- **Filtre par Date :** Indispensable pour la comptabilité, l'API intègre un filtre de date précis pour extraire les factures d'une période donnée (ex: clôture mensuelle).

