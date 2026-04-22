'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Key, Camera, Wand2, Sparkles, Image as ImageIcon, ArrowRight, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const HELP_STEPS = [
  {
    title: "Step 1: API Key",
    icon: <Key className="w-8 h-8 md:w-12 md:h-12 text-neo-secondary" />,
    image: "/help/step1.png",
    text: "Click the 'SETTINGS' button. Paste your Gemini API key and it will be stored safely in your browser.",
    color: "bg-neo-main",
  },
  {
    title: "Step 2: Upload",
    icon: <Camera className="w-8 h-8 md:w-12 md:h-12 text-neo-accent" />,
    image: "/help/step2.png",
    text: "Use the 'Upload' or 'Camera' buttons to provide an image. The AI needs a visual spark.",
    color: "bg-neo-secondary",
  },
  {
    title: "Step 3: Magic",
    icon: <Wand2 className="w-8 h-8 md:w-12 md:h-12 text-neo-accent" />,
    image: "/help/step3.png",
    text: "Hit 'GENERATE STORY' and wait. Our wizards will weave a unique masterpiece for you.",
    color: "bg-neo-accent",
  }
];

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group relative w-16 h-16 md:w-24 md:h-24 bg-neo-main border-4 md:border-8 border-black shadow-neo transform rotate-12 hover:rotate-0 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center overflow-hidden">
          <span className="font-black text-xl md:text-2xl uppercase italic tracking-tighter">?</span>
          <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-10"></div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 border-8 border-black rounded-none bg-white overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] group/dialog 
        [&>button:last-child]:h-12 [&>button:last-child]:w-12 md:[&>button:last-child]:h-16 md:[&>button:last-child]:w-16 [&>button:last-child]:bg-black [&>button:last-child]:text-white [&>button:last-child]:rounded-none [&>button:last-child]:border-l-4 [&>button:last-child]:border-b-4 [&>button:last-child]:border-black [&>button:last-child]:opacity-100 [&>button:last-child]:hover:bg-neo-accent [&>button:last-child]:hover:text-black [&>button:last-child]:transition-all [&>button:last-child]:right-0 [&>button:last-child]:top-0 [&>button:last-child_svg]:w-6 md:[&>button:last-child_svg]:w-8 [&>button:last-child_svg]:h-6 md:[&>button:last-child_svg]:h-8 [&>button:last-child_svg]:stroke-[4px]">
        <DialogHeader className="bg-neo-secondary p-4 md:p-8 border-b-8 border-black relative">
          <DialogTitle className="text-2xl md:text-5xl font-black uppercase text-white flex items-center justify-center">
            <span>How to use</span>
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 md:p-10 overflow-y-auto max-h-[70vh]">
          <Carousel className="w-full">
            <CarouselContent>
              {HELP_STEPS.map((step, index) => (
                <CarouselItem key={index}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
                    <div className="md:col-span-4 relative group self-center px-4">
                      <div className={`aspect-square max-w-[140px] md:max-w-[180px] mx-auto ${step.color} border-4 border-black shadow-neo-sm flex items-center justify-center transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} overflow-hidden`}>
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                        />
                        <div className="absolute top-1 left-1 bg-white border-2 border-black p-1.5 z-10 shadow-neo-hover transform -rotate-12">
                          {step.icon}
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-8 flex flex-col justify-center space-y-3 md:space-y-4 text-center md:text-left">
                      <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight leading-[0.9]">
                        {step.title}
                      </h3>
                      <div className="text-sm md:text-lg font-bold font-mono bg-white border-2 md:border-4 border-black p-3 md:p-4 shadow-neo-sm">
                        {step.text}
                      </div>
                      <div className="flex gap-2 justify-center md:justify-start">
                        {HELP_STEPS.map((_, dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`w-4 h-2 border-2 border-black transition-all ${dotIndex <= index ? 'bg-black w-8' : 'bg-transparent opacity-20'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center md:justify-end gap-3 mt-6">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 border-4 border-black bg-white hover:bg-neo-main rounded-none shadow-neo-sm" />
              <CarouselNext className="static translate-y-0 h-10 w-10 border-4 border-black bg-white hover:bg-neo-main rounded-none shadow-neo-sm" />
            </div>
          </Carousel>
        </div>

        <DialogPrimitive.Close className="w-full bg-yellow-500 text-purple p-4 md:p-6 font-black text-center text-base md:text-xl uppercase tracking-[0.2em] hover:bg-neo-main hover:text-black transition-colors border-t-8 border-black">
          START CREATING
        </DialogPrimitive.Close>
      </DialogContent>
    </Dialog>
  );
}
