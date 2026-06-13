'use client';

import { useState, useEffect, useMemo } from 'react';
import NgoCard from "@/components/shared/ngo-card";
import type { NGO } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { collection, getDocs } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';

export default function NgosPage() {
  const [allNgos, setAllNgos] = useState<NGO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCause, setSelectedCause] = useState('all');
  const db = useFirestore();

  // Fetch NGOs from Firestore on load
  useEffect(() => {
    async function fetchNgos() {
      try {
        const snapshot = await getDocs(collection(db, 'ngo_profiles'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as NGO[];
        setAllNgos(data);
      } catch (err) {
        console.error('Failed to fetch NGOs:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNgos();
  }, [db]);

  const locations = useMemo(() => ['all', ...Array.from(new Set(allNgos.map(n => n.location)))], [allNgos]);
  const causes = useMemo(() => ['all', ...Array.from(new Set(allNgos.flatMap(n => n.cause)))], [allNgos]);

  const filteredNgos = useMemo(() => {
    return allNgos.filter(ngo => {
      const matchesSearch = !searchQuery ||
        ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.cause.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesLocation = selectedLocation === 'all' || ngo.location === selectedLocation;
      const matchesCause = selectedCause === 'all' || ngo.cause.includes(selectedCause);
      return matchesSearch && matchesLocation && matchesCause;
    });
  }, [allNgos, searchQuery, selectedLocation, selectedCause]);

  return (
    <div className="bg-transparent animate-slide-in-from-bottom">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-xl font-bold tracking-tight">Meet the Change-Makers</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Discover and connect with organizations dedicated to creating a positive impact.
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for NGOs by name or cause..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(location => (
                <SelectItem key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCause} onValueChange={setSelectedCause}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by cause" />
            </SelectTrigger>
            <SelectContent>
              {causes.map(cause => (
                <SelectItem key={cause} value={cause}>
                  {cause === 'all' ? 'All Causes' : cause}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : filteredNgos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNgos.map(ngo => (
              <NgoCard key={ngo.id} ngo={ngo} />
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center text-muted-foreground bg-accent/50 p-12 rounded-2xl">
            <h3 className="font-semibold">
              {allNgos.length === 0 ? 'No NGOs added yet' : 'No NGOs found matching your criteria'}
            </h3>
            <p className="text-sm mt-2">
              {allNgos.length === 0 ? 'Check back soon — organizations are being added!' : 'Try adjusting your filters.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
