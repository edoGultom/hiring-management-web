import { Job } from "@/types/jobs.type";
import Link from "next/link";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

interface AdminJobsProps {
  jobs: Job[];
}
const AdminJobList: React.FC<AdminJobsProps> = ({ jobs }) => {
  return (
    <div className="flex flex-col gap-4">
      {jobs.map((item) => (
        <Card
          key={item.id}
          className="w-full p-6 bg-neutral-10 shadow-modal rounded-2xl flex gap-3"
        >
          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex gap-4">
              <Badge variant={item.status}>{item.list_card.badge}</Badge>
              <div className="border bodrder-neutral-40 px-4 py-1 rounded-[4px]">
                <span className="font-regular text-text-m text-neutral-90 ">
                  {item.list_card.started_on_text}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-text-xl text-neutral-100">
                {item.title}
              </h3>
              <div className="flex gap-1">
                <span className="font-regular text-text-l text-neutral-80">
                  {item.salary_range.display_text}
                </span>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="flex-none self-end">
            <Link href={`/admin/manage-candidates/${item.slug}`}>
              <Button
                size="xs"
                variant="default"
                className="font-bold text-text-s"
              >
                {item.list_card.cta}
              </Button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AdminJobList;
