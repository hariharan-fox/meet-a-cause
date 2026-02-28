'use client';

import { useState } from 'react';
import EventCard from "@/components/shared/event-card";
import { allEvents } from "@/lib/placeholder-data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function EventsPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-transparent animate-slide-in-from-bottom">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold tracking-tight">Find Your Calling</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Explore diverse opportunities to contribute to causes you care about.
          </p>
        </div>

        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="mb-8"
        >
          <div className="flex flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Search events or skills..." className="pl-10" />
              </div>
              <CollapsibleTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Toggle Filters</span>
                  </Button>
              </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-4 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
            <div className="flex flex-col md:flex-row gap-4 border-t pt-4">
                <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by cause" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="animals">Animals</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by location" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="puducherry">Puducherry</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
