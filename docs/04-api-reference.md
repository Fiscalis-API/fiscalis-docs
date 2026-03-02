---
id: api-reference
title: Référence de l'API (Endpoints)
sidebar_position: 4
---

# Référence de l'API (Endpoints) 

Cette section détaille les points de terminaison (endpoints) de l'API Fiscalis. Toutes les requêtes doivent être authentifiées via un Bearer Token et utiliser le format `application/json`.

L'URL de base pour toutes vos requêtes de facturation est :
`http://87.106.10.40/api/v1`

---

## 1. Soumettre une Facture pour Certification

C'est l'endpoint principal de l'API. Il permet de transmettre les données d'une facture issue de votre ERP (ex: Dolibarr) pour qu'Fiscalis s'occupe de la communication avec le MCF ou l'API Web de la DGI en arrière-plan (fusionnant la demande de calcul et la demande de finalisation).

**Endpoint :** `POST /Invoice`

### En-têtes requis (Headers)
- `Authorization: Bearer VOTRE_CLE_API`
- `Content-Type: application/json`

### Corps de la requête (Payload JSON)

Le payload reflète les exigences de la DGI. Notez que les informations d'identification de votre entreprise (comme le NIF vendeur ou l'ISF) sont automatiquement injectées par Fiscalis en fonction de votre clé API.

:::info Gestion Multidevise
Si votre système source est en dollars (USD), envoyez les montants en CDF en précisant les champs `curCode`, `curDate` et `curRate`. Fiscalis transmettra ces valeurs pour permettre l'affichage des deux devises sur le document final. Mettez les valeurs suivant si la facture est en Francs Congolais (CDF) `"curCode":"CDF"` et `"curRate":-1`.
:::

```json
{
    "nif": "A0905435T",
    "rn": "FC0002",
    "mode": "ht",
    "isF": "TEST_SFE",
    "type": "FV",
    "curCode": "USD",
    "curDate" : "2026-02-28T17:05:06.568Z",
    "curRate": "2500",
    "items": [
        {
            "code": "LR 1515",
            "name": "STYLO BIC",
            "type": "BIE",
            "price": "600.00",
            "quantity": "2.0",
            "taxGroup": "B",
            "taxSpecificValue": "0.00%",
            "taxSpecificAmount": "0.00",
            "origìnaÎPříče": "600.00",
            "priceModification": ""
        },
        {
            "code": " ---DEEE",
            "name": "MAIN D'OEUVRE",
            "type": "SER",
            "price": "30.00",
            "quantity": "1.0",
            "taxGroup": "B",
            "taxSpecificValue": "0.00%",
            "taxSpecificAmount": "0.0",
            "originalPrice": "30.00",
            "priceModification": ""
        }
    ],
    "client": {
        "nif": "A000000A",
        "type": "PM",
        "typeDesc": "Personne morale",
        "name": "DUPONT",
        "contact": "+330562380000",
        "address": "25 rue du taur 31850 MONTRABE"
    },
    "payments": [
        {
            "name": "CHEQUES",
            "amount": "1476.0",
            "curCode": "USD",
            "curRate": "2500"
        }
    ],
    "operator": {
        "id": "01",
        "name": "ADMIN"
    }
}
```

### Détail des champs clés

