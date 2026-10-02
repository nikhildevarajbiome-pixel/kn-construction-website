import { Boxes, Building2, FileText, Hammer, HardHat, Zap, type LucideProps } from "lucide-react";
import type { Service } from "@/config/company";

const map = { building: Building2, file: FileText, boxes: Boxes, hardhat: HardHat, zap: Zap, hammer: Hammer };

export function ServiceIcon({ name, ...props }: { name: Service["icon"] } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden="true" {...props} />;
}
