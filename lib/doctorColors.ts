// lib/doctorColors.ts
// Doctor Branding & Color Schemes for Bhalme Nursing Home

export function isShillpaDoctor(doctorName?: string): boolean {
  return false;
}

export function isVipeenDoctor(doctorName?: string): boolean {
  return false;
}

export function isBhalmeDoctor(doctorName?: string): boolean {
  if (!doctorName) return true;
  return /bhalme|nitin/i.test(doctorName);
}

export function getDoctorBadgeStyle(doctorName?: string) {
  return {
    isGyn: false,
    badge: "bg-sky-50 text-sky-800 border-sky-200",
    text: "text-sky-800",
    bg: "bg-sky-50",
    border: "border-sky-200",
    dot: "bg-sky-600",
    buttonSelected: "bg-sky-600 text-white shadow-xs hover:bg-sky-700",
    filterPillSelected: "bg-sky-50 text-sky-800 border-sky-300 font-bold shadow-2xs",
  };
}

