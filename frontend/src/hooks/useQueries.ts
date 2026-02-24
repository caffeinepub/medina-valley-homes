import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { BudgetRange, BuildTimeline, type PriorityLead } from '../backend';

export function useGetLeads() {
  const { actor, isFetching } = useActor();

  return useQuery<PriorityLead[]>({
    queryKey: ['leads'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeads();
    },
    enabled: !!actor && !isFetching,
  });
}

export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  budgetRange: BudgetRange;
  buildTimeline: BuildTimeline;
  interestedLot: string;
  message: string;
}

export function useSubmitLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LeadFormData) => {
      if (!actor) throw new Error('Backend not available');
      await actor.submitLead(
        data.fullName,
        data.email,
        data.phone,
        data.budgetRange,
        data.buildTimeline,
        data.interestedLot,
        data.message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

export interface ChatLeadData {
  fullName: string;
  email: string;
  phone: string;
  buildTimeline: BuildTimeline;
  conversationSummary: string;
}

export function useSubmitChatLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ChatLeadData) => {
      if (!actor) throw new Error('Backend not available');
      await actor.submitChatLead(
        data.fullName,
        data.email,
        data.phone,
        data.buildTimeline,
        data.conversationSummary
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

export { BudgetRange, BuildTimeline };
