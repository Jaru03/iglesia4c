"use client";

import { ActivityCard as SharedActivityCard } from "@/components/shared/ActivityCard";
import { ConfirmAttendanceButton } from "@/components/usuario/ConfirmAttendanceButton";

type ActivityCardProps = {
  activity: {
    id: number;
    title: string;
    hourStart: string;
    place: string;
    img: string | null;
    departmentName: string;
    attended?: boolean;
    preRegistered?: boolean;
    autoMarked?: boolean;
    allowPreRegistration?: boolean;
  };
  personId: number;
  isCulto?: boolean;
};

export function ActivityCard({ activity, personId, isCulto = false }: ActivityCardProps) {
  return (
    <SharedActivityCard activity={activity} isCulto={isCulto}>
      <ConfirmAttendanceButton
        activityId={activity.id}
        activityTitle={activity.title}
        activityDate={activity.hourStart}
        personId={personId}
        alreadyAttended={activity.attended}
        preRegistered={activity.preRegistered}
        autoMarked={activity.autoMarked}
        allowPreRegistration={activity.allowPreRegistration}
      />
    </SharedActivityCard>
  );
}
