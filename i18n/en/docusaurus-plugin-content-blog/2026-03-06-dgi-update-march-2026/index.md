---
slug: dgi-update-march-2026
title: DGI Update March 2026
authors: bush243
tags: [tax-groups, mcf]
---

# DGI Update 2026: What's Changing for Your Standardized Invoices (New Rates and Tax Groups)

As part of the application of the 2026 Finance Act, the General Tax Directorate (DGI) has published an important update (March 2026) concerning the tax groups applicable to standardized invoices.

To ensure your continued compliance and the proper functioning of your invoice standardization, here is a summary of the major changes you need to implement in your systems now.

:::info Official Resources to Download
To allow you to review all these measures in detail and adapt your accounting processes with complete peace of mind, we are providing the reference documents. You can download the new detailed taxation groups specification as well as the Minister of Finance's correspondence outlining this update below:

- [Download: New Taxation Groups Grid (February 2026 Update)](/documents/FACNO_Groupes_de_Taxation_v1.2.pdf)
- [Download: Minister of Finance's Letter / Circular](/documents/NOTE_DE_SERVICE_No_01_022.pdf)
:::


## Reduction of the Reduced VAT Rate (from 8% to 5%)
The most significant change is the downward revision of the reduced VAT rate, which drops from 8% to 5%. This affects two existing tax groups:

- **Group C (Taxable 5%)**: Concerns operations expressly subject to the reduced rate.

- **Group G (Public Contract VAT with External Financing 5%)**: Concerns operations where the State covers the VAT in the form of a tax credit.

- **Action Required**: Make sure to update the settings for your items and services subject to the old 8% rate to apply the new 5% rate in your invoicing software.

## Introduction of a New Super-Reduced Rate at 1%
To align with the new finance law, the tax administration has created two new tax groups to handle a 1% VAT rate:

- **Group O (Taxable 1%)**: Dedicated to operations expressly subject to this new 1% reduced rate.

- **Group P (Public Contract VAT with External Financing 1%)**: Dedicated to operations taxable at 1% for which the VAT is paid by tax credit.

## New Strict Rule for "Out of Scope" Operations (Group A)
Group A, which already managed exempt operations, now explicitly includes **out of scope** operations (which do not fall within the scope of VAT application).

- **The new constraint**: If you invoice an out-of-scope operation, it is now mandatory to enter the exact value `HORS CHAMP` in the `code` field of the relevant line.

- **Action Required**: Your data entry operators or your automated system must ensure this exact mention is inserted instead of your usual internal item code for these specific transactions.

## What's Not Changing

- The standard VAT rate remains at 16% (Groups B and F).

- Other groups (Export, Consignment, Disbursements, Sales Levies, etc.) retain their usual operating rules.

## Our Support
Our API is already updated to support these new groups (O and P) and correctly route your invoices to the DGI's e-MCF system. We invite you to configure your item catalogs and ERPs to reflect these new 5% and 1% rates to avoid any rejection during standardization.

