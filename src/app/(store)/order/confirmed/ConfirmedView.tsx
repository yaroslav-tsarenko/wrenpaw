"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Flag, StatusFlag } from "@/components/ui/Flag";
import { Alert } from "@/components/ui/Alert";
import { TrailLoader } from "@/components/ui/TrailLoader";
import { Stage } from "@/components/product/ProductEntry/ProductEntry";
import { TotalsList } from "@/components/checkout/TotalsList";
import { useCart } from "@/providers/CartProvider";
import { useAuth } from "@/providers/AuthProvider";
import { formatPrice } from "@/lib/utils/format-price";
import { addressLines, deliveryEstimate, plateStatusFor, type OrderView } from "@/lib/orders";
import { COMPANY } from "@/lib/company";
import { STORE_POLICY } from "@/config/store-policy";

type Verification = "confirmed" | "pending" | "failed" | "review" | "unavailable";
type ViewState = "checking" | Verification | "missing" | "notFound" | "error";

const MAX_ATTEMPTS = 10;
const INTERVAL_MS = 3000;

function OrderStamp({ number }: { number: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const key = `wrenpaw-confirmed-${number}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch {
      return;
    }
    ref.current?.setAttribute("data-play", "");
  }, [number]);
  return (
    <div ref={ref} data-stamp="" className="mx-auto w-full max-w-[340px]">
      <span aria-hidden="true" className="rule-strong" />
      <div className="flex items-end justify-between gap-4 pt-4">
        <span aria-hidden="true" className="flex items-end gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="block bg-brand-2 [[data-stamp][data-play]_&]:animate-drop-in"
              style={{ width: 10, height: 10, marginBottom: i * 5, animationDelay: `${i * 90}ms` }}
            />
          ))}
        </span>
        <span className="tabular text-right text-step-2 leading-none text-ink">{number}</span>
      </div>
      <span aria-hidden="true" className="rule mt-4" />
    </div>
  );
}

function OrderSummary({ order }: { order: OrderView }) {
  const t = useTranslations("checkout.confirmed");
  const estimate = deliveryEstimate(order.delivery?.country);
  return (
    <div className="flex flex-col gap-8 border-t border-line pt-8">
      <section aria-labelledby="confirmed-items">
        <h2 id="confirmed-items" className="m-0 mb-4 text-step-2 leading-none text-ink">
          {t("itemsTitle")}
        </h2>
        <ul className="m-0 flex list-none flex-col divide-y divide-line p-0">
          {order.lines.map((line) => (
            <li key={line.id} className="flex items-center gap-4 py-3">
              <Stage src={line.imageUrl} alt="" size="mini" sizes="64px" className="w-16 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="m-0 line-clamp-2 text-ui-sm font-medium text-ink">{line.name}</p>
                <p className="meta tabular m-0 text-ink-muted">{t("lineQty", { count: line.quantity, unit: formatPrice(line.unit, order.currency) })}</p>
              </div>
              <p className="tabular m-0 shrink-0 text-ui-sm text-ink">{formatPrice(line.total, order.currency)}</p>
            </li>
          ))}
        </ul>
        <span aria-hidden="true" className="rule" />
        <TotalsList totals={order.totals} currency={order.currency} showCurrencyCode totalSize="md" className="mt-5" />
      </section>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <section aria-labelledby="confirmed-delivery">
          <h2 id="confirmed-delivery" className="eyebrow m-0 mb-2 text-ink-muted">
            {t("deliveryTitle")}
          </h2>
          <p className="m-0 text-ui-sm leading-[1.6] text-ink">
            {addressLines(order.delivery).map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </section>
        <section aria-labelledby="confirmed-when">
          <h2 id="confirmed-when" className="eyebrow m-0 mb-2 text-ink-muted">
            {t("whenTitle")}
          </h2>
          <p className="m-0 text-ui-sm leading-[1.6] text-ink">{t("when", { processing: estimate.processing, transit: estimate.transit })}</p>
        </section>
      </div>
    </div>
  );
}

export function ConfirmedView() {
  const t = useTranslations("checkout.confirmed");
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const { user } = useAuth();
  const paymentLinkId = searchParams.get("id") || searchParams.get("paymentLinkId");
  const checkoutId = searchParams.get("checkoutId");
  const [state, setState] = useState<ViewState>(paymentLinkId && checkoutId ? "checking" : "missing");
  const [order, setOrder] = useState<OrderView | null>(null);
  const [run, setRun] = useState(0);
  const cleared = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!paymentLinkId || !checkoutId) return;
    let cancelled = false;
    let timer: number | undefined;
    let attempt = 0;
    const poll = async () => {
      attempt += 1;
      try {
        const res = await fetch(`/api/orders/verify?paymentLinkId=${encodeURIComponent(paymentLinkId)}&checkoutId=${encodeURIComponent(checkoutId)}`, { cache: "no-store" });
        if (cancelled) return;
        if (res.status === 404) return setState("notFound");
        if (!res.ok) return setState("error");
        const data = (await res.json()) as { verification: Verification; order: OrderView };
        if (cancelled) return;
        setOrder(data.order);
        if (data.verification === "pending" && attempt < MAX_ATTEMPTS) {
          setState("checking");
          timer = window.setTimeout(poll, INTERVAL_MS);
          return;
        }
        setState(data.verification);
      } catch {
        if (!cancelled) setState("error");
      }
    };
    poll();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [paymentLinkId, checkoutId, run]);

  useEffect(() => {
    if (state === "confirmed" && !cleared.current) {
      cleared.current = true;
      clearCart();
      try {
        sessionStorage.removeItem("wrenpaw-checkout-draft");
      } catch {}
    }
    if (state !== "checking") headingRef.current?.focus();
  }, [state, clearCart]);

  const recheck = () => {
    setState("checking");
    setRun((n) => n + 1);
  };

  const frame = (children: React.ReactNode) => (
    <div className="mx-auto flex max-w-[720px] flex-col gap-8 px-gutter pb-24 pt-10 lg:pt-16">{children}</div>
  );

  if (state === "checking") {
    return frame(
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-5 text-center" aria-live="polite">
        <TrailLoader label={t("checking.title")} />
        <h1 className="m-0 text-step-3 leading-[1.1] text-ink">{t("checking.title")}</h1>
        <p className="measure m-0 text-ink-muted">{t("checking.body")}</p>
      </div>,
    );
  }

  const heading = (text: string) => (
    <h1 ref={headingRef} tabIndex={-1} className="m-0 text-step-4 leading-[1.05] text-ink outline-none">
      {text}
    </h1>
  );

  if (state === "confirmed" && order) {
    return frame(
      <>
        <OrderStamp number={order.number} />
        <div className="flex flex-col items-center gap-4 text-center">
          {heading(order.firstName ? t("confirmedState.title", { name: order.firstName }) : t("confirmedState.titleNoName"))}
          <p className="measure m-0 text-step-1 text-ink-muted">{t("confirmedState.email", { email: order.email })}</p>
          <p className="meta m-0 text-ink-muted">{t("confirmedState.paid", { total: formatPrice(order.totals.total, order.currency) })}</p>
        </div>
        <OrderSummary order={order} />
        <div className="flex flex-wrap items-center gap-4 border-t border-line pt-8">
          {user ? (
            <Button as={Link} href={`/account/orders/${order.id}`}>
              {t("viewOrder")}
            </Button>
          ) : null}
          <Button as={Link} href="/catalog" variant="outline">
            {t("continueShopping")}
          </Button>
        </div>
      </>,
    );
  }

  if (state === "failed") {
    return frame(
      <>
        <div className="flex flex-col gap-4">
          {order ? <StatusFlag status={plateStatusFor("paymentFailed")} label={t("plates.failed")} className="self-start" /> : null}
          {heading(t("failed.title"))}
          <p className="measure m-0 text-step-1 text-ink-muted">{t("failed.body")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button as={Link} href="/checkout?payment=failed">
            {t("failed.retry")}
          </Button>
          <Button as={Link} href="/cart" variant="outline">
            {t("failed.bag")}
          </Button>
        </div>
        <p className="meta m-0 text-ink-muted">{t("failed.help", { email: COMPANY.email })}</p>
      </>,
    );
  }

  if ((state === "pending" || state === "review" || state === "unavailable") && order) {
    const key = state === "pending" ? "pending" : state === "review" ? "review" : "unavailable";
    return frame(
      <>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <StatusFlag status={plateStatusFor("awaitingPayment")} label={t("plates.awaiting")} />
            <Flag variant="neutral" className="font-mono">
              {order.number}
            </Flag>
          </div>
          {heading(t(`${key}.title`))}
          <p className="measure m-0 text-step-1 text-ink-muted">
            {t(`${key}.body`, { email: order.email, replyTime: STORE_POLICY.support.replyTime, support: COMPANY.email })}
          </p>
        </div>
        {state !== "review" ? (
          <div className="flex flex-wrap items-center gap-4">
            <Button onPress={recheck}>{t("pending.recheck")}</Button>
            <Button as={Link} href="/contact" variant="outline">
              {t("contactUs")}
            </Button>
          </div>
        ) : (
          <Button as={Link} href="/contact" variant="outline" className="self-start">
            {t("contactUs")}
          </Button>
        )}
        <OrderSummary order={order} />
      </>,
    );
  }

  if (state === "missing") {
    return frame(
      <>
        {heading(t("missing.title"))}
        <p className="measure m-0 text-step-1 text-ink-muted">{t("missing.body")}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Button as={Link} href={user ? "/account/orders" : "/catalog"}>
            {user ? t("missing.orders") : t("continueShopping")}
          </Button>
          <Button as={Link} href="/cart" variant="outline">
            {t("failed.bag")}
          </Button>
        </div>
      </>,
    );
  }

  return frame(
    <>
      {heading(t("error.title"))}
      <Alert tone="danger" title={state === "notFound" ? t("error.notFound") : t("error.generic")}>
        {t("error.body", { email: COMPANY.email })}
      </Alert>
      <div className="flex flex-wrap items-center gap-4">
        <Button onPress={recheck} isDisabled={!paymentLinkId || !checkoutId}>
          {t("pending.recheck")}
        </Button>
        <Button as={Link} href="/contact" variant="outline">
          {t("contactUs")}
        </Button>
      </div>
    </>,
  );
}
