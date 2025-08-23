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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileUp />
          <span>Upload Your Image</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="relative w-full aspect-video rounded-lg bg-muted flex items-center justify-center overflow-hidden">
          {showCamera ? (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          ) : selectedImage ? (
            <Image src={selectedImage} alt="Selected preview" layout="fill" objectFit="contain" />
          ) : (
            <div className="text-center text-muted-foreground p-4">
              <p>Upload a file or use your camera to begin.</p>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        {showCamera && (
          <div className="flex w-full gap-2">
            <Button onClick={handleCapture} className="w-full" disabled={isCameraLoading}>
              <Camera className="mr-2" />
              Capture
            </Button>
            <Button onClick={() => setShowCamera(false)} variant="outline" className="w-full">
              <X className="mr-2" />
              Cancel
            </Button>
          </div>
        )}

        {!showCamera && (
          <>
            <div className="flex w-full gap-2">
              <Button onClick={() => fileInputRef.current?.click()} className="w-full" disabled={isLoading}>
                <FileUp className="mr-2" />
                Choose File
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              
              <Button onClick={startCamera} variant="secondary" className="w-full" disabled={isLoading || isCameraLoading}>
                {isCameraLoading ? <LoaderCircle className="mr-2 animate-spin" /> : <Camera className="mr-2" />}
                Use Camera
              </Button>
            </div>
            {hasImage && (
                <Button onClick={() => onImageSelected(selectedImage)} disabled={!hasImage || isLoading} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  {isLoading ? <LoaderCircle className="mr-2 animate-spin" /> : <Wand2 className="mr-2" />}
                  {isLoading ? 'Generating Story...' : 'Generate Story'}
                </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
