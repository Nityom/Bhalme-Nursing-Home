/**
 * Svaasth-HMS White-Label Hospital Configuration
 * 
 * To brand this application for any hospital or clinic:
 * Simply update this configuration file. All letterheads, billing receipts,
 * PDF prescriptions, logos, contacts, fee schedules, and active module
 * toggles will adapt automatically.
 */

export interface DoctorProfile {
  id: string;
  name: string;
  degrees: string;
  registrationNumber: string;
  fellowshipOrDiplomate?: string;
  designation: string;
  subSpecialty?: string;
  specialty: 'dermatology' | 'orthopaedic' | 'gynecology' | 'dental' | 'general' | 'pediatric' | 'other';
  email: string;
  signatureUrl: string;
  consultationFee: {
    firstVisit: number;
    followupVisit: number;
    followupValidityDays: number;
  };
}

export interface HospitalConfig {
  id: string;
  name: string;
  legalName: string;
  tagline: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    fullFormatted: string;
  };
  contacts: {
    phones: string[];
    mobile: string;
    landline?: string;
    whatsapp: string;
    email: string;
    website?: string;
  };
  schedule: {
    opdTimings: string;
    clinicDetails?: string;
    sundayStatus?: string;
  };
  branding: {
    primaryColor: string;       // Primary brand accent (e.g. #7B1828)
    primaryHover: string;
    accentTeal: string;         // Svaasth EMR brand secondary
    logoUrl: string;            // Main hospital logo (sidebar, letterhead)
    emailLogoUrl: string;       // Lightweight compressed logo for email HTML
    faviconUrl: string;
    svasthLogoUrl: string;      // Svaasth-HMS master engine badge
    poweredBySvasth: boolean;   // Toggle "Powered by Svaasth-HMS" footer/badge
  };
  doctors: DoctorProfile[];
  modules: {
    appointments: boolean;
    patientManagement: boolean;
    opd: boolean;
    ipd: boolean;
    billing: boolean;
    prescription: boolean;
    clinicalTemplates: boolean;
    medicinesCatalog: boolean;
    inventory: boolean;
    salesReport: boolean;
    installments: boolean;
    specialties: {
      orthopaedics: boolean;
      obstetricsGynaecology: boolean;
      dental: boolean;
    };
  };
}

export const hospitalConfig: HospitalConfig = {
  id: "bhalme-clinic",
  name: "Bhalme Clinic",
  legalName: "Bhalme Clinic",
  tagline: "Dermatology, Venereology & Obstetrics-Gynaecology Clinic",
  address: {
    line1: "Near Main Market",
    line2: "Station Road",
    city: "Wardha",
    state: "Maharashtra",
    pincode: "442001",
    fullFormatted: "Bhalme Clinic, Station Road, Wardha - 442001",
  },
  contacts: {
    phones: ["7385381369", "9422144878"],
    mobile: "7385381369",
    whatsapp: "919422144878",
    email: "bhalmeclinic@gmail.com",
  },
  schedule: {
    opdTimings: "Dr. Nitin Bhalme: 10:00 AM to 7:30 PM | Dr. Minal Bhalme: 11:00 AM to 2:00 PM | Sunday Closed",
    sundayStatus: "Sunday Closed",
  },
  branding: {
    primaryColor: "#0284c7", // Medical Blue
    primaryHover: "#0369a1",
    accentTeal: "#0d9488",  // Svaasth Teal
    logoUrl: "/bhalme_logo.svg",
    emailLogoUrl: "/bhalme_logo.svg",
    faviconUrl: "/Svaasth_favicon.png",
    svasthLogoUrl: "/Svaasth_logo.png",
    poweredBySvasth: true,
  },
  doctors: [
    {
      id: "dr-nitin-bhalme",
      name: "Dr. Nitin Bhalme",
      degrees: "M.B.B.S., DVD",
      registrationNumber: "077462",
      designation: "Consulting Dermatologist & Venereologist",
      subSpecialty: "Skin, Hair, Nail & VD Specialist",
      specialty: "dermatology",
      email: "drnitinbhalme@gmail.com",
      signatureUrl: "",
      consultationFee: {
        firstVisit: 400,
        followupVisit: 300,
        followupValidityDays: 30,
      },
    },
    {
      id: "dr-minal-bhalme",
      name: "Dr. Minal Bhalme",
      degrees: "M.B.B.S., DGO",
      registrationNumber: "081237",
      designation: "Consulting Obstetrician & Gynaecologist",
      subSpecialty: "Maternity, Infertility & Women Care Specialist",
      specialty: "gynecology",
      email: "drminalbhalme@gmail.com",
      signatureUrl: "",
      consultationFee: {
        firstVisit: 200,
        followupVisit: 100,
        followupValidityDays: 10,
      },
    },
  ],
  modules: {
    appointments: true,
    patientManagement: true,
    opd: true,
    ipd: true,
    billing: true,
    prescription: true,
    clinicalTemplates: true,
    medicinesCatalog: true,
    inventory: true,
    salesReport: true,
    installments: true,
    specialties: {
      orthopaedics: true,
      obstetricsGynaecology: true,
      dental: false,
    },
  },
};

/** Helper to find doctor profile by name matching */
export function getDoctorProfile(doctorName?: string): DoctorProfile | undefined {
  if (!doctorName) return hospitalConfig.doctors[0];
  const clean = doctorName.toLowerCase().trim();
  return (
    hospitalConfig.doctors.find((doc) => clean.includes(doc.name.toLowerCase()) || doc.name.toLowerCase().includes(clean)) ||
    hospitalConfig.doctors[0]
  );
}

export interface LiveDoctorFeeRecord {
  name: string;
  first_visit_fee?: number;
  followup_fee?: number;
  followup_validity_days?: number;
}

/** Resolve live fee settings from Convex doctors list, falling back to hospitalConfig defaults */
export function resolveDoctorFeeConfig(
  doctorName?: string,
  liveDoctors?: LiveDoctorFeeRecord[]
): { firstVisit: number; followupVisit: number; followupValidityDays: number } {
  const doc = getDoctorProfile(doctorName);
  const fallback = doc?.consultationFee ?? {
    firstVisit: 400,
    followupVisit: 300,
    followupValidityDays: 30,
  };

  if (!liveDoctors || liveDoctors.length === 0) return fallback;

  const targetName = (doctorName || doc?.name || '').toLowerCase().trim();
  const matched = liveDoctors.find((d) => {
    const candidate = (d.name || '').toLowerCase().trim();
    return candidate === targetName || candidate.includes(targetName) || targetName.includes(candidate);
  });

  if (!matched) return fallback;

  return {
    firstVisit: matched.first_visit_fee ?? fallback.firstVisit,
    followupVisit: matched.followup_fee ?? fallback.followupVisit,
    followupValidityDays: matched.followup_validity_days ?? fallback.followupValidityDays,
  };
}

/** Helper to calculate consultation charge based on previous visits within validity days */
export function calculateDoctorConsultationFee(
  doctorName?: string,
  isFollowupWithinValidity: boolean = false,
  liveDoctors?: LiveDoctorFeeRecord[]
): number {
  const fees = resolveDoctorFeeConfig(doctorName, liveDoctors);
  return isFollowupWithinValidity ? fees.followupVisit : fees.firstVisit;
}

