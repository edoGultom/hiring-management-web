"use client";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/Modal";
import { JobFormData, jobSchema } from "@/schemas/newjob.schema";
import { Field } from "@/types/jobConfig.type";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { FormField } from "../form/FormField";
import { FormSelect } from "../form/FormSelect";
import { TextArea } from "../form/TextArea";
import { ToggleField } from "../form/ToggleField";
import { Separator } from "../Separator";
import { Button } from "../ui/Button";

interface ModalCreateJobProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const ModalCreateJob: React.FC<ModalCreateJobProps> = ({
  isOpen = true,
  onClose,
}) => {
  const [profileFields, setProfileFields] = useState<Field[]>([]);
  const { handleSubmit, formState, control, reset } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    mode: "onChange",
    defaultValues: {
      fullname: true,
      photoprofile: true,
      gender: true,
      domicile: true,
      email: true,
      phonenumber: true,
      linkedinlink: true,
      dateofbirth: true,
    },
  });

  useEffect(() => {
    const fetchJobConfig = async () => {
      try {
        const res = await fetch("/mocks/job-config.json");
        const data = await res.json();
        setProfileFields(data.application_form.sections[0].fields || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobConfig();
  }, []);

  const onSubmit = async (data: JobFormData) => {
    console.log({ data });
    reset();
    onClose?.();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose?.();
      }}
      className="w-[900px] h-[1281px]"
    >
      <ModalHeader className="bg-neutral-10 rounded-[10px_10px_0px_0px]">
        <ModalTitle className="items-center justify-center">
          Job Opening
        </ModalTitle>
        <XMarkIcon
          className="w-6 h-6 cursor-pointer"
          onClick={() => {
            reset();
            onClose?.();
          }}
        />
      </ModalHeader>

      <ModalContent className="pt-4 pb-0 px-6 overflow-auto">
        <form
          id="jobForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-4 w-full"
        >
          <FormField
            name="jobName"
            control={control}
            id="jobName"
            label="Job Name"
            required
            placeholder="Ex. Front End Engineer"
          />
          <div className="flex flex-col w-full gap-2">
            <FormSelect
              name="jobType"
              control={control}
              formState={formState}
              label="Job Type"
              placeholder="Select job type"
              required
              options={[
                { value: "fulltime", label: "Full Time" },
                { value: "parttime", label: "Part Time" },
                { value: "intern", label: "Internship" },
                { value: "freelance", label: "Freelance" },
              ]}
            />
          </div>
          <TextArea
            name="jobDescription"
            rows={4}
            control={control}
            id="jobDescription"
            label="Job Description"
            required
            placeholder="Ex."
          />
          <FormField
            name="numberOfCandidates"
            control={control}
            id="numberOfCandidates"
            label="Number of Candidate Needed"
            required
            type="number"
            error={formState.errors.numberOfCandidates?.message}
            placeholder="Ex. 2"
          />
          <div className="flex flex-col w-full">
            <div className="w-full">
              <svg width="100%" height="1">
                <line
                  x1="0"
                  y1="0"
                  x2="852"
                  y2="0"
                  stroke="#E0E0E0"
                  strokeWidth="1"
                  strokeDasharray="8 8"
                />
              </svg>
            </div>
            <div className="flex flex-col w-full  gap-4 ">
              <span className="font-regular text-neutral-90 text-text-s mt-6">
                Job Salary
              </span>
              <div className="w-full flex justify-center gap-4">
                <FormField
                  name="minimumEstimatedSalary"
                  control={control}
                  id="minimumEstimatedSalary"
                  label="Minimum Estimated Salary"
                  required
                  type="number"
                  error={formState.errors.minimumEstimatedSalary?.message}
                  placeholder="7.000.000"
                  prefix="Rp"
                />
                <div className="h-[1px] w-4 bg-neutral-40 self-end mb-[20px]" />
                <FormField
                  name="maximumEstimatedSalary"
                  id="maximumEstimatedSalary"
                  control={control}
                  label="Maximum Estimated Salary"
                  required
                  type="number"
                  error={formState.errors.maximumEstimatedSalary?.message}
                  placeholder="8.000.000"
                  prefix="Rp"
                />
              </div>
              <div className="border border-neutral-30 p-4 rounded-[8px] flex flex-col gap-4 mb-[60px]">
                <h2 className="text-text-m font-bold">
                  Minimum Profile Information Required
                </h2>
                <div className="flex flex-col w-full items-start gap-2">
                  <div className="flex flex-col items-start gap-2 w-full bg-neutral-10">
                    <div className="flex flex-col items-start gap-1 p-2 w-full">
                      {profileFields.map((field, index) => (
                        <div
                          key={field.key}
                          className="flex flex-col gap-2 w-full bg-neutral-10"
                        >
                          <div className="flex items-center justify-between px-2 py-3 w-full">
                            <div className="text-text-m font-regular">
                              {field.label}
                            </div>
                            <ToggleField
                              name={
                                field.key as keyof z.infer<typeof jobSchema>
                              }
                              control={control}
                              defaultValue={"mandatory"}
                              isRequired={field.validation.required}
                            />
                          </div>

                          {index < profileFields.length - 1 && (
                            <Separator className="w-full h-px !bg-neutral-40" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ModalContent>
      <ModalFooter className="bg-neutral-10 rounded-[0px_0px_10px_10px]">
        <Button
          type="submit"
          form="jobForm"
          variant="outline"
          disabled={!formState.isValid}
          className={`
            inline-flex items-center justify-center gap-1 px-4 py-1 rounded-lg border border-solid border-neutral-40 h-auto
            ${
              !formState.isValid
                ? "bg-neutral-30 text-neutral-60 cursor-not-allowed font-bold text-text-m"
                : "bg-primary-main text-white font-bold text-text-m"
            }
          `}
        >
          Publish Job
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalCreateJob;
