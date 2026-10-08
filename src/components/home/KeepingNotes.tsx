import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { KEEPING_NOTES } from "@/config/care";
import { Trail } from "@/components/layout/BrandMark";

export async function KeepingNotes({ index }: { index: string }) {
  const t = await getTranslations("home.notes");
  const [pull, ...rest] = KEEPING_NOTES;

  return (
    <section aria-labelledby="notes-title" className="px-gutter py-14 lg:py-24">
      <div className="mx-auto grid max-w-container gap-x-12 gap-y-10 lg:grid-cols-12">
        <div data-reveal="" className="min-w-0 lg:col-span-4">
          <p data-reveal-item="" className="eyebrow m-0 text-ink-subtle">
            <span className="index-numeral mr-3 inline-block align-middle text-[1.75rem] leading-none">{index}</span>
            {t("label")}
          </p>
          <h2 id="notes-title" data-reveal-item="" style={{ "--i": 1 } as React.CSSProperties} className="m-0 mt-5 text-step-4 leading-[1.08] text-ink">
            {t("title")}
          </h2>
          <p data-reveal-item="" style={{ "--i": 2 } as React.CSSProperties} className="standfirst m-0 mt-4">
            {t("lead")}
          </p>
          <Trail aria-hidden="true" className="mt-8 block text-brand-2" style={{ width: 26, height: 26 }} />
        </div>

        <div data-reveal="" className="min-w-0 lg:col-span-7 lg:col-start-6">
          <figure data-reveal-item="" className="m-0 border-l-2 border-brand-2 pl-6">
            <blockquote className="m-0">
              <p className="m-0 font-display text-step-2 leading-[1.3] text-ink">{pull.title}</p>
              <p className="measure m-0 mt-4 text-step-0 leading-[1.6] text-ink-muted">{pull.body}</p>
            </blockquote>
            <figcaption className="mt-4">
              <Link
                href={pull.href}
                className="group inline-flex items-center gap-2 text-ui-sm font-semibold text-ink underline decoration-1 underline-offset-[5px] transition-[text-decoration-thickness] duration-[200ms] hover-device:hover:decoration-2 hover-device:hover:decoration-brand-2"
              >
                {pull.linkLabel}
                <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-[200ms] group-hover:translate-x-1" />
              </Link>
            </figcaption>
          </figure>

          <ul className="m-0 mt-10 grid list-none gap-x-10 p-0 sm:grid-cols-2">
            {rest.map((note, i) => (
              <li key={note.href} data-reveal-item="" style={{ "--i": i + 1 } as React.CSSProperties} className="border-t border-line pt-5">
                <h3 className="m-0 font-sans text-step-1 font-semibold leading-[1.3] tracking-normal text-ink">{note.title}</h3>
                <p className="m-0 mt-2.5 text-ui-sm leading-[1.6] text-ink-muted">{note.body}</p>
                <Link
                  href={note.href}
                  className="mt-3 inline-block text-ui-sm text-ink underline decoration-line-hover decoration-1 underline-offset-[5px] transition-colors duration-[200ms] hover-device:hover:decoration-brand-2"
                >
                  {note.linkLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
