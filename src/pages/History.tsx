import { useNavigate } from "react-router-dom";
import { FileText, Clock, CheckCircle2, XCircle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock history data - TODO: Replace with actual API call to /api/history
const mockHistory = [
  {
    id: "upload_1",
    filename: "khatauni_rampur_123.jpg",
    uploadedAt: "2024-01-15 14:30",
    status: "complete",
    isPaid: true,
    village: "Rampur",
  },
  {
    id: "upload_2",
    filename: "land_record_scan.pdf",
    uploadedAt: "2024-01-14 10:15",
    status: "complete",
    isPaid: false,
    village: "Shamli",
  },
  {
    id: "upload_3",
    filename: "khatauni_meerut.jpg",
    uploadedAt: "2024-01-10 16:45",
    status: "error",
    isPaid: false,
    village: "Meerut",
  },
];

const History = () => {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="h-5 w-5 text-secondary" />;
      case "processing":
        return <Clock className="h-5 w-5 text-status-processing animate-pulse" />;
      case "error":
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "complete":
        return "Complete / पूर्ण";
      case "processing":
        return "Processing / संसाधित";
      case "error":
        return "Error / त्रुटि";
      default:
        return "Pending / लंबित";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">
                Upload History / अपलोड इतिहास
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Your Documents / आपके दस्तावेज़
            </h2>
            <Button onClick={() => navigate("/")}>
              Upload New / नया अपलोड करें
            </Button>
          </div>

          <div className="space-y-4">
            {mockHistory.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  if (item.status === "complete") {
                    navigate(`/parse/${item.id}`);
                  }
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{item.filename}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{item.village}</span>
                        <span>•</span>
                        <span>{item.uploadedAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <span className="text-sm">{getStatusLabel(item.status)}</span>
                      </div>

                      {item.isPaid ? (
                        <Badge variant="secondary">Paid / भुगतान किया</Badge>
                      ) : (
                        <Badge variant="outline">Free / मुफ़्त</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {mockHistory.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    No documents yet / अभी तक कोई दस्तावेज़ नहीं
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Upload your first khatauni to get started
                  </p>
                  <Button onClick={() => navigate("/")}>
                    Upload Document / दस्तावेज़ अपलोड करें
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default History;
