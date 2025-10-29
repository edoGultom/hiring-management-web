/* eslint-disable @next/next/no-img-element */
import { JobApplicant } from "@/types/jobs.type";
import { BanknotesIcon, MapPinIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface JobCardProps {
  job: JobApplicant;
  isSelected: boolean;
  onSelect: (id: string) => void;
}
const JobCard: React.FC<JobCardProps> = ({ job, isSelected, onSelect }) => {
  return (
    <div
      key={job.id}
      className={clsx(
        "w-full px-4 py-3 border-2 rounded-lg overflow-hidden hover:bg-primary-surface hover:cursor-pointer",
        isSelected
          ? "bg-primary-surface border-primary-hover hover:cursor-default "
          : "border-primary-neutral-40 bg-neutral-10 "
      )}
      onClick={() => onSelect(job.id)}
    >
      <div className="flex w-full gap-4">
        <img
          className="w-[48px] h-[48px] border border-solid border-neutral-40 object-cover rounded-[4px]"
          alt="Company logo"
          src="/images/logo.svg"
        />
        <div className="flex flex-col">
          <h3 className="font-bold text-text-l text-neutral-90 ">
            {job.title}
          </h3>
          <span className="font-regular text-text-m text-neutral-90 ">
            Rakamin
          </span>
        </div>
      </div>
      <div className="my-2">
        <div className="w-full">
          <svg width="100%" height="1">
            <line
              x1="0"
              y1="0"
              x2="852"
              y2="0"
              stroke="#E0E0E0"
              strokeWidth="1"
              style={{ strokeDasharray: "0.5 4" }}
            />
          </svg>
        </div>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex gap-1 items-center">
          <MapPinIcon className="w-4 h-4 stroke-neutral-80 " />
          <span className="font-regular text-text-s text-neutral-80">
            {job.location}
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex gap-1 items-center">
          <BanknotesIcon className="w-4 h-4 stroke-neutral-80 " />
          <span className="font-regular text-text-s text-neutral-80">
            {job.salary_range.display_text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
