---
id: taxation-groups
title: Groupes de Taxation & Taxe Spécifique
sidebar_position: 8
---

# Groupes de Taxation & Logique de Calcul de la TVA 

La normalisation fiscale en RDC impose une classification stricte de chaque article facturé selon des "Groupes de taxation" (de A à N). Cette section détaille la logique de calcul de la TVA pour chaque groupe et explique comment gérer les taxes additionnelles (taxes spécifiques).


## 1. Classification des Groupes de Taxation

Chaque ligne de votre facture (l'objet `ItemDto` dans notre API) doit obligatoirement inclure un champ `taxGroup`. Voici comment choisir la bonne lettre selon la nature de l'opération.

### Taux Standards (TVA facturée au client)
* **Groupe B (16%) :** Ce groupe est utilisé pour les opérations soumises expressément au taux normal de TVA de 16% réalisées par une entreprise assujettie. La TVA est facturée à 16%.
* **Groupe C (8%) :** Ce groupe est réservé aux opérations soumises expressément au taux réduit de TVA de 8%. La TVA est facturée à 8%.

### Exonérations et Taux Zéro
* **Groupe A (Exonéré) :** Concerne les opérations non soumises à la TVA réalisées par une entreprise assujettie. La TVA n'est pas facturée.
* **Groupe E (Exportations) :** Utilisé pour les opérations de vente à l'exportation de biens et services. Ce groupe inclut également les ventes effectuées sous-douane. La TVA y est facturée à 0%.

### Régimes Dérogatoires et Marchés Publics
* **Groupe D (Régimes dérogatoires) :** Opération taxable pour laquelle l'État prend en charge la TVA pour le compte du bénéficiaire, comme les missions diplomatiques ou consulaires. La TVA n'est pas facturée.

:::warning Groupe D
Le vendeur est tenu d'enregistrer la référence du document de dérogation délivré par la DGI au niveau du champ "Commentaire - Ligne A" (`cmta`) de l'API.
:::

* **Groupe F (Marché public - 16%) :** Opération taxable au taux normal de 16% pour laquelle l'État prend en charge la TVA sous forme de crédit d'impôt. La TVA est facturée à 16%, mais payée par crédit d'impôt.
* **Groupe G (Marché public - 8%) :** Opération taxable au taux réduit de 8% prise en charge par l'État sous forme de crédit d'impôt. La TVA est facturée à 8%, mais payée par crédit d'impôt.

### Opérations Spécifiques (TVA non facturée)
* **Groupe H (Consignation) :** Utilisé pour les montants perçus à titre de consignation lors de la livraison d'emballages récupérables. La TVA n'est pas facturée.
* **Groupe I (Garantie et caution) :** Concerne les montants déposés en garantie d'une transaction, qui ne constituent pas un chiffre d'affaires. La TVA n'est pas facturée.
* **Groupe J (Débours) :** Réservé aux remboursements de frais facturés pour leur montant exact au client. Par exemple, des frais de manutention reversés dans leur totalité à un partenaire. La TVA n'est pas facturée.
* **Groupe K (Non-assujettis) :** Opérations réalisées par des entreprises n'ayant pas atteint le seuil d'assujettissement à la TVA. La TVA n'est pas facturée.

### Taxes, Prélèvements et Ventes Réglementées
* **Groupe L (Prélèvements sur ventes) :** Ce groupe est utilisé pour les taxes et prélèvements qui n'entrent pas dans la base imposable de la TVA. Cela inclut les taxes provinciales, les droits d'accises (DGDA), ou la taxe FPI. La TVA n'est pas facturée sur ces lignes.
* **Groupe M (Ventes réglementées) :** Utilisé pour les secteurs avec une réglementation particulière (ex: hydrocarbures). Seul le montant hors taxes (HT) est facturé sur cette ligne.
* **Groupe N (TVA Spécifique liée au Groupe M) :** Ce groupe retrace la TVA spécifique liée aux ventes facturées sous le groupe M. Seul le montant de la TVA spécifique est facturé.

---

## 2. Le fonctionnement de la "Taxe Spécifique"

En RDC, certains articles sont soumis à d'autres taxes (OCC, DGRK, etc.) en plus de la TVA. Le traitement de ces taxes dépend d'une règle stricte : **entrent-elles ou non dans la base imposable de la TVA ?**

### Règle de décision : Taxe Spécifique vs Groupe L

1.  **La taxe entre dans la base de calcul de la TVA :** Elle doit être intégrée directement au niveau de l'article dans le champ réservé aux taxes spécifiques (`taxSpecificValue` ou `taxSpecificAmount`). *Exemple : La taxe de consommation DGRK ou l'OCC (si applicable à la base TVA).*
2.  **La taxe n'entre PAS dans la base de calcul de la TVA :** L'article principal garde son groupe de taxation normal, et vous devez créer une **nouvelle ligne d'article** sur la facture avec le groupe de taxation **L** (Prélèvements sur ventes) pour isoler ce montant.

:::warning Taxes à la charge du vendeur
Les taxes et prélèvements qui sont à la charge exclusive du vendeur (par exemple, la contribution ARSP) ne doivent pas figurer sur la facture de vente destinée au client.
:::

### Comment gérer plusieurs taxes spécifiques sur un même article ?

Si un même article est frappé par plusieurs taxes qui rentrent toutes dans la base de la TVA, voici la procédure imposée par la DGI :
1.  **Cumul des montants :** La valeur cumulée de l'ensemble de ces taxes doit être additionnée et enregistrée dans le champ unique `taxSpecificValue` ou `taxSpecificAmount` de l'article.
2.  **Explication obligatoire :** Les détails relatifs à chacune de ces taxes individuelles doivent obligatoirement être renseignés dans les lignes de commentaires de la facture (champs `cmta` à `cmth` de notre API).

### Exemple JSON (Article avec Taxe Spécifique)

Voici comment formater un article vendu 1000 CDF, soumis à la TVA 16% (Groupe B), avec une taxe spécifique (ex: OCC) de 25 CDF qui rentre dans la base TVA.

```json
{
  "items": [
    {
      "name": "Produit d'importation",
      "price": 1000.00,
      "quantity": 1.0,
      "taxGroup": "B", 
      "type": "BIE",
      "taxSpecificAmount": 25.00
    }
  ],
  "cmta": "Détail taxe spécifique : OCC (25 CDF)" 
}
```
Dans ce cas, Fiscalis et la DGI calculeront la TVA (16%) sur une base de 1025 CDF (Prix unitaire + Taxe spécifique).