- `rn` : Le numéro de la facture généré par votre SFE (Système de Facturation d'Entreprise).
- `type` : Type de la facture. Utilisez :
    - `FV` : Facture de vente
    - `FT` : Facture d’acompte ou d’avance
    - `FA` : Facture d’avoir
    - `EV` : Facture de vente à l’exportation
    - `ET` : Facture d’acompte à l’exportation
    - `EA` : Facture d’avoir à l’exportation
- `mode` : Mode de prix unitaire. Doit être `ttc` ou `ht`.
- `taxGroup` (Items) : Lettre de A à N identifiant la catégorie de taxation de l'article.

 | Groupe Taxation  | Nom  | Description | 
 | :--- | :--- | :--- |
 | A | Exonéré | Opération non soumise à la TVA réalisée par une entreprise assujettie à la TVA (cf. les dispositions des articles 15 à 18 et 20 de l’ordonnance-loi n°10/001 du 20 août 2010 portant institution de la taxe sur la valeur ajoutée). NB: La TVA n’est pas facturée. | 
 | B | Taxable 16% | Opération soumise à la TVA réalisée par une entreprise assujettie à la TVA au taux de 16% (cf. les dispositions des articles 3 à 12 et 35 de l’ordonnance-loi n°10/001 du 20 août 2010 portant institution de la taxe sur la valeur ajoutée). NB: La TVA est facturée à 16%. | 
 | C | Taxable 8% | Opération soumise à la TVA réalisée par une entreprise assujettie à la TVA au taux réduit de 8% (cf. les dispositions des articles 3 à 12 et 35 de l’ordonnance-loi n°10/001 du 20 août 2010 portant institution de la taxe sur la valeur ajoutée). NB: La TVA est facturée à 8%. | 
 | D | Régimes dérogatoires TVA | Opération taxable réalisée par une entreprise assujettie à la TVA, pour laquelle l’État prend en charge la TVA pour le compte du bénéficiaire (cas des missions diplomatiques, consulaires et des organisations internationales). L’utilisation de ce groupe devra être justifiée par les documents délivrés par la DGI attestant de l'exonération. (cf. les dispositions de l’article 19 de l’ordonnance-loi n°10/001 du 20 août 2010). NB: La TVA n’est pas facturée. | 
 | E | Exportation et opérations assimilées | Opération de vente à l’exportation de biens et services taxables ou non taxables réalisée par une entreprise (cf. les dispositions de l’article 35 de l’ordonnance-loi n°10/001 du 20 août 2010). NB: TVA facturée à 0%. | 
 | F | TVA marché public à financement extérieur (16%) | Opération taxable au taux de 16% réalisée par une entreprise assujettie à la TVA, pour laquelle l’État prend en charge en partie ou en totalité la TVA sous forme de crédit d’impôt (cf. les dispositions des articles 14 à 16 de l'arrêté ministériel n°076 du 13 janvier 2012). NB: TVA facturée à 16%, mais payée par crédit d’impôt. | 
 | G | TVA marché public à financement extérieur (8%) | Opération taxable au taux de 8% réalisée par une entreprise assujettie à la TVA, pour laquelle l’État prend en charge en partie ou en totalité la TVA sous forme de crédit d’impôt (cf. les dispositions des articles 14 à 16 de l'arrêté ministériel n°076 du 13 janvier 2012). NB: TVA facturée à 8%, mais payée par crédit d’impôt.
 | H | Consignation / déconsignation d'emballage | Opération relative aux sommes perçues à titre de consignation lors de la livraison d’emballages identifiables, récupérables et réutilisables (cf. l’article 29 de l’ordonnance-loi n°10/001 du 20 août 2010). NB: La TVA n’est pas facturée. | 
 | I | Garantie et caution | Opérations liées aux sommes déposées en garantie d’une opération ; elles ne constituent pas un chiffre d’affaires (cf. l’article 29 de l’ordonnance-loi n°10/001 du 20 août 2010). NB: La TVA n’est pas facturée. | 
 | J | Débours | Opération relative aux remboursements de frais facturés pour leur montant exact au client (cf. l’article 29 de l’ordonnance-loi n°10/001 du 20 août 2010). NB: La TVA n’est pas facturée. | 
 | K | Opérations réalisées par les non-assujettis | Opérations réalisées par des catégories n’ayant pas la qualité d’assujetti redevable de la TVA (ex. : entreprises relevant du régime de l’impôt synthétique, etc.). NB: La TVA n’est pas facturée. | 
 | L | Prélèvements sur ventes | Taxes et prélèvements appliqués aux ventes (taxes parafiscales, taxes provinciales, droits d’accises, etc.) qui n’entrent pas dans la base imposable de la TVA. NB: La TVA n’est pas facturée. | 
 | M | Ventes réglementées avec TVA spécifique | Opérations réalisées par un assujetti redevable de la TVA à un taux spécifique, en application d'une réglementation particulière applicable à son secteur d'activité (ex. : hydrocarbures dont la TVA est réglementée par la structure des prix). NB: Seul le montant hors taxes est facturé. | 
 | N | TVA spécifique | Ce groupe retrace la TVA spécifique liée aux ventes réglementées facturées sous le groupe de taxation M. NB: Seul le montant de la TVA spécifique est facturé. | 


   
- `payment.name` : Méthode de paiement. Valeurs acceptées par la DGI : `ESPECES`, `VIREMENT`, `CARTEBANCAIRE`, `MOBILEMONEY`, `CHEQUES`, `CREDIT`, ou `AUTRE`.