"use client";

import { useState } from "react";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export const trainingCourses = [
  {
    id: "xero",
    name: "Xero Certified Advisor",
    instructor: "Lisa Park",
    level: "Advanced",
    lessons: 22,
  },
  {
    id: "quickbooks",
    name: "QuickBooks Essentials",
    instructor: "Daniel Reed",
    level: "Intermediate",
    lessons: 18,
  },
  {
    id: "bookkeeping",
    name: "Bookkeeping Fundamentals",
    instructor: "Sarah Chen",
    level: "Beginner",
    lessons: 24,
  },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignedCourseId?: string;
  onAssign: (courseId: string) => void;
}

export default function AllCourse({
  open,
  onOpenChange,
  assignedCourseId,
  onAssign,
}: Props) {
  const [selected, setSelected] = useState(
    assignedCourseId || trainingCourses[0].id,
  );
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] gap-0 overflow-y-auto rounded-lg border-0 bg-white px-5 pb-6 pt-14 sm:max-w-[608px] sm:px-6 [&_button]:cursor-pointer [&>button]:right-6 [&>button]:top-6 [&>button_svg]:size-5">
        <DialogTitle className="mb-4 text-sm font-medium text-[#153237]">
          Available Training Courses
        </DialogTitle>
        <DialogDescription className="sr-only">
          Select a training course to assign to this applicant.
        </DialogDescription>
        <fieldset className="space-y-4">
          <legend className="sr-only">Training courses</legend>
          {trainingCourses.map((course, index) => (
            <div
              key={course.id}
              className={`rounded-lg border-t-2 bg-white p-4 shadow-[0_3px_7px_#00000014] ${index === 1 ? "border-[#9800DB]" : "border-[#00B5E8]"}`}
            >
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="training-course"
                  value={course.id}
                  checked={selected === course.id}
                  onChange={() => setSelected(course.id)}
                  className="size-4 shrink-0 cursor-pointer accent-[#287752]"
                />
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-md ${index === 1 ? "bg-[#F5E6FC] text-[#9800DB]" : "bg-[#E5F7FC] text-[#00A9DB]"}`}
                >
                  <GraduationCap className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-[#252525]">
                    {course.name}
                  </span>
                  <span className="mt-1 block text-[10px] text-[#7C889D]">
                    Instructor: {course.instructor} · {course.level} Level
                  </span>
                </span>
              </label>
              <div className="mt-4 flex justify-between text-[9px] text-[#637C85]">
                <span>0 of {course.lessons} lessons</span>
                <span>0%</span>
              </div>
              <div
                role="progressbar"
                aria-label={`${course.name} progress`}
                aria-valuenow={0}
                aria-valuemin={0}
                aria-valuemax={100}
                className="mt-1 h-1.5 rounded-full bg-[#E9EEEE]"
              />
              <Button
                variant="outline"
                onClick={() => {
                  setSelected(course.id);
                  setPreview(preview === course.id ? null : course.id);
                }}
                aria-expanded={preview === course.id}
                className="mt-4 h-8 min-w-[126px] rounded-sm border-[#66898A] bg-white text-[11px] font-normal text-[#003B3B] hover:bg-[#EDF5F2]"
              >
                Start Course
                <ArrowRight className="size-3.5" />
              </Button>
              {preview === course.id && (
                <div className="mt-3 rounded-md bg-[#F3F7F6] p-3 text-xs leading-5 text-[#526B6B]">
                  <p className="font-medium text-[#003B3B]">Course preview</p>
                  <p>
                    Introduction to {course.name}. This sample course contains{" "}
                    {course.lessons} lessons. Assign it below to add it to the
                    applicant’s training.
                  </p>
                </div>
              )}
            </div>
          ))}
        </fieldset>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="h-9 min-w-[86px] rounded-md bg-[#EAEAEA] text-xs font-normal text-[#505050] hover:bg-[#DEDEDE]"
          >
            Cancel
          </Button>
          <Button
            disabled={!selected}
            onClick={() => {
              onAssign(selected);
              onOpenChange(false);
            }}
            className="h-9 min-w-[86px] rounded-md bg-[#003B3B] text-xs font-normal text-white hover:bg-[#00504D]"
          >
            Assign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
