---
id: taxation-groups
title: Taxation Groups & Specific Tax
sidebar_position: 8
---

# Taxation Groups & VAT Calculation Logic 

Tax standardization in the DRC imposes a strict classification of each invoiced item according to "Taxation Groups" (from A to N). This section details the VAT calculation logic for each group and explains how to manage additional taxes (specific taxes).


## 1. Classification of Taxation Groups

Each line of your invoice (the `ItemDto` object in our API) must imperatively include a `taxGroup` field. Here is how to choose the right letter according to the nature of the operation.

### Standard Rates (VAT invoiced to the customer)
* **Group B (16%):** This group is used for operations expressly subject to the normal VAT rate of 16% carried out by a taxable person. VAT is invoiced at 16%.
* **Group C (8%):** This group is reserved for operations expressly subject to the reduced VAT rate of 8%. VAT is invoiced at 8%.

### Exemptions and Zero Rates
* **Group A (Exempt):** Concerns operations not subject to VAT carried out by a taxable person. VAT is not invoiced.
* **Group E (Exports):** Used for export sales of goods and services. This group also includes sales made under customs supervision. VAT is invoiced at 0%.

### Derogatory Regimes and Public Procurement
* **Group D (Derogatory Regimes):** Taxable operation for which the State pays the VAT on behalf of the beneficiary, such as diplomatic or consular missions. VAT is not invoiced.

:::warning Group D
The seller is required to record the reference of the derogation document issued by the DGI in the "Comment - Line A" (`cmta`) field of the API.
:::

* **Group F (Public Procurement - 16%):** Taxable operation at the normal rate of 16% for which the State pays the VAT in the form of a tax credit. VAT is invoiced at 16%, but paid by tax credit.
* **Group G (Public Procurement - 8%):** Taxable operation at the reduced rate of 8% supported by the State in the form of a tax credit. VAT is invoiced at 8%, but paid by tax credit.

### Specific Operations (VAT not invoiced)
* **Group H (Consignment):** Used for amounts collected as a deposit upon delivery of returnable packaging. VAT is not invoiced.
* **Group I (Guarantee and deposit):** Concerns amounts deposited as a guarantee for a transaction, which do not constitute turnover. VAT is not invoiced.
* **Group J (Disbursements):** Reserved for reimbursements of expenses invoiced for their exact amount to the customer. For example, handling fees transferred in their entirety to a partner. VAT is not invoiced.
* **Group K (Non-taxable persons):** Operations carried out by companies that have not reached the VAT liability threshold. VAT is not invoiced.

### Taxes, Levies and Regulated Sales
* **Group L (Levies on sales):** This group is used for taxes and levies that are not included in the VAT taxable base. This includes provincial taxes, excise duties (DGDA), or the FPI tax. VAT is not invoiced on these lines.
* **Group M (Regulated sales):** Used for sectors with specific regulations (e.g., hydrocarbons). Only the amount excluding taxes (HT) is invoiced on this line.
* **Group N (Specific VAT related to Group M):** This group traces the specific VAT related to sales invoiced under group M. Only the amount of the specific VAT is invoiced.

---

## 2. The functioning of the "Specific Tax"

In the DRC, certain items are subject to other taxes (OCC, DGRK, etc.) in addition to VAT. The treatment of these taxes depends on a strict rule: **are they included in the VAT taxable base or not?**

### Decision rule: Specific Tax vs Group L

1.  **The tax is included in the VAT calculation base:** It must be integrated directly at the item level in the field reserved for specific taxes (`taxSpecificValue` or `taxSpecificAmount`). *Example: The DGRK consumption tax or the OCC (if applicable to the VAT base).*
2.  **The tax is NOT included in the VAT calculation base:** The main item keeps its normal taxation group, and you must create a **new item line** on the invoice with the taxation group **L** (Levies on sales) to isolate this amount.

:::warning Taxes to be borne by the seller
Taxes and levies that are the exclusive responsibility of the seller (for example, the ARSP contribution) should not appear on the sales invoice intended for the customer.
:::

### How to manage several specific taxes on the same item?

If the same item is affected by several taxes that are all included in the VAT base, here is the procedure imposed by the DGI:
1.  **Accumulation of amounts:** The cumulative value of all these taxes must be added together and recorded in the single `taxSpecificValue` or `taxSpecificAmount` field of the item.
2.  **Mandatory explanation:** The details relating to each of these individual taxes must imperatively be filled in in the comment lines of the invoice (`cmta` to `cmth` fields of our API).

### JSON Example (Item with Specific Tax)

Here is how to format an item sold for 1000 CDF, subject to 16% VAT (Group B), with a specific tax (e.g., OCC) of 25 CDF which is included in the VAT base.

```json
{
  "items": [
    {
      "name": "Imported product",
      "price": 1000.00,
      "quantity": 1.0,
      "taxGroup": "B", 
      "type": "BIE",
      "taxSpecificAmount": 25.00
    }
  ],
  "cmta": "Specific tax detail: OCC (25 CDF)" 
}
```
In this case, Fiscalis and the DGI will calculate the VAT (16%) on a basis of 1025 CDF (Unit price + Specific tax).