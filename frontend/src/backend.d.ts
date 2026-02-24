import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface PriorityLead {
    interestedLot: string;
    source: string;
    fullName: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
    budgetRange: BudgetRange;
    buildTimeline: BuildTimeline;
}
export enum BudgetRange {
    over500K = "over500K",
    _400to500K = "_400to500K",
    _300to400K = "_300to400K",
    under300K = "under300K",
    unknown_ = "unknown"
}
export enum BuildTimeline {
    within1Year = "within1Year",
    unsure = "unsure",
    within6Months = "within6Months",
    immediate = "immediate"
}
export interface backendInterface {
    getLeads(): Promise<Array<PriorityLead>>;
    submitChatLead(fullName: string, email: string, phone: string, buildTimeline: BuildTimeline, conversationSummary: string): Promise<void>;
    submitLead(fullName: string, email: string, phone: string, budgetRange: BudgetRange, buildTimeline: BuildTimeline, interestedLot: string, message: string): Promise<void>;
}
