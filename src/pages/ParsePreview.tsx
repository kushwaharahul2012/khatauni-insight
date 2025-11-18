import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileText, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Disclaimer } from "@/components/Disclaimer";
import { OwnerTable } from "@/components/OwnerTable";
import { MutationTimeline } from "@/components/MutationTimeline";
import { RiskBadge } from "@/components/RiskBadge";
import { ExportModal } from "@/components/ExportModal";

// Mock data - TODO: Replace with actual API data from /api/parse
const mockParsedData = {
  header: {
    village: "रामपुर (Rampur)",
    khatauniNo: "123/456",
    fasliYear: "1432-1433 (2025-26)",
    tehsil: "Sadar",
    district: "Meerut",
  },
  owners: [
    {
      name: "राम कुमार शर्मा (Ram Kumar Sharma)",
      fatherName: "श्री लाल शर्मा (Shri Lal Sharma)",
      share: "1/4",
      percentage: 25.0,
    },
    {
      name: "श्याम कुमार शर्मा (Shyam Kumar Sharma)",
      fatherName: "श्री लाल शर्मा (Shri Lal Sharma)",
      share: "1/4",
      percentage: 25.0,
    },
    {
      name: "गीता देवी (Geeta Devi)",
      fatherName: "राम कुमार शर्मा (Ram Kumar Sharma)",
      share: "1/2",
      percentage: 50.0,
    },
  ],
  mutations: [
    {
      year: "2023",
      description: "Inheritance transfer from Shri Lal Sharma to sons / विरासत हस्तांतरण",
    },
    {
      year: "2020",
      description: "Marriage gift to daughter Geeta Devi / विवाह उपहार",
    },
    {
      year: "2015",
      description: "Original registration in name of Shri Lal Sharma / मूल पंजीकरण",
    },
  ],
  risks: ["FREQUENT_MUTATIONS", "MISSING_OLD_RECORDS"],
  images: [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
  ],
};

const ParsePreview = () => {
  const { uploadId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const data = mockParsedData;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">
                Parse Results / पार्स परिणाम
              </h1>
            </div>
          </div>
          <Button onClick={() => setExportModalOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            Export / निर्यात
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Disclaimer */}
          <Disclaimer />

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: Image Carousel */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Uploaded Document / अपलोड किया गया दस्तावेज़
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative aspect-[3/4] bg-doc-bg rounded-lg overflow-hidden border-2 border-doc-border">
                  <img
                    src={data.images[currentImageIndex]}
                    alt={`Page ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {data.images.length > 1 && (
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentImageIndex(Math.max(0, currentImageIndex - 1))
                      }
                      disabled={currentImageIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {currentImageIndex + 1} / {data.images.length}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentImageIndex(
                          Math.min(data.images.length - 1, currentImageIndex + 1)
                        )
                      }
                      disabled={currentImageIndex === data.images.length - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Right: Parsed Data */}
            <div className="space-y-6">
              {/* Header Info */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Document Information / दस्तावेज़ जानकारी
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Village / गाँव
                      </p>
                      <p className="font-medium">{data.header.village}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Khatauni No. / खतौनी नं.
                      </p>
                      <p className="font-medium">{data.header.khatauniNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Fasli Year / फसली वर्ष
                      </p>
                      <p className="font-medium">{data.header.fasliYear}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        District / जिला
                      </p>
                      <p className="font-medium">{data.header.district}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Badges */}
              {data.risks.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Analysis / जोखिम विश्लेषण</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {data.risks.map((risk, index) => (
                        <RiskBadge
                          key={index}
                          type={risk as any}
                          variant="warning"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Owner Table */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Ownership Details / स्वामित्व विवरण
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <OwnerTable owners={data.owners} />
                </CardContent>
              </Card>

              {/* Mutation Timeline */}
              <Card>
                <CardContent className="pt-6">
                  <MutationTimeline mutations={data.mutations} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Export Modal */}
      <ExportModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        uploadId={uploadId || ""}
      />
    </div>
  );
};

export default ParsePreview;
