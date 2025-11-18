import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { OCRProgress } from "@/components/OCRProgress";
import { Button } from "@/components/ui/button";

const ProcessUpload = () => {
  const { uploadId } = useParams();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  const handleComplete = (data: any) => {
    setCompleted(true);
    // Navigate to parse preview after a short delay
    setTimeout(() => {
      navigate(`/parse/${uploadId}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">
              KingtheLand <span className="text-primary">खतौनी</span>
            </h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            Back to Home / होम पर वापस
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <OCRProgress uploadId={uploadId || ""} onComplete={handleComplete} />
      </main>
    </div>
  );
};

export default ProcessUpload;
