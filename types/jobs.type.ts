export interface Job {
  id: string;
  slug: string;
  title: string;
  department?: string;
  status: "active" | "draft" | "inactive";
  salary_range: SalaryRange;
  list_card: {
    badge: string;
    started_on_text: string;
    cta: string;
  };
}

export interface JobApplicant {
  id: string;
  slug: string;
  title: string;
  status: string;
  jobType: string;
  company: string;
  location: string;
  description: string;
  salary_range: SalaryRange;
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  display_text: string;
}
