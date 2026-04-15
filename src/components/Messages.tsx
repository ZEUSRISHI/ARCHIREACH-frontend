import { Avatar, AvatarFallback } from "../pages/ui/avatar";
import { Button } from "../pages/ui/button";
import { Input } from "../pages/ui/input";
import { Send, MessageCircle } from "lucide-react";
import { useState } from "react";

export function Messages() {
  const [selectedThread, setSelectedThread] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const threads = [
    {
      id: 1,
      name: "Ar. Rajesh Kumar",
      initials: "RK",
      subject: "Re: Your inquiry about 3BHK design",
      preview: "Thanks for reaching out! I'd be happy to...",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      name: "Ar. Priya Sharma",
      initials: "PS",
      subject: "Project timeline discussion",
      preview: "I can start working on your project from...",
      time: "Yesterday",
      unread: true
    },
    {
      id: 3,
      name: "Ar. Vikram Patel",
      initials: "VP",
      subject: "Budget estimation",
      preview: "Based on your requirements, here's my...",
      time: "2 days ago",
      unread: false
    }
  ];

  const conversation = [
    {
      from: "them",
      text: "Thanks for reaching out! I'd be happy to discuss your 3BHK apartment project.",
      time: "2 hours ago"
    },
    {
      from: "them",
      text: "I've reviewed your brief and I think we can create something amazing. When would be a good time for a call?",
      time: "2 hours ago"
    },
    {
      from: "me",
      text: "Thank you! I'm available this week. Would Thursday 3 PM work for you?",
      time: "1 hour ago"
    },
    {
      from: "them",
      text: "Perfect! Thursday at 3 PM works great. I'll send you a meeting link.",
      time: "30 minutes ago"
    }
  ];

  if (!selectedThread) {
    return (
      <div>
        <h2 className="text-[#1F2937] mb-6">
          Messages (3 unread)
        </h2>

        <div className="bg-white border border-[#E5E7EB] rounded-lg divide-y">
          {threads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => setSelectedThread(thread.id)}
              className="w-full p-4 flex items-start gap-3 hover:bg-[#F5F5F5] transition-colors text-left"
            >
              <Avatar className="w-10 h-10">
                <AvatarFallback className="text-[#7B3FF2]" style={{ fontWeight: 700 }}>
                  {thread.initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-[#1F2937]" style={{ fontWeight: 700 }}>
                    {thread.name}
                  </h4>
                  <span className="text-[#6B7280]">{thread.time}</span>
                </div>
                <p className="text-[#1F2937] mb-1">{thread.subject}</p>
                <p className="text-[#6B7280] truncate">{thread.preview}</p>
              </div>

              {thread.unread && (
                <div className="w-3 h-3 rounded-full bg-[#EF4444] flex-shrink-0 mt-2"></div>
              )}
            </button>
          ))}
        </div>

        {threads.length === 0 && (
          <div className="bg-[#F5F5F5] rounded-lg p-12 text-center">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-[#9CA3AF]" />
            <h4 className="text-[#1F2937] mb-2" style={{ fontWeight: 700 }}>
              No messages yet
            </h4>
            <p className="text-[#6B7280] mb-4">
              Start a conversation by contacting an architect
            </p>
            <Button 
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'find-architects' }))}
              style={{ backgroundColor: "#7B3FF2" }}
              className="text-white hover:opacity-90"
            >
              Find Architects
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="outline" 
          onClick={() => setSelectedThread(null)}
        >
          ← Back
        </Button>
        <h2 className="text-[#1F2937]">
          Conversation with {threads.find(t => t.id === selectedThread)?.name}
        </h2>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-lg">
        {/* Messages */}
        <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
          {conversation.map((msg, index) => (
            <div key={index} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${msg.from === 'me' ? 'bg-[#7B3FF2] text-white' : 'bg-[#F5F5F5] text-[#1F2937]'} rounded-lg p-4`}>
                <p className="mb-2">{msg.text}</p>
                <p className={`${msg.from === 'me' ? 'text-purple-100' : 'text-[#6B7280]'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button 
              style={{ backgroundColor: "#7B3FF2" }}
              className="text-white hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
