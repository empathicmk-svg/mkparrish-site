import { STRIPE_AUDIT } from "@/app/lib/config";

export const AUDIT_TITLE = "The 48-Hour Positioning Audit";
export const AUDIT_PRICE = "$97";

export function getAuditCheckoutUrl() {
  return process.env.NEXT_PUBLIC_AUDIT_CHECKOUT_URL?.trim() || STRIPE_AUDIT;
}
