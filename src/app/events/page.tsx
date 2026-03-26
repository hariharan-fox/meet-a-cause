'use client';

import { useState, useEffect, useMemo } from 'react';
import EventCard from "@/components/shared/event-card";
import { allEvents } from "@/lib/placeholder-data";
import type { Event } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function EventsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [causeFilter, setCauseFilter] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(allEvents);

  const locations = useMemo(() => ['all', ...Array.from(new Set(allEvents.map(event => event.location)))], []);
  const causes = useMemo(() => ['all', ...Array.from(new Set(allEvents.map(event => event.cause)))], []);

  useEffect(() => {
    let updatedEvents = allEvents;

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      updatedEvents = updatedEvents.filter(event =>
        event.title.toLowerCase().includes(lowercasedQuery) ||
        event.skills.some(skill => skill.toLowerCase().includes(lowercasedQuery)) ||
        event.description.toLowerCase().includes(lowercasedQuery)
      );
    }

    if (locationFilter !== 'all') {
      updatedEvents = updatedEvents.filter(event => event.location === locationFilter);
    }

    if (causeFilter !== 'all') {
      updatedEvents = updatedEvents.filter(event => event.cause === causeFilter);
    }

    setFilteredEvents(updatedEvents);
  }, [searchQuery, locationFilter, causeFilter]);

  const resetFilters = () => {
    setSearchQuery('');
    setLocationFilter('all');
    setCauseFilter('all');
  };
  
  const hasActiveFilters = searchQuery !== '' || locationFilter !== 'all' || causeFilter !== 'all';

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
          open={isFilterOpen}
          onOpenChange={setIsFilterOpen}
          className="mb-8"
        >
          <div className="flex flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Search events or skills..." 
                    className="pl-10" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
              </div>
              <CollapsibleTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Toggle Filters</span>
                  </Button>
              </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-4 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
            <div className="border-t pt-4 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                  <Select value={causeFilter} onValueChange={setCauseFilter}>
                      <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by cause" />
                      </SelectTrigger>
                      <SelectContent>
                        {causes.map(cause => (
                           <SelectItem key={cause} value={cause}>{cause === 'all' ? 'All Causes' : cause}</SelectItem>
                        ))}
                      </SelectContent>
                  </Select>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map(location => (
                            <SelectItem key={location} value={location}>{location === 'all' ? 'All Locations' : location}</SelectItem>
                        ))}
                      </SelectContent>
                  </Select>
              </div>
              {hasActiveFilters && (
                <Button variant="ghost" onClick={resetFilters} className="h-auto p-0 text-xs text-muted-foreground hover:text-primary">
                  <X className="mr-1 h-3 w-3" />
                  Reset Filters
                </Button>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground bg-accent/50 p-12 rounded-2xl">
            <h3 className="font-semibold">No Events Found</h3>
            <p className="text-sm mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
