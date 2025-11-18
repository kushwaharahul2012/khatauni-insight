import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { Loader2, FileText, CheckCircle2 } from "lucide-react";

interface OCRProgressProps {
  uploadId: string;
  onComplete: (data: any) => void;
}

export const OCRProgress = ({ uploadId, onComplete }: OCRProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"processing" | "complete">("processing");
  const [currentStep, setCurrentStep] = useState("");

  useEffect(() => {
    // Mock OCR progress simulation
    const steps = [
      { label: "Uploading document... / दस्तावेज़ अपलोड हो रहा है...", duration: 1000 },
      { label: "Analyzing image quality... / छवि गुणवत्ता का विश्लेषण...", duration: 1500 },
      { label: "Detecting text regions... / पाठ क्षेत्रों का पता लगाना...", duration: 2000 },
      { label: "Extracting Hindi text... / हिंदी पाठ निकाला जा रहा है...", duration: 2500 },
      { label: "Parsing khatauni data... / खतौनी डेटा पार्स किया जा रहा है...", duration: 2000 },
      { label: "Validating records... / रिकॉर्ड सत्यापित किए जा रहे हैं...", duration: 1500 },
    ];

    let currentProgress = 0;
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setCurrentStep(steps[stepIndex].label);
        currentProgress += 100 / steps.length;
        setProgress(Math.min(currentProgress, 100));
        stepIndex++;
      } else {
        setProgress(100);
        setStatus("complete");
        clearInterval(interval);
        
        // TODO: Replace with actual API call to /api/ocr-status?uploadId=${uploadId}
        setTimeout(() => {
          onComplete({
            uploadId,
            parsed: true,
            // Mock parsed data would be returned here
          });
        }, 500);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [uploadId, onComplete]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        {status === "processing" ? (
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-secondary/10 mb-4">
            <CheckCircle2 className="h-8 w-8 text-secondary" />
          </div>
        )}
        
        <h2 className="text-2xl font-bold mb-2">
          {status === "processing" 
            ? "Processing Document / दस्तावेज़ संसाधित किया जा रहा है" 
            : "Processing Complete / संसाधन पूर्ण"}
        </h2>
        <p className="text-muted-foreground">
          {status === "processing"
            ? "Please wait while we extract information from your khatauni"
            : "Your document has been successfully processed"}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{Math.round(progress)}%</span>
          <span className="text-muted-foreground">
            {status === "processing" ? "Processing..." : "Done"}
          </span>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>{currentStep}</span>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 text-sm">
        <p className="text-muted-foreground">
          <strong>Note:</strong> OCR accuracy depends on image quality. 
          Clear, high-resolution scans work best.
        </p>
      </div>
    </div>
  );
};
