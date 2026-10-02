import { z } from "zod";
import { services } from "@/config/company";

export const SERVICE_OPTIONS = [
  ...services.map((s) => s.enquiryValue),
  "Other",
] as const;

export const ENQUIRY_STATUSES = [
  "New",
  "Contacted",
  "In Progress",
  "Completed",
  "Cancelled",
] as const;

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

const INDIAN_PHONE = /^(?:\+91|91|0)?[6-9]\d{9}$/;

export const normalizePhone = (value: string) =>
  value.replace(/[\s-]/g, "");

/** Returns +91XXXXXXXXXX */
export const toE164 = (value: string) =>
  `+91${normalizePhone(value).slice(-10)}`;

export const enquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Name is too long."),

  phone: z
    .string()
    .trim()
    .refine(
      (v) => INDIAN_PHONE.test(normalizePhone(v)),
      "Enter a valid 10-digit Indian mobile number."
    ),

  email: z
    .string()
    .trim()
    .max(254, "Email is too long.")
    .refine(
      (v) => v === "" || z.string().email().safeParse(v).success,
      "Enter a valid email address."
    ),

  service: z
    .string()
    .refine(
      (v) => SERVICE_OPTIONS.includes(v as (typeof SERVICE_OPTIONS)[number]),
      "Please select a service."
    ),

  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(2000, "Message is too long."),

  /** Honeypot: real visitors never fill this in. */
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;