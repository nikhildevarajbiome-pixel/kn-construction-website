import type { EnquiryStatus } from "@/lib/validation";

export interface Enquiry {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  service: string;
  message: string;
  status: EnquiryStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}
