/* eslint-disable @next/next/no-img-element */
"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { formatSlugToTitle } from "@/lib/format";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Candidate {
  id: string;
  job_id: string;
  attributes: {
    key: string;
    label: string;
    value: string;
    order: number;
  }[];
}

export default function ManageCandidateBySlugPage() {
  const { slug } = useParams();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const title = formatSlugToTitle(slug as string);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/mocks/candidate-list.json");
        const data = await res.json();
        setCandidates(data.data);
      } catch (err) {
        console.error("Error fetching candidates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) setSelected(candidates.map((c) => c.id));
    else setSelected([]);
  };

  const toggleSelectOne = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  if (loading)
    return <p className="text-center mt-10">Loading candidates...</p>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-neutral-90 mb-4">{title}</h1>

      <div className="overflow-x-auto border border-neutral-40 rounded-lg bg-white p-6">
        {candidates.length > 0 ? (
          <table className="w-full border-collapse shadow-modal min-w-[900px]">
            <thead className="bg-neutral-10 border-b border-neutral-30">
              <tr className="text-left">
                <th className="p-4 sticky left-0  z-30 bg-neutral-10">
                  <Checkbox
                    checked={
                      candidates.length > 0 &&
                      selected.length === candidates.length
                    }
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="p-4 font-bold text-text-s text-neutral-100 sticky left-[52px] bg-neutral-10 z-30">
                  NAMA LENGKAP
                </th>
                <th className="p-4 font-bold text-text-s text-neutral-100">
                  EMAIL ADDRESS
                </th>
                <th className="p-4 font-bold text-text-s text-neutral-100">
                  PHONE NUMBERS
                </th>
                <th className="p-4 font-bold text-text-s text-neutral-100">
                  DATE OF BIRTH
                </th>
                <th className="p-4 font-bold text-text-s text-neutral-100">
                  DOMICILE
                </th>
                <th className="p-4 font-bold text-text-s text-neutral-100">
                  GENDER
                </th>
                <th className="p-4 font-bold text-text-s text-neutral-100">
                  LINK LINKEDIN
                </th>
              </tr>
            </thead>

            <tbody>
              {candidates.map((cand) => {
                const get = (key: string) =>
                  cand.attributes.find((a) => a.key === key)?.value;

                return (
                  <tr
                    key={cand.id}
                    className="border-b border-neutral-30 hover:bg-neutral-20 transition"
                  >
                    <td className="px-4 py-3 sticky left-0 bg-white z-20">
                      <Checkbox
                        checked={selected.includes(cand.id)}
                        onChange={() => toggleSelectOne(cand.id)}
                      />
                    </td>
                    <td className="px-4 py-3 sticky left-[52px] bg-white z-20 font-medium">
                      {get("full_name")}
                    </td>
                    <td className="px-4 py-3">{get("email")}</td>
                    <td className="px-4 py-3">{get("phone_number")}</td>
                    <td className="px-4 py-3">{get("date_of_birth")}</td>
                    <td className="px-4 py-3">{get("domicile")}</td>
                    <td className="px-4 py-3">{get("gender")}</td>
                    <td className="px-4 py-3 text-primary-main underline">
                      <a
                        href={get("linkedin_link")}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {get("linkedin_link")}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 min-h-[600px]">
            <img
              className="w-[306px] h-[300px]"
              alt="Empty List Jobs"
              src="/images/empty_state_candidates.svg"
            />
            <div className="flex flex-col items-center justify-center gap-1">
              <h2 className="font-bold text-heading-s text-[##000000]">
                No candidates found
              </h2>

              <p className="text-center font-regular text-text-l text-neutral-70">
                Share your job vacancies so that more candidates will apply.
              </p>
            </div>
          </div>
        )}
      </div>

      {selected.length > 0 && (
        <div className="mt-4 flex items-center gap-3 text-sm text-neutral-80">
          <span>{selected.length} candidates selected</span>
          <button
            className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
            onClick={() => setSelected([])}
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
}
