'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Instagram, Linkedin, Mail, MapPin, Youtube, Calendar } from "lucide-react";

const creatorData = {
  name: "Matheus Henrike",
  role: "Estrategista Digital | Yabalab",
  location: "Cuiabá, Brasil",
  avatar_url: "https://0.gravatar.com/avatar/84218fc49121f1942db244e0397d2246bcf67d1768f62e88ea5b69c785ad2d57?s=256&d=initials",
  socials: {
    instagram: "https://instagram.com/eusoumatheushenrik",
    linkedin: "https://linkedin.com/in/matheus-henrike-30a088386",
    youtube: "https://youtube.com/@matheushenrikeyoutube",
    github: "https://github.com/Matheushenrke",
    email: "mailto:comercial@matheushenrike.com"
  }
};

const SocialLink = ({ href, icon: Icon, 'aria-label': ariaLabel }: { href: string, icon: React.ElementType, 'aria-label': string }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={ariaLabel}>
        <Icon className="h-5 w-5" />
    </a>
)

export function CreatorProfile() {
  return (
    <Card className="max-w-md mx-auto bg-card/50 border-border/50 shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={creatorData.avatar_url} alt={creatorData.name} />
            <AvatarFallback>{creatorData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-2xl font-bold font-headline">{creatorData.name}</h3>
            <p className="text-sm text-muted-foreground">{creatorData.role}</p>
            <div className="flex items-center justify-center sm:justify-start text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {creatorData.location}
            </div>
          </div>
        </div>
        <div className="mt-6 mb-6 flex justify-center space-x-6">
            <SocialLink href={creatorData.socials.instagram} icon={Instagram} aria-label="Instagram" />
            <SocialLink href={creatorData.socials.linkedin} icon={Linkedin} aria-label="LinkedIn" />
            <SocialLink href={creatorData.socials.youtube} icon={Youtube} aria-label="YouTube" />
            <SocialLink href={creatorData.socials.github} icon={Github} aria-label="GitHub" />
            <SocialLink href={creatorData.socials.email} icon={Mail} aria-label="Email" />
        </div>
        <Button className="w-full font-bold" size="lg" asChild>
          <a href="https://api.whatsapp.com/send/?phone=5565992843701&text=Ol%C3%A1+Matheus+Henrike&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
            <Calendar className="mr-2 h-4 w-4" />
            Agendar Consultoria
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
