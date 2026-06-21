'use client';

import { useState, useEffect, useMemo } from 'react';
import EventCard from "@/components/shared/event-card";
import type { Event } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { collection, getDocs } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';

const CAUSES = ['Education', 'Environment', 'Health', 'Community', 'Animals', 'Technology', 'Arts', 'Sports'];

export default function EventsPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [causeFilter, setCauseFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const db = useFirestore();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const snapshot = await getDocs(collection(db, 'events'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Event[];
        setAllEvents(data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, [db]);

  const locations = useMemo(() => {
    const locs = Array.from(new Set(
      allEvents.map(e => e.location?.split(',')[0]?.trim()).filter(Boolean)
    )).sort();
    return locs;
  }, [allEvents]);

  const causes = useMemo(() => {
    const fromEvents = Array.from(new Set(allEvents.map(e => e.cause).filter(Boolean))).sort();
    return fromEvents.length > 0 ? fromEvents : CAUSES;
  }, [allEvents]);

  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        event.title?.toLowerCase().includes(q) ||
        event.description?.toLowerCase().includes(q) ||
        event.location?.toLowerCase().includes(q) ||
        event.cause?.toLowerCase().includes(q) ||
        event.skills?.some(s => s.toLowerCase().includes(q));
      const matchesLocation = locationFilter === 'all' ||
        event.location?.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesCause = causeFilter === 'all' || event.cause === causeFilter;
      return matchesSearch && matchesLocation && matchesCause;
    });
  }, [allEvents, searchQuery, locationFilter, causeFilter]);

  const hasActiveFilters = searchQuery !== '' || locationFilter !== 'all' || causeFilter !== 'all';
  const activeFilterCount = [searchQuery !== '', locationFilter !== 'all', causeFilter !== 'all'].filter(Boolean).length;

  const resetFilters = () => {
    setSearchQuery('');
    setLocationFilter('all');
    setCauseFilter('all');
  };

  return (
    <div className="bg-transparent animate-slide-in-from-bottom">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold tracking-tight">Things worth showing up for</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Real events happening near you. Find one and show up.
          </p>
        </div>

        {/* Search + Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events, causes, skills..."
                className="pl-10"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              className="gap-2 shrink-0"
              onClick={() => setShowFilters(f => !f)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>

          {showFilters && (
            <div className="flex flex-col sm:flex-row gap-3 p-4 bg-muted/30 rounded-xl border">
              <Select value={causeFilter} onValueChange={setCauseFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-background">
                  <SelectValue placeholder="All Causes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Causes</SelectItem>
                  {causes.map(cause => (
                    <SelectItem key={cause} value={cause}>{cause}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full sm:w-[200px] bg-background">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {hasActiveFilters && (
                <Button variant="ghost" onClick={resetFilters} className="gap-1 text-sm text-muted-foreground">
                  <X className="h-3 w-3" /> Reset all
                </Button>
              )}
            </div>
          )}

          {hasActiveFilters && (
            <div className="flex gap-2 flex-wrap">
              {searchQuery && (
                <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setSearchQuery('')}>
                  "{searchQuery}" <X className="h-3 w-3" />
                </Badge>
              )}
              {causeFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setCauseFilter('all')}>
                  {causeFilter} <X className="h-3 w-3" />
                </Badge>
              )}
              {locationFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setLocationFilter('all')}>
                  {locationFilter} <X className="h-3 w-3" />
                </Badge>
              )}
            </div>
          )}

          {!isLoading && allEvents.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Showing {filteredEvents.length} of {allEvents.length} events
              {hasActiveFilters && ' matching your filters'}
            </p>
          )}
        </div>

        {/* Event Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground bg-accent/50 p-12 rounded-2xl">
            <h3 className="font-semibold">
              {allEvents.length === 0 ? 'No events added yet' : 'No events found'}
            </h3>
            <p className="text-sm mt-2">
              {allEvents.length === 0
                ? 'Check back soon — events are being added!'
                : 'Try adjusting your search or clearing filters.'}
            </p>
            {hasActiveFilters && (
              <Button variant="link" onClick={resetFilters} className="mt-2 text-sm">
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
