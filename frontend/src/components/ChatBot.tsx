import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Loader2 } from 'lucide-react';
import { useSubmitChatLead, BuildTimeline } from '@/hooks/useQueries';

interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
}

type Stage =
  | 'greeting'
  | 'ask_intent'
  | 'ask_custom'
  | 'ask_timeline'
  | 'ask_budget'
  | 'ask_beds'
  | 'ask_preapproved'
  | 'route_high'
  | 'route_mid'
  | 'route_low'
  | 'capture_name'
  | 'capture_email'
  | 'capture_phone'
  | 'confirm'
  | 'done';

interface LeadData {
  fullName: string;
  email: string;
  phone: string;
  buildTimeline: BuildTimeline;
  intentLevel: 'high' | 'mid' | 'low';
  budget: string;
  beds: string;
  preapproved: string;
  customType: string;
}

const BOT_MESSAGES: Record<string, string> = {
  greeting:
    "Hi there! 👋 I'm the Medina Valley Homes AI Sales Assistant. I'd love to help you find your perfect custom home in Medina Valley, TX — just west of San Antonio. Are you looking to build soon, or just exploring your options?",
  ask_custom:
    "Great! Are you thinking fully custom — where you design every detail — or semi-custom with pre-designed floor plans you can personalize?",
  ask_timeline:
    "Do you have a timeline in mind? For example: ready to break ground in the next 6 months, within a year, or still in the early planning stages?",
  ask_budget:
    "What budget range are you working with? (e.g., under $300K, $300–$400K, $400–$500K, or $500K+)",
  ask_beds:
    "How many bedrooms and bathrooms are you looking for?",
  ask_preapproved:
    "Have you been pre-approved for financing, or is that still in progress?",
  route_high:
    "You sound like a great fit for Phase 1 — our lots are limited and going fast! I'd love to connect you with Dennis directly to secure your lot and schedule a design consultation. You can call **(210) 393-9794** or email **Dennis@tx.properties**. Before I let you go, I'd like to capture your contact info so we can follow up. What's your full name?",
  route_mid:
    "Sounds like you're in a great position to start planning! I can share our floor plans and get you on the Priority List for early pricing access. Let me grab your contact info first — what's your full name?",
  route_low:
    "No rush at all! Medina Valley is one of the fastest-growing areas west of San Antonio — great schools, wide-open spaces, and a tight-knit community. I'd love to keep you updated as we release new lots and pricing. What's your full name?",
  capture_email:
    "Thanks! What's the best email address to reach you?",
  capture_phone:
    "Perfect. And your phone number?",
  confirm_high:
    "You're all set! 🎉 Dennis will be in touch shortly. For fastest service, call **(210) 393-9794** directly. We look forward to building your dream home in Medina Valley!",
  confirm_mid:
    "You're on the list! 🎉 We'll send you floor plans and Priority List details to your email. Keep an eye out — Phase 1 lots are limited!",
  confirm_low:
    "You're all set! 🎉 We'll keep you in the loop on new lots, pricing, and community updates. Welcome to the Medina Valley family!",
  done: "Is there anything else I can help you with? Feel free to call us anytime at **(210) 393-9794**.",
};

function detectIntent(text: string): 'high' | 'mid' | 'low' {
  const lower = text.toLowerCase();
  if (
    lower.includes('6 month') ||
    lower.includes('soon') ||
    lower.includes('immediate') ||
    lower.includes('asap') ||
    lower.includes('ready') ||
    lower.includes('now') ||
    lower.includes('this year')
  )
    return 'high';
  if (
    lower.includes('year') ||
    lower.includes('planning') ||
    lower.includes('considering') ||
    lower.includes('thinking')
  )
    return 'mid';
  return 'low';
}

function detectTimeline(text: string): BuildTimeline {
  const lower = text.toLowerCase();
  if (lower.includes('immediate') || lower.includes('asap') || lower.includes('now') || lower.includes('ready'))
    return BuildTimeline.immediate;
  if (lower.includes('6') || lower.includes('six') || lower.includes('soon'))
    return BuildTimeline.within6Months;
  if (lower.includes('year') || lower.includes('12'))
    return BuildTimeline.within1Year;
  return BuildTimeline.unsure;
}

