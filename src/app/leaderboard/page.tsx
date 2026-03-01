'use client';

import { leaderboardData } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LeaderboardPage() {

    const getRankIndicator = (rank: number) => {
        if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
        if (rank === 2) return <Trophy className="h-5 w-5 text-slate-400" />;
        if (rank === 3) return <Trophy className="h-5 w-5 text-amber-700" />;
        return <span className="font-semibold">{rank}</span>;
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-8 animate-slide-in-from-bottom">
            <div className="text-center mb-12">
                <h1 className="text-2xl font-bold tracking-tight flex items-center justify-center gap-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    Volunteer Leaderboard
                </h1>
                <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
                    Celebrating our most dedicated and impactful volunteers. Thank you for your contributions!
                </p>
            </div>

            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-base">Top Volunteers - All Time</CardTitle>
                    <CardDescription>Rankings are based on a combination of hours logged and events completed.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16 text-center">Rank</TableHead>
                                <TableHead>Volunteer</TableHead>
                                <TableHead className="text-right">Hours Logged</TableHead>
                                <TableHead className="text-right">Events Completed</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaderboardData.map((entry) => {
                                const volunteerAvatar = PlaceHolderImages.find(p => p.id === entry.volunteer.avatarUrl);
                                const isTopThree = entry.rank <= 3;
                                return (
                                    <TableRow key={entry.volunteer.id} className={cn(isTopThree && "bg-accent/50")}>
                                        <TableCell className="text-center">
                                            <div className="flex justify-center items-center">
                                                {getRankIndicator(entry.rank)}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                {volunteerAvatar && (
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={volunteerAvatar.imageUrl} alt={entry.volunteer.name} data-ai-hint={volunteerAvatar.imageHint} />
                                                        <AvatarFallback>{entry.volunteer.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <span className={cn("font-medium", isTopThree && "font-bold")}>{entry.volunteer.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">{entry.hoursLogged}</TableCell>
                                        <TableCell className="text-right font-medium">{entry.eventsCompleted}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
