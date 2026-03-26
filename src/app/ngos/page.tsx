
'use client';

import { useState, useEffect } from 'react';
import { allNgos } from "@/lib/placeholder-data";
import type { NGO } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import NgoCard from "@/components/shared/ngo-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NgosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCause, setSelectedCause] = useState('all');
  const [filteredNgos, setFilteredNgos] = useState<NGO[]>(allNgos);

  const locations = ['all', ...Array.from(new Set(allNgos.map(ngo => ngo.location)))];
  const causes = ['all', ...Array.from(new Set(allNgos.flatMap(ngo => ngo.cause)))];

  useEffect(() => {
    let updatedNgos = allNgos;

    if (searchQuery) {
      updatedNgos = updatedNgos.filter(ngo =>
        ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.cause.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedLocation !== 'all') {
      updatedNgos = updatedNgos.filter(ngo => ngo.location === selectedLocation);
    }

    if (selectedCause !== 'all') {
      updatedNgos = updatedNgos.filter(ngo => ngo.cause.includes(selectedCause));
    }

    setFilteredNgos(updatedNgos);
  }, [searchQuery, selectedLocation, selectedCause]);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNgos.length > 0 ? (
            filteredNgos.map((ngo) => (
              <NgoCard key={ngo.id} ngo={ngo} />
            ))
           ) : (
            <div className="col-span-full text-center text-muted-foreground py-10">
              <p>No NGOs found matching your criteria.</p>
            </div>
           )}
        </div>
      </div>
    </div>
  );
}
