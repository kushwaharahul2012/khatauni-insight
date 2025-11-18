import { AlertCircle } from "lucide-react";

export const Disclaimer = () => {
  return (
    <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 flex gap-3">
      <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
      <div className="text-sm space-y-1">
        <p className="font-medium text-warning-foreground">
          Disclaimer / अस्वीकरण
        </p>
        <p className="text-foreground/80">
          This is an interpretation of the uploaded document, not a government-certified verification. 
          <span className="block mt-1">
            यह अपलोड किए गए दस्तावेज़ की व्याख्या है, सरकारी सत्यापन नहीं है।
          </span>
        </p>
      </div>
    </div>
  );
};
