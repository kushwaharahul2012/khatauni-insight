import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Shield, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/FileUploader";
import { Disclaimer } from "@/components/Disclaimer";

const Landing = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const handleFilesSelected = async (files: File[]) => {
    setUploading(true);
    
    // TODO: Replace with actual API call to POST /api/upload
    // Mock upload simulation
    setTimeout(() => {
      const mockUploadId = `upload_${Date.now()}`;
      navigate(`/process/${mockUploadId}`);
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
          <Button variant="outline" size="sm">
            Sign In / साइन इन
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Decode Your Land Records
              <span className="block text-primary mt-2">
                अपने भूमि रिकॉर्ड को समझें
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your khatauni and get instant, structured insights with AI-powered OCR
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="p-6 rounded-lg border bg-card">
              <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Fast OCR / तेज़ OCR</h3>
              <p className="text-sm text-muted-foreground">
                Extract data from images in under 15 seconds
              </p>
            </div>
            
            <div className="p-6 rounded-lg border bg-card">
              <div className="inline-flex p-3 rounded-lg bg-secondary/10 mb-4">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Structured Data / संरचित डेटा</h3>
              <p className="text-sm text-muted-foreground">
                Clear owner tables, mutations, and risk analysis
              </p>
            </div>
            
            <div className="p-6 rounded-lg border bg-card">
              <div className="inline-flex p-3 rounded-lg bg-accent/10 mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Secure / सुरक्षित</h3>
              <p className="text-sm text-muted-foreground">
                Your documents are processed securely and privately
              </p>
            </div>
          </div>

          {/* Upload Section */}
          <div className="pt-8 space-y-6">
            <FileUploader onFilesSelected={handleFilesSelected} />
            
            {uploading && (
              <div className="flex items-center justify-center gap-2 text-primary">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span>Uploading...</span>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <div className="pt-8">
            <Disclaimer />
          </div>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4 pt-8">
            <Button variant="link" onClick={() => navigate("/history")}>
              View History / इतिहास देखें
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 KingtheLand. Built for Indian land record transparency.</p>
            <p className="mt-2">
              Phase-1 MVP • Not affiliated with any government entity
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
