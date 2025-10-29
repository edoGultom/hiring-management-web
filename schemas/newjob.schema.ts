import { z } from "zod";

// Schema  newjob
export const jobSchema = z
  .object({
    jobName: z.string().min(1, "Job name is required"),
    jobType: z.string().min(1, "Job type is required"),
    jobDescription: z.string().min(1, "Description is required"),
    numberOfCandidates: z.number().min(0, {
      message: "Number of candidates must be greater than or equal to 0",
    }),
    minimumEstimatedSalary: z
      .number()
      .min(0, { message: "Min. Salary must be greater than or equal to 0" }),
    maximumEstimatedSalary: z
      .number()
      .min(0, { message: "Max. Salary must be greater than or equal to 0" }),
    fullname: z.boolean(),
    photoprofile: z.boolean(),
    gender: z.boolean(),
    domicile: z.boolean(),
    email: z.boolean(),
    phonenumber: z.boolean(),
    linkedinlink: z.boolean(),
    dateofbirth: z.boolean(),
  })
  .refine(
    (data) => data.maximumEstimatedSalary >= data.minimumEstimatedSalary,
    {
      path: ["maximumEstimatedSalary"],
      message: "Maximum salary must be greater than or equal to minimum salary",
    }
  );
// Type newjob
export type JobFormData = z.infer<typeof jobSchema>;
