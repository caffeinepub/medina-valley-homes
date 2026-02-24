import MixinStorage "blob-storage/Mixin";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";



actor {
  include MixinStorage();

  type BudgetRange = {
    #under300K;
    #_300to400K;
    #_400to500K;
    #over500K;
    #unknown;
  };

  type BuildTimeline = {
    #immediate;
    #within6Months;
    #within1Year;
    #unsure;
  };

  type PriorityLead = {
    fullName : Text;
    email : Text;
    phone : Text;
    budgetRange : BudgetRange;
    buildTimeline : BuildTimeline;
    interestedLot : Text;
    message : Text;
    timestamp : Time.Time;
    source : Text;
  };

  var priorityLeads : [PriorityLead] = [];

  public shared ({ caller }) func submitLead(
    fullName : Text,
    email : Text,
    phone : Text,
    budgetRange : BudgetRange,
    buildTimeline : BuildTimeline,
    interestedLot : Text,
    message : Text,
  ) : async () {
    let newLead : PriorityLead = {
      fullName;
      email;
      phone;
      budgetRange;
      buildTimeline;
      interestedLot;
      message;
      timestamp = Time.now();
      source = "PriorityListForm";
    };
    priorityLeads := priorityLeads.concat([newLead]);
  };

  public shared ({ caller }) func submitChatLead(
    fullName : Text,
    email : Text,
    phone : Text,
    buildTimeline : BuildTimeline,
    conversationSummary : Text,
  ) : async () {
    let chatLead : PriorityLead = {
      fullName;
      email;
      phone;
      budgetRange = #unknown;
      buildTimeline;
      interestedLot = "Chatbot";
      message = conversationSummary # " (Captured via chat)";
      timestamp = Time.now();
      source = "Chatbot";
    };
    priorityLeads := priorityLeads.concat([chatLead]);
  };

  public query ({ caller }) func getLeads() : async [PriorityLead] {
    priorityLeads;
  };
};
