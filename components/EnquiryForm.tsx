"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  MessageCircle,
  Phone,
  TriangleAlert,
} from "lucide-react";

import { company } from "@/config/company";
import {
  enquirySchema,
  SERVICE_OPTIONS,
  type EnquiryInput,
} from "@/lib/validation";

type Result =
  | { kind: "idle" }
  | { kind: "success" }
  | { kind: "error"; message: string };

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}{" "}
        {required ? (
          <span aria-hidden className="text-gold-dark">
            *
          </span>
        ) : (
          <span className="font-normal text-grey">(optional)</span>
        )}
      </label>

      {children}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function EnquiryForm({
  defaultService = "",
}: {
  defaultService?: string;
}) {
  const [result, setResult] = useState<Result>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      service: defaultService,
      message: "Enquiry submitted through the KN Construction website.",
      website: "",
    },
  });

  const onSubmit = (values: EnquiryInput) => {
    setResult({ kind: "idle" });

    const whatsappMessage = `
Hello KN Construction & Builders,

I would like to enquire about your services.

Name: ${values.fullName}
Phone: ${values.phone}
Email: ${values.email?.trim() || "Not provided"}
Service Required: ${values.service}

Please contact me regarding my enquiry.

Thank you.
`.trim();

    try {
      const whatsappUrl = new URL(company.whatsappHref);
      whatsappUrl.searchParams.set("text", whatsappMessage);

      window.open(
        whatsappUrl.toString(),
        "_blank",
        "noopener,noreferrer"
      );

      setResult({ kind: "success" });

      reset({
        fullName: "",
        phone: "",
        email: "",
        service: defaultService,
        message: "Enquiry submitted through the KN Construction website.",
        website: "",
      });
    } catch {
      setResult({
        kind: "error",
        message:
          "Unable to open WhatsApp. Please contact us directly using the buttons below.",
      });
    }
  };

  const inv = (k: keyof EnquiryInput) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  if (result.kind === "success") {
    return (
      <div
        role="status"
        className="border border-gold bg-white p-8 text-center"
      >
        <CheckCircle2
          className="mx-auto text-gold-dark"
          size={40}
          aria-hidden
        />

        <h3 className="mt-4 text-3xl">Enquiry Ready!</h3>

        <p className="mt-2 text-grey">
          WhatsApp has been opened with your enquiry details. Please press
          Send in WhatsApp to submit your enquiry to KN Construction & Builders.
        </p>

        <a
          href={company.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-navy mt-6 inline-flex"
        >
          <MessageCircle size={16} aria-hidden />
          Open WhatsApp
        </a>

        <div>
          <button
            type="button"
            className="btn btn-outline-dark mt-4"
            onClick={() => setResult({ kind: "idle" })}
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 border border-navy/10 bg-white p-6 sm:p-8"
      aria-label="Enquiry form"
    >
      {/* Honeypot field for spam protection */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="fullName"
          label="Full name"
          required
          error={errors.fullName?.message}
        >
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            className="field"
            {...inv("fullName")}
            {...register("fullName")}
          />
        </Field>

        <Field
          id="phone"
          label="Phone number"
          required
          error={errors.phone?.message}
        >
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98XXXXXXXX"
            className="field"
            {...inv("phone")}
            {...register("phone")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="email"
          label="Email"
          error={errors.email?.message}
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            className="field"
            {...inv("email")}
            {...register("email")}
          />
        </Field>

        <Field
          id="service"
          label="Service"
          required
          error={errors.service?.message}
        >
          <select
            id="service"
            className="field"
            {...inv("service")}
            {...register("service")}
          >
            <option value="">Select a service</option>

            {SERVICE_OPTIONS.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {result.kind === "error" && (
        <div
          role="alert"
          className="flex gap-3 border border-red-300 bg-red-50 p-4 text-sm text-red-900"
        >
          <TriangleAlert
            size={18}
            className="mt-0.5 shrink-0"
            aria-hidden
          />

          <div>
            <p>{result.message}</p>

            <div className="mt-3 flex flex-wrap gap-3">
              <a href={company.phoneHref} className="btn btn-navy">
                <Phone size={16} aria-hidden />
                Call {company.phoneDisplay}
              </a>

              <a
                href={company.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark"
              >
                <MessageCircle size={16} aria-hidden />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-navy w-full sm:w-auto"
      >
        <MessageCircle size={16} aria-hidden />
        Send Enquiry on WhatsApp
      </button>

      <p className="text-xs text-grey">
        Your enquiry details will be prepared in WhatsApp. Please press Send
        to submit them. We will contact you regarding your requirement.
      </p>
    </form>
  );
}