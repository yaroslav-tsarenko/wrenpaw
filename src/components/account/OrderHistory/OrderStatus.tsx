"use client";

import { useTranslations } from "next-intl";
import { StatusFlag } from "@/components/ui/Flag";
import { plateStatusFor, type CustomerOrderState } from "@/lib/orders";

export function OrderStatus({ state, className }: { state: CustomerOrderState; className?: string }) {
  const t = useTranslations("account.states");
  return <StatusFlag status={plateStatusFor(state)} label={t(state)} className={className} />;
}
