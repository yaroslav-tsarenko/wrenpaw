"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/layout/BrandMark";
import { POLICY_FACTS } from "@/lib/policy-facts";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Colophon() {
  const t = useTranslations("home.colophon");
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const facts = [
    { label: t("factDelivery"), value: POLICY_FACTS.freeThreshold },
    { label: t("factReturns"), value: t("days", { count: POLICY_FACTS.withdrawalDays }) },
    { label: t("factWarranty"), value: t("months", { count: POLICY_FACTS.warrantyMonths }) },
  ];

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL_PATTERN.test(value)) {
      setError(t("invalid"));
      return;
    }
    setError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("idle");
      setError(t("error"));
    }
  };

  return (
    <section aria-labelledby={`${id}-title`} className="px-gutter pb-20 pt-12 lg:pt-16">
      <div className="on-paint mx-auto max-w-container bg-paint px-6 py-10 text-on-paint sm:px-10 lg:px-14 lg:py-14">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <Wordmark tone="on-paint" className="text-step-5" />
            <dl className="m-0 mt-8 grid grid-cols-[auto_1fr] gap-x-8">
              {facts.map((fact) => (
                <div key={fact.label} className="col-span-2 grid grid-cols-subgrid border-t border-on-paint-line py-3">
                  <dt className="eyebrow self-center text-on-paint-muted">{fact.label}</dt>
                  <dd className="tabular m-0 self-center text-right text-ui-md text-on-paint">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="min-w-0 lg:col-span-6 lg:col-start-7">
            <h2 id={`${id}-title`} className="m-0 text-step-3 leading-[1.12] text-on-paint">
              {t("title")}
            </h2>
            <p className="m-0 mt-3 max-w-[40ch] text-step-0 leading-[1.6] text-on-paint-muted">{t("lead")}</p>
            <div aria-live="polite" className="mt-7">
              {status === "done" ? (
                <p className="m-0 border-t border-on-paint-line pt-5 text-step-1 font-medium text-on-paint">{t("success", { email: email.trim() })}</p>
              ) : (
                <form noValidate onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <Input
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    label={t("label")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error}
                    required
                    wrapperClassName="flex-1 [&_label]:text-on-paint-muted [&_p]:text-on-paint"
                  />
                  <Button type="submit" size="md" variant="secondary" className="h-11 shrink-0 border-on-paint-line text-on-paint hover-device:hover:border-brand-on-paint hover-device:hover:bg-transparent" isLoading={status === "sending"}>
                    {t("cta")}
                  </Button>
                </form>
              )}
            </div>
            <p className="meta m-0 mt-5 text-on-paint-muted">
              {t("note")}{" "}
              <Link href="/policies/privacy" className="text-on-paint underline decoration-1 underline-offset-4 hover-device:hover:decoration-2">
                {t("privacy")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
