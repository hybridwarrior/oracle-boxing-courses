# Stripe Live Product & Price IDs

This file contains the live (production) Stripe product and price IDs. Fill in the blanks below with your live IDs from the Stripe Dashboard.

**⚠️ Important:** This file should be added to `.gitignore` to avoid committing live IDs to version control.

---

## Public Products

### Bundle (Oracle Boxing Bundle)
- **Product ID:** `prod_TKqgHrxaUX30MC`
- **Price ID (USD):** `price_1SOAyuKPvH4Ddlg1nRnvrgrF`
- **Metadata:** `obm`
- **Price:** $397

### Boxing Masterclass (BFFP)
- **Product ID:** `prod_TKqgg2tjyp9j4f`
- **Price ID (USD):** `price_1SOAzDKPvH4Ddlg1skHdr4H0`
- **Metadata:** `bffp`
- **Price:** $297

### Boxing Roadmap
- **Product ID:** `prod_TKgxoODHTfkQEF`
- **Price ID (USD):** `price_1SO1Z7KPvH4Ddlg1vrWUxFWX`
- **Metadata:** `brdmp`
- **Price:** $147

---

## Memberships

### Oracle Membership - Quarterly (3 months)
- **Product ID:** `prod_TKqg25PDS8om6s`
- **Price ID (Multicurrency):** `price_1SOAysKPvH4Ddlg1JTdPV3rt`
- **Metadata:** `memq`
- **Price:** $297 / 3 months

### Oracle Membership - 6-Month
- **Product ID:** `prod_TKqg25PDS8om6s` (same as quarterly)
- **Price ID (Multicurrency):** `price_1SOAysKPvH4Ddlg1JTdPV3rt`
- **Metadata:** `mem6`
- **Price:** $497 / 6 months

### Oracle Membership - Annual
- **Product ID:** `prod_TKqg25PDS8om6s` (same as quarterly)
- **Price ID (Multicurrency):** `price_1SOAysKPvH4Ddlg1JTdPV3rt`
- **Metadata:** `mema`
- **Price:** $897 / year

---

## Internal Products (Not Publicly Displayed)

### 6-Week Challenge
- **Product ID:** `prod_TKqgLcTbkwLMlK`
- **Price ID (USD):** `price_1SOAyqKPvH4Ddlg1jWX78mP7`
- **Metadata:** `6wc`
- **Price:** $197

### Recordings Vault Access
- **Product ID:** `prod_TKqg9nRbK27CDg`
- **Price ID (USD):** `price_1SOAyoKPvH4Ddlg1LwFtCdm2`
- **Metadata:** `rcv`
- **Price:** $97

### Lifetime Access to Boxing Masterclass
- **Product ID:** `prod_TKqgCP3kcRQ7Rw`
- **Price ID (USD):** `price_1SOAyiKPvH4Ddlg1EuokXH49`
- **Metadata:** `ltbffp`
- **Price:** $147

---

## Lifetime Access Variants (Member Pricing)

### Lifetime All Courses - Monthly Member
- **Product ID:** `prod_`
- **Price ID (USD):** `price_`
- **Metadata:** `ltall_297`
- **Price:** $297

### Lifetime All Courses - 6-Month Member
- **Product ID:** `prod_`
- **Price ID (USD):** `price_`
- **Metadata:** `ltall_247`
- **Price:** $247

### Lifetime All Courses - Annual Member
- **Product ID:** `prod_`
- **Price ID (USD):** `price_`
- **Metadata:** `ltall_197`
- **Price:** $197
^ This is just one price $197 for lifetime aall courses and the upsell is done on the stripe checkout page so you don't need that.
---

1-on-1 Coaching (1 x Month) prod_id prod_TKZFDm6V59aYf7 price id price_1SNu6dKPvH4Ddlg1UbAOpoo4 $397 + multi currency --this is for the success page one click upsell

1-on-1 Coaching (3 Months) prod_id prod_TKZE6NZZFeK8SM this is for the /admin/coaching-checkout but uses dynamic pricing so

## Coaching Products

### 1-on-1 Coaching - Monthly Member
- **Product ID:** `prod_`
- **Price ID (USD):** `price_`
- **Price ID (Multicurrency):** `price_`
- **Metadata:** `coach1`
- **Prices:**
  - Elite Tier: $997
  - VIP Tier: $1,497
  - Mastery Tier: $1,997

### 1-on-1 Coaching - Non-Member (6+ Months)
- **Product ID:** `prod_`
- **Price ID (USD):** `price_`
- **Price ID (Multicurrency):** `price_`
- **Metadata:** `coachv`
- **Prices:**
  - Elite Tier: $1,497
  - VIP Tier: $1,997
  - Mastery Tier: $2,497

---

## Vault Products

### Recordings Vault (Public)
- **Product ID:** `prod_`
- **Price ID (USD):** `price_`
- **Metadata:** `vault`
- **Price:** $197

---

## Order Bump Products (6WC Funnel)

### Recordings Vault - Order Bump
- **Product ID:** `prod_` (same as Recordings Vault Access)
- **Price ID (USD):** `price_`
- **Price:** $97

### Lifetime BFFP - Order Bump
- **Product ID:** `prod_` (same as Lifetime BFFP)
- **Price ID (USD):** `price_`
- **Price:** $147

---

## Course Funnel Order Bumps

### 6-Week Membership - Order Bump
- **Product ID:** `prod_`
- **Price ID (USD):** `price_`
- **Metadata:** `mem1`
- **Price:** $47

---

## Notes

- **Test Mode IDs** are currently in `/lib/products.ts`
- **Live Mode IDs** should be filled in above
- After filling in live IDs, update the product configurations in code
- Multi-currency prices support automatic currency conversion

## How to Update Code

Once you've filled in all live IDs above:

1. Update `/lib/products.ts` with live product/price IDs
2. Update `/lib/coaching-pricing.ts` for coaching products
3. Test thoroughly in production with small transactions
4. Verify webhooks are receiving correct product metadata

---

## Checklist

- [ ] All public product IDs filled in
- [ ] All membership price IDs filled in (multicurrency)
- [ ] Internal product IDs filled in
- [ ] Lifetime access variant IDs filled in
- [ ] Coaching product IDs filled in (both USD and multicurrency)
- [ ] Order bump product IDs verified
- [ ] Code updated with live IDs
- [ ] Test purchase completed successfully
- [ ] Webhook payload verified with live IDs
- [ ] Facebook tracking verified with live transactions
