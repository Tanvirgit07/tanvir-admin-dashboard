"use client";
import { useSyncExternalStore } from "react";
import { applications } from "./data";
import { saveReview } from "./review-store";
export type Application = (typeof applications)[number];
let records = applications;
const listeners = new Set<() => void>();
export function createApplication(application: Omit<Application, "id">, answers: Record<string, string>) {
 const record = { ...application, id: crypto.randomUUID() };
 saveReview(record.id, { answers });
 records = [record, ...records];
 listeners.forEach(listener => listener());
 return record;
}
export function useApplications() {
 return useSyncExternalStore(listener => { listeners.add(listener); return () => { listeners.delete(listener); }; }, () => records, () => applications);
}

export function updateApplication(id: string, changes: Omit<Application, "id">, answers: Record<string, string>) {
 if (!records.some(record => record.id === id)) throw new Error("Application not found");
 records = records.map(record => record.id === id ? { ...record, ...changes } : record);
 saveReview(id, { answers });
 listeners.forEach(listener => listener());
}
