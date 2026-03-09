---
slug: dgi-update-march-2026
title: Mise à jour DGI mars 2026
authors: bush243
tags: [tax-groups, mcf]
---

# Mise à jour DGI 2026 : Ce qui change pour vos factures normalisées (Nouveaux taux et Groupes de taxation)

Dans le cadre de l'application de la loi de finances gestion 2026 , la Direction Générale des Impôts (DGI) a publié une mise à jour importante (Mars 2026) concernant les groupes de taxation applicables à la facture normalisée.

Afin de vous garantir une conformité continue et d'assurer le bon fonctionnement de la normalisation de vos factures, voici le récapitulatif des changements majeurs que vous devez prendre en compte dans vos systèmes dès à présent.

:::info Ressources Officielles à Télécharger
Pour vous permettre de consulter l'intégralité de ces mesures et d'adapter vos processus comptables en toute sérénité, nous mettons à votre disposition les documents de référence. Vous pouvez télécharger ci-dessous la nouvelle spécification détaillée des groupes de taxation ainsi que la correspondance du Ministre des Finances justifiant cette mise à jour :

- [Télécharger : Nouvelle grille des groupes de taxation (Mise à jour Février 2026)](/documents/FACNO_Groupes_de_Taxation_v1.2.pdf)
- [Télécharger : Lettre / Circulaire du Ministre des Finances](/documents/NOTE_DE_SERVICE_No_01_022.pdf)
:::

## Baisse du taux réduit de la TVA (de 8 % à 5 %)
La modification la plus impactante concerne la révision à la baisse du taux réduit de la TVA, qui passe de 8 % à 5 %. Cela affecte deux groupes de taxation existants :

- **Groupe C (Taxable 5 %)** : Concerne les opérations soumises expressément au taux réduit.

- **Groupe G (TVA marché public à financement extérieur 5 %)** : Concerne les opérations où l'État prend en charge la TVA sous forme de crédit d'impôt.

- **Action requise** : Assurez-vous de mettre à jour le paramétrage de vos articles et services soumis à l'ancien taux de 8 % pour appliquer le nouveau taux de 5 % dans vos logiciels de facturation.

## Introduction d'un nouveau taux super-réduit à 1 %
Pour s'aligner sur la nouvelle loi de finances, l'administration fiscale a créé deux nouveaux groupes de taxation pour gérer un taux de TVA à 1 %:

- **Groupe O (Taxable 1 %)** : Dédié aux opérations soumises expressément à ce nouveau taux réduit de 1 %.

- **Groupe P (TVA marché public à financement extérieur 1 %)** : Dédié aux opérations taxables à 1 % dont la TVA est payée par crédit d'impôt.

## Nouvelle règle stricte pour les opérations "Hors Champ" (Groupe A)
Le Groupe A, qui gérait déjà les opérations exonérées, intègre désormais explicitement les opérations **hors champ** (qui n'entrent pas dans le champ d'application de la TVA).

- **La nouvelle contrainte** : Si vous facturez une opération hors champ, il est désormais obligatoire de renseigner la valeur exacte `HORS CHAMP` dans le champ `code` de la ligne concernée.

- **Action requise** : Vos opérateurs de saisie ou votre système automatisé doivent s'assurer d'insérer cette mention exacte au lieu de votre code article interne habituel pour ces transactions spécifiques.

## Ce qui ne change pas

- Le taux normal de la TVA reste maintenu à 16 % (Groupes B et F).

- Les autres groupes (Exportation, Consignation, Débours, Prélèvements sur ventes, etc.) conservent leurs règles de fonctionnement habituelles.

## Notre accompagnement
Notre API est d'ores et déjà mise à jour pour supporter ces nouveaux groupes (O et P) et router correctement vos factures vers le système e-MCF de la DGI. Nous vous invitons à configurer vos catalogues d'articles et vos ERP pour refléter ces nouveaux taux de 5 % et 1 % afin d'éviter tout rejet lors de la normalisation.