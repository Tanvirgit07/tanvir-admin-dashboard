"use client";
import { useSyncExternalStore } from "react";
type Review = { answers: Record<string,string>; status?: string; trainingCourseId?: string };
let reviews: Record<string,Review> = {};
const empty: Record<string,Review> = {};
const listeners = new Set<() => void>();
export function saveReview(id:string, update:Partial<Review>) {
 reviews = {...reviews, [id]: {...(reviews[id] || {answers:{}}), ...update}};
 listeners.forEach(listener=>listener());
}
export function useReviews() {
 return useSyncExternalStore((listener)=>{listeners.add(listener);return ()=>{listeners.delete(listener);};},()=>reviews,()=>empty);
}
