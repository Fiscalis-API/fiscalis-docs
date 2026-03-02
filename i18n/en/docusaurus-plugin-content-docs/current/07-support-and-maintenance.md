---
id: support-and-maintenance
title: Support & Maintenance
sidebar_position: 7
---

# Support & Maintenance

The Fiscalis team is committed to providing a highly available infrastructure to ensure that your billing processes are never interrupted. This section explains how to track the status of our services, keep you informed of updates, and contact our technical support.

## 1. System Status & Availability

Since our API acts as a bridge to the DGI's servers, availability depends on both our infrastructure and that of the tax administration.

### Check the Status of the Fiscalis API
To check if our servers are operational before launching a series of requests, you can use our public status endpoint:

```http
GET http://87.106.10.40/api/v1/status
Accept: application/json
```

### Expected Response (200 OK):
```json
{
  "status": true,
  "version": "1.0",
  "serverDateTime": "2026-03-01T10:00:00Z"
}
```
:::tip DGI Outage Management
If the DGI's servers (e-MCF) experience slowdowns or temporary unavailability, our API will return a specific error (e.g., HTTP 503 or a specific internal error code). We recommend that you implement a retry mechanism with an exponential backoff in your ERP for failed invoices.
:::

## 2. Changelog
The Fiscalis API is versioned (currently `v1`). We guarantee that all minor updates within this version will be backward compatible.

If major changes imposed by legislation (such as an update to the DGI's e-MCF protocol) require modifying the structure of the JSON payload, we will proceed as follows:
1. Early communication: An email will be sent to the organization's administrators 30 days before the change.
2. New version: A new version of the API (e.g., v2) will be deployed in parallel with the old one to give you time to migrate your code.

## 3. Technical FAQ

Here are the most frequently encountered problems during integration:

- I receive a `401 Unauthorized` error with every request.
    - Verification: Make sure that your request header contains `Authorization: Bearer YOUR_KEY`. Also check on your dashboard that the API key has not been deactivated via the toggle.
- The API returns the error "The invoice reference cannot be empty" (Code 31).
    - *Verification: Check that the `rn` field (your internal invoice number) is correctly filled in your JSON payload*.
- I receive a `429 Too Many Requests` error.
    - *Verification: Your organization has reached the annual invoice limit allowed by your SaaS plan. Please contact your administrator to upgrade to the next tier (e.g., Grow plan)*.

## 4. Contacting Technical Support

If you encounter unexpected API behavior that is not documented in this Wiki, our technical maintenance team is here to help you.

For a quick processing of your request, please include the following elements in your ticket:

- The environment concerned (`Sandbox` or `Production`).
- The exact date and time of the failed request.
- The complete JSON payload of the request (masking your API key).
- The exact error message and code returned by Fiscalis.

### Contact us:
📧 Email: support-dev@fiscalis-app.com
💬 Customer portal: Accessible from your administrator dashboard.
