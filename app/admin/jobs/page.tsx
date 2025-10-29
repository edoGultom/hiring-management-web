/* eslint-disable @next/next/no-img-element */
"use client";
import ModalCreateJob from "@/components/admin/ModalCreateJob";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/form/Input";

import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import AdminJobList from "@/components/admin/AdmiJobList";
import { Job } from "@/types/jobs.type";

const JobListPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/mocks/job-list.json");
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
  if (loading) {
    return <p className="text-center text-neutral-60">Loading jobs...</p>;
  }

  return (
    <>
      <div className="flex items-start gap-6 h-full">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search by job details"
                className="w-full h-auto px-4 py-2.5 bg-neutral-10 rounded-[8px] border-2 border-neutral-30 placeholder:text-neutral-70 text-text-m font-regular "
              />
              <MagnifyingGlassIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary-main " />
            </div>
          </div>

          <ScrollArea className="flex-1 h-[calc(100vh-160px)]">
            {jobs.length > 0 ? (
              <AdminJobList jobs={jobs} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 min-h-[600px]">
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
                    Create a job opening now and start the candidate process.
                  </p>
                </div>

                <Button
                  size="default"
                  variant="secondary"
                  onClick={() => setIsOpen(true)}
                >
                  Create a new job
                </Button>
              </div>
            )}

            {/*  JOB EXIST*/}

            <ScrollBar
              orientation="vertical"
              className="w-2.5 bg-neutral-10 rounded-2xl"
            >
              <div className="w-full h-[123px] bg-primary-main rounded-lg" />
            </ScrollBar>
          </ScrollArea>
        </div>

        <aside className="flex flex-col items-center gap-6">
          <div
            className="relative rounded-[16px] overflow-hidden border-0 bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(/images/statistik.jpg)` }}
          >
            {/* Overlay hitam */}
            <div className="absolute inset-0 bg-[#000000B8] z-10" />
            {/* Konten di atas overlay */}
            <div className="relative z-20 flex flex-col items-center justify-center gap-6 p-6">
              <div className="flex flex-col items-start gap-1 w-full">
                <h3 className="font-bold text-text-xl text-neutral-40">
                  Recruit the best candidates
                </h3>
                <p className="font-bold text-text-m text-neutral-10">
                  Create jobs, invite, and hire with ease
                </p>
              </div>

              <Button
                size="default"
                variant="default"
                onClick={() => setIsOpen(true)}
              >
                Create a new job
              </Button>
            </div>
          </div>
        </aside>
      </div>
      {/* Modal Create a new job */}
      {isOpen && <ModalCreateJob onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default JobListPage;
