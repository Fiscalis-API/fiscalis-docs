---
id: fundamental-concepts
title: Fundamental Concepts
sidebar_position: 3
---

# Fundamental Concepts 🧠

Before diving into raw API requests, it's important to understand the business architecture of Fiscalis. This section details the founding principles of the platform, from limit management to certification methods, including data retention.

## Environments

Fiscalis provides two distinct environments to secure your developments:

- **Sandbox:** A free testing environment to validate your integrations without sending real data to the tax administration. The certifications generated here are fictitious.
- **Production:** The real environment. The invoices submitted here are legally certified and transmitted to the DGI.

:::warning Caution
Never point your test applications to the production environment. Make sure your API keys (see [Authentication](./authentication)) correspond to the correct environment.
:::

## Plans and Invoice Counting

Our SaaS pricing model has been designed to be as close as possible to the reality of local businesses.

Unlike other systems, **billing is not based on the number of connected MCF terminals, but strictly on the volume of annual invoices issued.**

Our plans (like the *Start* or *Grow* tiers) offer annual invoice limits adapted to the size of your company. The API will return an HTTP code `429 Too Many Requests` if the organization's annual quota is reached.

## Tax Certification Modes

To adapt to all technical infrastructures, Fiscalis offers **two priority options** for the certification of your invoices:

1. **The Fiscal Control Module (MCF):** Direct communication with a physical hardware box on site.
2. **The DGI Web API:** A purely software (cloud) integration communicating directly with the tax administration's servers, without the need for additional hardware.

The choice of option is made in your organization's settings and is transparent during the API call.

:::info Information
The notion of priority does not mean that standardization will be done only by one of the two options. Here it is a question of which service is contacted first, the ***MCF*** or the ***DGI Web API***.
:::

## The Immutable Registry (`LogInvoices`)

Tax compliance requires foolproof traceability. This is why Fiscalis maintains a strict logging table called `LogInvoices`.

:::info Source of Truth for Reporting
This register contains the complete history of all certification attempts and successes. **It is never emptied**. Even if an invoice is canceled in your ERP, the trace of its initial certification will remain intact in `LogInvoices`, guaranteeing reliable audit reports in the event of a tax audit.
:::

## Filtering, Searching and Pagination

When you query the API to retrieve invoices or generate reports, you have powerful filtering tools at your disposal:

- **Search by identifier:** The text search parameter is intelligent. If you search for a term, the API will automatically filter on both your internal invoice number (`rn`) and the official certification code (`codeDEFDGI`).
- **Filter by Date:** Essential for accounting, the API integrates a precise date filter to extract invoices from a given period (e.g., monthly closing).
