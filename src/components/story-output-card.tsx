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
    <div className="text-center text-muted-foreground p-8 flex flex-col items-center justify-center h-full">
      <Wand2 className="h-12 w-12 mb-4" />
      <p className="font-semibold">Your generated story will appear here.</p>
      <p className="text-sm">Provide an image to begin the magic.</p>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="space-y-4 p-6">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );

  return (
    <Card className="w-full min-h-[30rem] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 />
          <span>Your Story</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <ScrollArea className="h-96 w-full pr-4">
          {isLoading ? (
            <LoadingSkeleton />
          ) : story ? (
            <p className="text-base leading-relaxed whitespace-pre-wrap">{story}</p>
          ) : (
            <StoryPlaceholder />
          )}
        </ScrollArea>
      </CardContent>
      {story && !isLoading && (
        <CardFooter>
          <Button onClick={handleCopy} variant="outline" className="w-full">
            {isCopied ? <Check className="mr-2 text-green-500" /> : <Copy className="mr-2" />}
            {isCopied ? 'Copied!' : 'Copy Story'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
