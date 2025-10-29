/* eslint-disable @next/next/no-img-element */
"use client";
import JobCard from "@/components/applicant/JobCard";
import { Button } from "@/components/ui/Button";
import { JobApplicant } from "@/types/jobs.type";
import { useEffect, useState } from "react";

const ApplicantPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobApplicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const selectedItem = jobs.find((item) => item.id === selected);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/mocks/job-list-applicant.json");
        const data = await res.json();
        setJobs(data.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (jobs.length > 0 && !selected) {
      setSelected(jobs[0].id);
    }
  }, [jobs, selected]);

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  if (loading) {
    return <p className="text-center text-neutral-60">Loading jobs...</p>;
  }
  if (jobs.length < 1) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <img
          className="w-[306px] h-[300px]"
          alt="Empty List Jobs"
          src="/images/empty_state.svg"
        />

        <div className="flex flex-col items-center justify-center gap-1">
          <h2 className="font-bold text-heading-s text-neutral-90">
            No job openings available
          </h2>

          <p className="text-center font-regular text-text-l text-neutral-90">
            Please wait for the next batch of openings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 h-screen  overflow-hidden">
      <div className="flex-none w-[406px] border-r overflow-y-auto pr-4">
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSelected={selected === job.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* Bagian kanan (detail data) */}
      <div className="flex-1 p-6  rounded-lg border border-red-100 overflow-hidden">
        {selectedItem ? (
          <div className="flex justify-between">
            <div className="flex flex-col gap-6 ">
              <div className="flex gap-6 border-b border-neutral-40">
                <img
                  className="w-[48px] h-[48px] border border-solid border-neutral-40 object-cover rounded-[4px]"
                  alt="Company logo"
                  src="/images/logo.svg"
                />
                <div className="flex flex-col gap-2 items-start">
                  <div className="px-2 py-[2px] bg-success-main rounded-[4px] font-bold text-text-s text-neutral-10 ">
                    {selectedItem.jobType}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-text-xl text-neutral-90 ">
                      {selectedItem.title}
                    </h3>
                    <span className="font-regular text-text-m text-neutral-70">
                      Rakamin
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="[&>ul]:list-disc [&>ul]:pl-6 [&>li]:mb-1 font-regular text-text-m text-gray-90 prose"
                dangerouslySetInnerHTML={{ __html: selectedItem.description }}
              />
            </div>
            <Button variant="secondary" size="sm" className="py-1 px-4">
              Apply
            </Button>
          </div>
        ) : (
          <div className="text-gray-400 italic flex items-center justify-center h-full">
            Pilih item dari daftar di kiri
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantPage;
