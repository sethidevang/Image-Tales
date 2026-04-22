'use client';

import { Copy, Check, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import { ScrollArea } from './ui/scroll-area';

interface StoryOutputCardProps {
  story: string;
  isLoading: boolean;
}

export default function StoryOutputCard({ story, isLoading }: StoryOutputCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (story) {
      navigator.clipboard.writeText(story);
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const StoryPlaceholder = () => (
    <div className="text-center p-16 flex flex-col items-center justify-center h-full border-8 border-dashed border-black bg-neo-main/10 sm:rotate-1">
      <Wand2 className="h-32 w-32 mb-10 text-black opacity-30" />
      <p className="font-black text-5xl uppercase tracking-tighter mb-4">Awaiting Image</p>
      <p className="font-bold text-xl uppercase opacity-40 max-w-xl mx-auto">Upload a picture and let the AI weave a masterpiece for you.</p>
    </div>
  );
 
  const LoadingSkeleton = () => (
    <div className="space-y-10 p-10">
      <Skeleton className="h-8 w-3/4 bg-neo-black/20" />
      <Skeleton className="h-8 w-full bg-neo-black/20" />
      <Skeleton className="h-8 w-full bg-neo-black/20" />
      <Skeleton className="h-8 w-5/6 bg-neo-black/20" />
      <Skeleton className="h-8 w-full bg-neo-black/20" />
      <Skeleton className="h-8 w-1/2 bg-neo-black/20" />
    </div>
  );

  return (
    <Card className="w-full min-h-[50rem] flex flex-col bg-white">
      <CardHeader className="bg-neo-main p-12 border-b-8 border-black">
        <CardTitle className="flex items-center gap-6 text-4xl font-black uppercase">
          <Wand2 className="w-14 h-14" />
          <span>The Story</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-12">
        <ScrollArea className="h-[35rem] w-full pr-6">
          {isLoading ? (
            <LoadingSkeleton />
          ) : story ? (
            <div className="text-2xl md:text-4xl font-black leading-tight whitespace-pre-wrap selection:bg-neo-secondary selection:text-white">
              {story}
            </div>
          ) : (
            <StoryPlaceholder />
          )}
        </ScrollArea>
      </CardContent>
      {story && !isLoading && (
        <CardFooter className="p-12 pt-0">
          <Button onClick={handleCopy} variant="neoAccent" className="w-full font-black py-12 text-3xl shadow-neo-lg" magnetic={true}>
            {isCopied ? <Check className="mr-4 w-10 h-10" /> : <Copy className="mr-4 w-10 h-10" />}
            {isCopied ? 'STORY COPIED!' : 'COPY TO CLIPBOARD'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
