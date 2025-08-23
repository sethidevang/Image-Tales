'use client';
import { useState } from 'react';
import { generateStoryAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import ImageInputCard from '@/components/image-input-card';
import StoryOutputCard from '@/components/story-output-card';

export default function Home() {
  const [story, setStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleGenerateStory = async (dataUri: string) => {
    setIsLoading(true);
    setStory('');

    try {
      const result = await generateStoryAction(dataUri);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Story Generation Failed',
          description: result.error,
        });
      } else if (result.story) {
        setStory(result.story);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An Unexpected Error Occurred',
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">
            Image Tales
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Give your pictures a voice. Upload an image or use your camera, and
            let our AI weave a unique story for you.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ImageInputCard
            onImageSelected={handleGenerateStory}
            isLoading={isLoading}
          />
          <StoryOutputCard story={story} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
