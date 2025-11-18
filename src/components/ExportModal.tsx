import { useState } from "react";
import { Download, Check, IndianRupee } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  uploadId: string;
}

interface PriceTier {
  name: string;
  nameHi: string;
  price: number;
  features: string[];
  featuresHi: string[];
}

const priceTiers: PriceTier[] = [
  {
    name: "Basic Report",
    nameHi: "मूल रिपोर्ट",
    price: 99,
    features: [
      "Parsed data in JSON format",
      "Owner table with shares",
      "Basic mutation history",
    ],
    featuresHi: [
      "JSON प्रारूप में डेटा",
      "हिस्सों के साथ मालिक तालिका",
      "मूल परिवर्तन इतिहास",
    ],
  },
  {
    name: "Premium Report",
    nameHi: "प्रीमियम रिपोर्ट",
    price: 299,
    features: [
      "Everything in Basic",
      "Formatted PDF report",
      "Risk analysis & recommendations",
      "Verification certificate",
    ],
    featuresHi: [
      "मूल में सब कुछ",
      "स्वरूपित PDF रिपोर्ट",
      "जोखिम विश्लेषण और सिफारिशें",
      "सत्यापन प्रमाणपत्र",
    ],
  },
  {
    name: "Legal Pack",
    nameHi: "कानूनी पैक",
    price: 599,
    features: [
      "Everything in Premium",
      "Chain of ownership analysis",
      "Legal advisory notes",
      "Priority support",
    ],
    featuresHi: [
      "प्रीमियम में सब कुछ",
      "स्वामित्व की श्रृंखला विश्लेषण",
      "कानूनी सलाहकार नोट",
      "प्राथमिकता सहायता",
    ],
  },
];

export const ExportModal = ({ open, onOpenChange, uploadId }: ExportModalProps) => {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    if (selectedTier === null) {
      toast({
        title: "Select a tier / एक स्तर चुनें",
        description: "Please select a report tier to continue",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call to /api/pay
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uploadId,
          tier: selectedTier,
          amount: priceTiers[selectedTier].price,
        }),
      });

      const data = await response.json();
      
      // Mock response for now
      if (data.paymentUrl) {
        toast({
          title: "Redirecting to payment / भुगतान पर पुनर्निर्देशित",
          description: "You will be redirected to complete the payment",
        });
        
        // Redirect to payment URL
        window.location.href = data.paymentUrl;
      }
    } catch (error) {
      toast({
        title: "Error / त्रुटि",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Export Report / रिपोर्ट निर्यात करें
          </DialogTitle>
          <DialogDescription>
            Choose a report tier to download your parsed khatauni data
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-4 py-4">
          {priceTiers.map((tier, index) => (
            <button
              key={index}
              onClick={() => setSelectedTier(index)}
              className={`text-left p-6 rounded-lg border-2 transition-all hover:shadow-lg ${
                selectedTier === index
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground">{tier.nameHi}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  <span className="text-3xl font-bold">{tier.price}</span>
                </div>

                <div className="space-y-2">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm">{feature}</p>
                        <p className="text-xs text-muted-foreground">
                          {tier.featuresHi[i]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel / रद्द करें
          </Button>
          <Button
            onClick={handleExport}
            disabled={selectedTier === null || loading}
          >
            <Download className="mr-2 h-4 w-4" />
            {loading ? "Processing..." : "Proceed to Payment / भुगतान करें"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
