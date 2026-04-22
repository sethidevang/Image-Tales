'use client';

import { Camera, FileUp, X, LoaderCircle, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ImageInputCardProps {
  onImageSelected: (imageDataUri: string) => void;
  isLoading: boolean;
}

export default function ImageInputCard({ onImageSelected, isLoading }: ImageInputCardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [isCameraLoading, setIsCameraLoading] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, []);

  const startCamera = useCallback(async () => {
    stopCamera();
    setIsCameraLoading(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setShowCamera(true);
      } else {
        toast({ variant: 'destructive', title: 'Camera not supported', description: 'Your browser does not support camera access.' });
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      toast({ variant: 'destructive', title: 'Camera access denied', description: 'Please allow camera permissions in your browser settings.' });
    } finally {
      setIsCameraLoading(false);
    }
  }, [stopCamera, toast]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const dataUri = canvas.toDataURL('image/jpeg');
      setSelectedImage(dataUri);
      setShowCamera(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);
  
  const hasImage = !!selectedImage;

  return (
    <Card className="w-full bg-white">
      <CardHeader className="p-10 border-b-8 border-black bg-neo-main">
        <CardTitle className="flex items-center gap-4 text-4xl font-black uppercase">
          <FileUp className="w-14 h-14" />
          <span>Upload Image</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8 p-10">
        <div className="relative w-full aspect-video border-8 border-black bg-neo-main/10 flex items-center justify-center overflow-hidden shadow-inner">
          {showCamera ? (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          ) : selectedImage ? (
            <Image src={selectedImage} alt="Selected preview" layout="fill" objectFit="contain" className="p-4" />
          ) : (
            <div className="text-center p-8">
              <p className="font-black text-3xl uppercase font-mono mb-4 text-black/40">No image selected</p>
              <p className="text-lg font-bold uppercase opacity-30">Capture or upload to start.</p>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        {showCamera && (
          <div className="flex w-full gap-6">
            <Button onClick={handleCapture} className="w-full py-10 text-2xl" variant="neoAccent" disabled={isCameraLoading}>
              <Camera className="mr-3 w-8 h-8" />
              Capture
            </Button>
            <Button onClick={() => setShowCamera(false)} variant="outline" className="w-full py-10 text-2xl">
              <X className="mr-3 w-8 h-8" />
              Cancel
            </Button>
          </div>
        )}

        {!showCamera && (
          <>
            <div className="grid grid-cols-2 w-full gap-6">
              <Button onClick={() => fileInputRef.current?.click()} className="w-full py-8 text-xl" variant="outline" disabled={isLoading}>
                <FileUp className="mr-2 w-6 h-6" />
                Upload
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              
              <Button onClick={startCamera} variant="neoAccent" className="w-full py-8 text-xl" disabled={isLoading || isCameraLoading}>
                {isCameraLoading ? <LoaderCircle className="mr-2 w-6 h-6 animate-spin" /> : <Camera className="mr-2 w-6 h-6" />}
                Camera
              </Button>
            </div>
            {hasImage && (
                <Button 
                  onClick={() => onImageSelected(selectedImage)} 
                  disabled={!hasImage || isLoading} 
                  size="lg" 
                  magnetic={true}
                  className="w-full bg-neo-main text-black border-8 border-black hover:bg-neo-main/90 font-black text-3xl py-12 mt-2 shadow-neo-lg"
                >
                  {isLoading ? <LoaderCircle className="mr-4 animate-spin w-12 h-12" /> : <Wand2 className="mr-4 w-12 h-12" />}
                  {isLoading ? 'WORKING MAGIC...' : 'GENERATE STORY'}
                </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
