---
id: printable-specification
title: Spécification de la facture imprimée
sidebar_position: 9
---

Bien que le format visuel soit libre, le contenu détaillé ci-dessous est obligatoire. Cette section indique l'ensemble minimal des informations requises.

:::info Ressources Officielles à Télécharger
Cette documentation technique détaille les éléments obligatoires devant figurer sur les factures imprimées par le Système de Facturation d'Entreprise (SFE) pour être en conformité avec les directives de la Direction Générale des Impôts (DGI).
**[Télécharger : Protocoles_SFE-MCF_v1.0.pdf](/documents/Protocoles_SFE-MCF_v1.0.pdf)**
:::

## Informations du Contribuable (Vendeur)

L'en-tête de la facture doit clairement identifier l'entreprise émettrice. Les champs obligatoires sont:
- Le nom de l'entreprise ou la dénomination.
- Le Numéro d'Identification Fiscale (NIF).
- Le numéro du Registre du Commerce et du Crédit Mobilier (RCCM).
- L'adresse physique.
- Les coordonnées de contact, incluant l'email et le numéro de téléphone *(Optionnel)*.

## Informations du Client (Acheteur)

Ces informations ne sont incluses que si le client a spécifiquement demandé à ce que ses données figurent sur la facture. Le cas échéant, la facture doit afficher :

- Le type de client. Voici les types reconnus par la DGI :
    - **PP** Personne Physique ;
    - **PM** Personne Morale ;
    - **PC** Personne Physique Commerçante ;
    - **PL** Profession libérale ;
    - **AO** Ambassade et Organisation Internationnale ;
- Le NIF du client.
    - Optionnel dans le cas où le type de client est **AO (Ambassade et Organisation internationale)** et **PP (Personne physia)**
- Le nom complet ou la dénomination sociale ;
- L'adresse et le contact ;
- Le numéro RCCM *(Optionnel)*.

## Références de la Facture et de l'Opérateur

Le SFE doit imprimer les informations d'identification de la transaction et du système :

- **Type de facture et Numéro interne** : Le type de la facture accompagné du numéro de facture interne généré par le SFE.
- Mentions Spéciales :
    - S'il s'agit d'une copie, la mention **DUPLICATA** est obligatoire.
    - S'il s'agit d'une facture d'avoir, la mention **FACTURE D'AVOIR** doit figurer avec le numéro de référence de la facture initiale.
    - S'il s'agit d'une exportation, la mention **FACTURE D' EXPORTATION** est requise.
    - S'il s'agit d'un acompte, la mention **FACTURE D'ACOMPTE** doit être ajoutée.
- **Opérateur** : Le nom ou l'identifiant du vendeur/opérateur effectuant la transaction.
- **ISF** : L'identifiant du SFE qui a procédé à l'enregistrement de la facture.

## Détail des Articles (Corps de la facture)

Pour chaque article ou service facturé, la ligne correspondante doit inclure:
- Le nom de l'article, la quantité, le prix unitaire et le montant total pour cette ligne.
- **Étiquette de taxation** : Une mention spécifiant le groupe de taxation (ex : (A-EX) pour un article exonéré, (B) pour un article soumis à la TVA).
- **Type d'article** : Une mention indiquant la nature de l'article
    - **BIE** pour les biens.
    - **SER** pour les services.
    - **TAX** pour les taxes et redevences.
- **Taxe Spécifique** : Si une taxe spécifique s'applique à un article, une ligne supplémentaire nommée "T.S." doit être imprimée sous l'article, précisant la valeur de cette taxe (en montant fixe ou en pourcentage).

## Récapitulatif Financier (Totaux)

La partie inférieure de la facture doit récapituler les montants de manière ventilée :

- **Sous-totaux Hors Taxes (H.T.)** : Le total H.T. doit être affiché pour chaque groupe de taxation, à condition que cette valeur soit différente de zéro.
- **Sous-totaux TVA** : Le total de la TVA pour chaque groupe de taxation (le cas échéant) doit être affiché, si la valeur est différente de zéro.
- **Total TVA** : Le montant cumulé de la TVA pour l'ensemble de la facture.
- **TOTAL TTC** : Le montant global Toutes Taxes Comprises.
- **Paiement** : Le ou les types de paiement utilisés (ex: Espèces, Virement).
- **Quantité globale** : Le nombre total d'articles figurant sur la facture.

## Éléments de Sécurité 

La facture n'est normalisée que si elle inclut les éléments de sécurité renvoyés par l'API Fiscalis. Le SFE doit impérativement imprimer :

- **CODE DEF/DGI** : Correspond a l'identifiant de la facture dans les serveurs de la DGI. Ce code est unique et comporte 24 caractères.
- **NIM** : Correspond à l'identifiant de la machine qui à réalisé la transaction.
- **Compteurs** : Il s'agit du compteur de du NIM.
- **Date Heure** : Correspond a l'heure de la normalisation de la facture.
- **Code QR** : Correspond au code QR de la facture.

![exemple_de_facture](/img/exemple_de_facture.png)
