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
  specialty: 'orthopaedic' | 'gynecology' | 'dental' | 'general' | 'pediatric' | 'other';
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
  id: "gandhi-hospital",
  name: "Gandhi Hospital",
  legalName: "Gandhi Hospital",
  tagline: "Nursing Home & Healthcare Center",
  address: {
    line1: "Near Main Market",
    line2: "Station Road",
    city: "Wardha",
    state: "Maharashtra",
    pincode: "442001",
    fullFormatted: "Gandhi Hospital, Station Road, Wardha - 442001",
  },
  contacts: {
    phones: ["9822000000"],
    mobile: "9822000000",
    whatsapp: "919822000000",
    email: "gandhihospital@gmail.com",
  },
  schedule: {
    opdTimings: "Mon. to Sat. - 10 am to 2 pm & 6 pm to 9 pm | Sunday Closed",
    sundayStatus: "Sunday OPD Closed",
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
      id: "dr-rajesh-gandhi",
      name: "Dr. Rajesh Gandhi",
      degrees: "M.B.B.S., Dip.Ortho., DNB Ortho",
      registrationNumber: "1692/03/2002",
      fellowshipOrDiplomate: "Diplomate of National Board (Orthopaedics)",
      designation: "Consulting Orthopaedic and Joint Replacement Surgeon",
      specialty: "orthopaedic",
      email: "drrajeshgandhi@gmail.com",
      signatureUrl: "",
      consultationFee: {
        firstVisit: 400,
        followupVisit: 200,
        followupValidityDays: 10,
      },
    },
    {
      id: "dr-swati-gandhi",
      name: "Dr. Swati Gandhi",
      degrees: "M.B.B.S., M.D. (Gynecology & Obstetrics)",
      registrationNumber: "2004/05/1842",
      designation: "Consulting Gynecologist & Obstetrician",
      subSpecialty: "Maternity, Infertility & Women Care Specialist",
      specialty: "gynecology",
      email: "drswatigandhi@gmail.com",
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

/** Helper to calculate consultation charge based on previous visits within validity days */
export function calculateDoctorConsultationFee(doctorName?: string, isFollowupWithinValidity: boolean = false): number {
  const doc = getDoctorProfile(doctorName);
  if (!doc) return 400;
  return isFollowupWithinValidity ? doc.consultationFee.followupVisit : doc.consultationFee.firstVisit;
}

