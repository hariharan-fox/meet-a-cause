'use client';

import { useState, useEffect, useMemo } from 'react';
import NgoCard from "@/components/shared/ngo-card";
import type { NGO } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X, SlidersHorizontal, Building2, ArrowRight } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';

export default function NgosPage() {
  const [allNgos, setAllNgos] = useState<NGO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCause, setSelectedCause] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const db = useFirestore();

  useEffect(() => {
    async function fetchNgos() {
      try {
        const snapshot = await getDocs(collection(db, 'ngo_profiles'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as NGO[];
        // Only show verified NGOs publicly
        setAllNgos(data.filter(n => n.verificationStatus !== 'rejected'));
      } catch (err) {
        console.error('Failed to fetch NGOs:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNgos();
  }, [db]);

  const locations = useMemo(() => {
    return Array.from(new Set(
      allNgos.map(n => n.location?.split(',')[0]?.trim()).filter(Boolean)
    )).sort();
  }, [allNgos]);

  const causes = useMemo(() => {
    return Array.from(new Set(
      allNgos.flatMap(n => n.cause || []).filter(Boolean)
    )).sort();
  }, [allNgos]);

  const filteredNgos = useMemo(() => {
    return allNgos.filter(ngo => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        ngo.name?.toLowerCase().includes(q) ||
        ngo.mission?.toLowerCase().includes(q) ||
        ngo.location?.toLowerCase().includes(q) ||
        ngo.cause?.some(c => c.toLowerCase().includes(q));
      const matchesLocation = selectedLocation === 'all' ||
        ngo.location?.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesCause = selectedCause === 'all' || ngo.cause?.includes(selectedCause);
      return matchesSearch && matchesLocation && matchesCause;
    });
  }, [allNgos, searchQuery, selectedLocation, selectedCause]);

  const hasActiveFilters = searchQuery !== '' || selectedLocation !== 'all' || selectedCause !== 'all';
  const activeFilterCount = [searchQuery !== '', selectedLocation !== 'all', selectedCause !== 'all'].filter(Boolean).length;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('all');
    setSelectedCause('all');
  };

  return (
    <div className="bg-transparent animate-slide-in-from-bottom">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center mb-10">
          <h1 className="text-xl font-bold tracking-tight">The organisations behind the work</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Every event on Meet A Cause is run by a real organisation doing real work.
          </p>
        </div>

        {/* Only show filters if there are NGOs */}
        {(allNgos.length > 0 || isLoading) && (
          <div className="mb-8 space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search organisations by name, cause or location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button variant="outline" className="gap-2 shrink-0" onClick={() => setShowFilters(f => !f)}>
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
                <Select value={selectedCause} onValueChange={setSelectedCause}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-background">
                    <SelectValue placeholder="All Causes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Causes</SelectItem>
                    {causes.map(cause => <SelectItem key={cause} value={cause}>{cause}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full sm:w-[200px] bg-background">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map(location => <SelectItem key={location} value={location}>{location}</SelectItem>)}
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
                {selectedCause !== 'all' && (
                  <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setSelectedCause('all')}>
                    {selectedCause} <X className="h-3 w-3" />
                  </Badge>
                )}
                {selectedLocation !== 'all' && (
                  <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setSelectedLocation('all')}>
                    {selectedLocation} <X className="h-3 w-3" />
                  </Badge>
                )}
              </div>
            )}

            {!isLoading && allNgos.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Showing {filteredNgos.length} of {allNgos.length} organisations
                {hasActiveFilters && ' matching your filters'}
              </p>
            )}
          </div>
        )}

        {/* NGO Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : allNgos.length === 0 ? (
          /* No NGOs at all — coming soon state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Building2 className="h-10 w-10 text-primary/60" />
            </div>
            <h2 className="text-xl font-bold mb-3">We are working on it</h2>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              We are onboarding our first partner organisations right now. Each one is verified and curated — we only list causes worth showing up for.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap justify-center">
              <Button asChild>
                <Link href="/for-organisations">
                  Register Your Organisation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/events">Browse Events</Link>
              </Button>
            </div>
          </div>
        ) : filteredNgos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNgos.map(ngo => (
              <NgoCard key={ngo.id} ngo={ngo} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground bg-accent/50 p-12 rounded-2xl">
            <h3 className="font-semibold">No organisations found</h3>
            <p className="text-sm mt-2">Try adjusting your search or clearing filters.</p>
            <Button variant="link" onClick={resetFilters} className="mt-2 text-sm">
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
