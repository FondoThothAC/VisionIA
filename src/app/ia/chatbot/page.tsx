
"use client";

import { useState } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PageHeader from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  sender: 'user' | 'ai';
  text: string;
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Hola, soy tu asistente de IA. ¿En qué puedo ayudarte a planificar hoy?" }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = { sender: 'ai', text: `Respuesta simulada a: "${input}"` };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Chatbot de IA"
        description="Interactúa con un asistente de IA para obtener respuestas rápidas, generar ideas o pedir ayuda."
      />
      <Card className="flex flex-col h-[70vh]">
        <CardHeader>
          <CardTitle>Asistente de Planificación</CardTitle>
          <CardDescription>Haz una pregunta o introduce un comando.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}
                >
                  {message.sender === 'ai' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-xs rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                   {message.sender === 'user' && (
                    <Avatar className="h-8 w-8">
                       <AvatarImage src="https://github.com/shadcn.png" alt="@robertocelis" />
                      <AvatarFallback>RC</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="pt-4">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Enviar</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
