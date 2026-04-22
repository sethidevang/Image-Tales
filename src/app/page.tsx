'use client';
import { useState, useEffect } from 'react';
import { generateStoryAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import ImageInputCard from '@/components/image-input-card';
import StoryOutputCard from '@/components/story-output-card';
import { RevealOnScroll } from '@/components/reveal-on-scroll';
import { Ticker } from '@/components/ticker';
import { Button } from '@/components/ui/button';
import { HelpDialog } from '@/components/help-dialog';
import { Info } from 'lucide-react';
import { Footer } from '@/components/footer';

export default function Home() {
  const [story, setStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scrollRotation, setScrollRotation] = useState(0);
  const [apiKey, setApiKey] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrollRotation(window.scrollY * 0.05);
    };
    window.addEventListener('scroll', handleScroll);

    // Load API Key from localStorage
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) setApiKey(savedKey);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value;
    setApiKey(newKey);
    localStorage.setItem('gemini_api_key', newKey);
  };

  const handleGenerateStory = async (dataUri: string) => {
    setIsLoading(true);
    setStory('');

    try {
      const result = await generateStoryAction(dataUri, apiKey);
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
    <main className="flex min-h-screen flex-col items-center bg-neo-bg overflow-x-hidden">
      <div className="w-full bg-neo-accent border-b-8 border-black py-6 md:py-10 px-4 sm:px-8 md:px-12 mb-8 shadow-neo relative">
        <header className="max-w-7xl mx-auto text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl w-full md:w-auto">
            <h1
              className="font-headline text-[3rem] md:text-[5rem] font-black text-black uppercase tracking-tighter leading-[0.8] mb-3 bg-neo-secondary text-white inline-block p-3 md:p-4 border-4 md:border-8 border-black shadow-neo"
              style={{ transform: `rotate(${scrollRotation - 1}deg)` }}
            >
              Image <br /> Tales
            </h1>
            <p className="text-sm md:text-lg font-black font-mono text-black border-4 border-black bg-white p-3 block shadow-neo-sm mt-3">
              GIVE YOUR PICTURES A VOICE, A STORY.
            </p>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-4 w-full md:w-auto justify-between md:justify-start">
            <Button
              variant="outline"
              size="sm"
              className="font-black border-4 h-12 md:h-auto px-4 text-xs md:text-sm bg-white"
              onClick={() => setShowSettings(!showSettings)}
            >
              {showSettings ? 'CLOSE' : 'SETTINGS'}
            </Button>

            {showSettings && (
              <div className="absolute md:relative top-full right-4 md:top-auto md:right-auto z-50 bg-white border-4 border-black p-4 md:p-6 shadow-neo-lg w-[calc(100vw-2rem)] md:w-full md:max-w-sm transform md:-rotate-1 mt-2 md:mt-0">
                <label className="block font-black text-sm uppercase mb-2">Gemini API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  placeholder="Enter your API Key..."
                  className="w-full h-12 border-4 border-black px-4 font-mono text-sm focus:outline-none focus:bg-neo-main/10"
                />
                <div className="mt-4 flex items-start gap-2 bg-black/10 p-3 border-2 border-black/10">
                  <Info className="w-4 h-4 mt-0.5 shrink-0" />
                  <div className="space-y-1 text-left">
                    <p className="text-[10px] font-black uppercase leading-tight">Privacy</p>
                    <p className="text-[10px] font-bold opacity-70 leading-tight italic">All keys are stored locally in your browser.</p>
                    <p className="text-[10px] font-black uppercase leading-tight mt-2">Model</p>
                    <p className="text-[10px] font-bold opacity-70 leading-tight italic">Running on Gemini 2.5 Flash Lite.</p>
                  </div>
                </div>
              </div>
            )}

            {!showSettings && <HelpDialog />}
          </div>
        </header>
      </div>

      <div className="w-full max-w-[120rem] px-4 sm:px-6 md:px-16 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16 items-start w-full">
          <div className="lg:col-span-12 xl:col-span-5">
            <RevealOnScroll delay={200}>
              <div className="transform xl:rotate-1">
                <ImageInputCard
                  onImageSelected={handleGenerateStory}
                  isLoading={isLoading}
                />
              </div>
            </RevealOnScroll>
          </div>
          <div className="lg:col-span-12 xl:col-span-7">
            <RevealOnScroll delay={400}>
              <div className="transform xl:-rotate-1">
                <StoryOutputCard story={story} isLoading={isLoading} />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      <Ticker
        text="IMAGE TALES · CREATIVE AI · STAY BOLD · GENERATE ADVENTURES  ·  GEMINI  ·  "
        className="mt-auto"
      />
      <Footer />
    </main>
  );
}