function handleObjection(text: string): string | null {
  const lower = text.toLowerCase();
  if (lower.includes('pric') || lower.includes('cost') || lower.includes('how much')) {
    return "Great question! Pricing depends on the lot size and level of customization you choose. We don't publish fixed prices because every home is unique — that's the beauty of building custom. The best way to get accurate numbers is a quick consultation with Dennis. Want me to help set that up?";
  }
  if (
    lower.includes('other builder') ||
    lower.includes('comparing') ||
    lower.includes('competition') ||
    lower.includes('another builder')
  ) {
    return "We totally understand — it's a big decision! What sets Medina Valley Homes apart is our deep focus on Medina County, flexible design options, and direct communication with the builder (Dennis) from day one. No middlemen, no surprises. Would you like to learn more about what we offer?";
  }
  if (lower.includes('not ready') || lower.includes("not sure") || lower.includes("just looking")) {
    return "No problem at all! Joining our Priority List is completely free and gives you early access to lot pricing before we open to the public. It's a great way to stay informed with zero commitment. Want me to add you to the list?";
  }
  return null;
}

function formatBotText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

let msgIdCounter = 0;
function nextId() {
  return ++msgIdCounter;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<Stage>('greeting');
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitChatLead = useSubmitChatLead();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setTimeout(() => {
        addBotMessage(BOT_MESSAGES.greeting);
        setStage('ask_intent');
      }, 400);
    }
  }, [isOpen, hasGreeted]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: nextId(), role: 'bot', text }]);
    }, 700);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text }]);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || stage === 'done') return;
    setInput('');
    addUserMessage(trimmed);
    processInput(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const processInput = (text: string) => {
    // Check for objections at any stage before capture
    if (!['capture_name', 'capture_email', 'capture_phone', 'confirm', 'done'].includes(stage)) {
      const objectionResponse = handleObjection(text);
      if (objectionResponse) {
        addBotMessage(objectionResponse);
        return;
      }
    }

    switch (stage) {
      case 'ask_intent': {
        addBotMessage(BOT_MESSAGES.ask_custom);
        setStage('ask_custom');
        break;
      }

      case 'ask_custom': {
        setLeadData((prev) => ({ ...prev, customType: text }));
        addBotMessage(BOT_MESSAGES.ask_timeline);
        setStage('ask_timeline');
        break;
      }

      case 'ask_timeline': {
        const timeline = detectTimeline(text);
        const intent = detectIntent(text);
        setLeadData((prev) => ({ ...prev, buildTimeline: timeline, intentLevel: intent }));
        addBotMessage(BOT_MESSAGES.ask_budget);
        setStage('ask_budget');
        break;
      }

      case 'ask_budget': {
        setLeadData((prev) => ({ ...prev, budget: text }));
        addBotMessage(BOT_MESSAGES.ask_beds);
        setStage('ask_beds');
        break;
      }

      case 'ask_beds': {
        setLeadData((prev) => ({ ...prev, beds: text }));
        addBotMessage(BOT_MESSAGES.ask_preapproved);
        setStage('ask_preapproved');
        break;
      }

      case 'ask_preapproved': {
        setLeadData((prev) => ({ ...prev, preapproved: text }));
        const intent = leadData.intentLevel ?? detectIntent(text);
        if (intent === 'high') {
          addBotMessage(BOT_MESSAGES.route_high);
          setStage('capture_name');
        } else if (intent === 'mid') {
          addBotMessage(BOT_MESSAGES.route_mid);
          setStage('capture_name');
        } else {
          addBotMessage(BOT_MESSAGES.route_low);
          setStage('capture_name');
        }
        break;
      }

      case 'capture_name': {
        setLeadData((prev) => ({ ...prev, fullName: text }));
        addBotMessage(BOT_MESSAGES.capture_email);
        setStage('capture_email');
        break;
      }

      case 'capture_email': {
        setLeadData((prev) => ({ ...prev, email: text }));
        addBotMessage(BOT_MESSAGES.capture_phone);
        setStage('capture_phone');
        break;
      }

      case 'capture_phone': {
        const updatedLead = { ...leadData, phone: text };
        setLeadData(updatedLead);
        setStage('confirm');

        // Build conversation summary
        const summary = [
          `Custom type: ${updatedLead.customType ?? 'N/A'}`,
          `Budget: ${updatedLead.budget ?? 'N/A'}`,
          `Beds/Baths: ${updatedLead.beds ?? 'N/A'}`,
          `Pre-approved: ${updatedLead.preapproved ?? 'N/A'}`,
          `Intent level: ${updatedLead.intentLevel ?? 'low'}`,
        ].join('; ');

        const timeline = updatedLead.buildTimeline ?? BuildTimeline.unsure;
        const intentLevel = updatedLead.intentLevel ?? 'low';

        submitChatLead.mutate(
          {
            fullName: updatedLead.fullName ?? '',
            email: updatedLead.email ?? '',
            phone: text,
            buildTimeline: timeline,
            conversationSummary: summary,
          },
          {
            onSuccess: () => {
              const confirmKey =
                intentLevel === 'high'
                  ? 'confirm_high'
                  : intentLevel === 'mid'
                  ? 'confirm_mid'
                  : 'confirm_low';
              addBotMessage(BOT_MESSAGES[confirmKey]);
              setTimeout(() => {
                addBotMessage(BOT_MESSAGES.done);
                setStage('done');
              }, 1800);
            },
            onError: () => {
              addBotMessage(
                "I'm sorry, there was an issue saving your information. Please call us directly at **(210) 393-9794** or email **Dennis@tx.properties**."
              );
              setStage('done');
            },
          }
        );
        break;
      }

      default:
        break;
    }
  };

  return (
    <>
      {/* Floating bubble button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        style={{ backgroundColor: '#2B7FD4' }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
        {!isOpen && messages.length === 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-1.5rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ height: '520px', backgroundColor: '#0D1B2A' }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b border-white/10"
            style={{ backgroundColor: '#0D1B2A' }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#2B7FD4' }}
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm font-body leading-tight">
                Medina Valley Homes
              </p>
              <p className="text-white/60 text-xs font-body">AI Sales Assistant</p>
            </div>
            <a
              href="tel:+12103939794"
              className="flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors font-body"
              title="Call us"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">(210) 393-9794</span>
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm font-body leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-br-sm text-white'
                      : 'rounded-bl-sm text-white/90'
                  }`}
                  style={{
                    backgroundColor:
                      msg.role === 'user' ? '#2B7FD4' : 'rgba(255,255,255,0.08)',
                  }}
                >
                  {formatBotText(msg.text)}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl rounded-bl-sm px-4 py-3"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  <div className="flex gap-1 items-center">
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ backgroundColor: '#2B7FD4', animationDelay: '0ms' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ backgroundColor: '#2B7FD4', animationDelay: '150ms' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ backgroundColor: '#2B7FD4', animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="px-3 py-3 border-t border-white/10 flex gap-2 items-center"
            style={{ backgroundColor: '#0D1B2A' }}
          >
            {stage === 'done' ? (
              <div className="flex-1 text-center">
                <a
                  href="tel:+12103939794"
                  className="inline-flex items-center gap-2 text-sm font-body font-semibold text-white px-4 py-2 rounded-full transition-colors"
                  style={{ backgroundColor: '#2B7FD4' }}
                >
                  <Phone className="w-4 h-4" />
                  Call (210) 393-9794
                </a>
              </div>
            ) : (
              <>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message…"
                  disabled={isTyping || submitChatLead.isPending}
                  className="flex-1 bg-white/10 text-white placeholder-white/40 text-sm font-body rounded-full px-4 py-2 outline-none focus:ring-1 focus:ring-blue-400 disabled:opacity-50 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping || submitChatLead.isPending}
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#2B7FD4' }}
                  aria-label="Send message"
                >
                  {submitChatLead.isPending ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
