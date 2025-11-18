import { AlertTriangle, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Badge } from "./ui/badge";

interface RiskBadgeProps {
  type: "MISSING_OLD_RECORDS" | "FREQUENT_MUTATIONS" | "DISPUTED" | "INCOMPLETE_DATA";
  variant?: "warning" | "destructive";
}

const riskInfo = {
  MISSING_OLD_RECORDS: {
    label: "Missing Old Records / पुराने रिकॉर्ड गायब",
    description: "Some historical records before 2010 could not be verified. This may indicate incomplete documentation. / 2010 से पहले के कुछ ऐतिहासिक रिकॉर्ड सत्यापित नहीं किए जा सके।",
    icon: AlertTriangle,
  },
  FREQUENT_MUTATIONS: {
    label: "Frequent Mutations / बार-बार परिवर्तन",
    description: "This property has changed hands multiple times in recent years. Verify chain of ownership carefully. / इस संपत्ति ने हाल के वर्षों में कई बार हाथ बदले हैं।",
    icon: AlertTriangle,
  },
  DISPUTED: {
    label: "Disputed / विवादित",
    description: "This property may have pending legal disputes. Consult with legal advisor before proceeding. / इस संपत्ति पर कानूनी विवाद लंबित हो सकते हैं।",
    icon: AlertTriangle,
  },
  INCOMPLETE_DATA: {
    label: "Incomplete Data / अपूर्ण डेटा",
    description: "Some fields could not be extracted from the document. Manual verification recommended. / दस्तावेज़ से कुछ फ़ील्ड निकाले नहीं जा सके।",
    icon: Info,
  },
};

export const RiskBadge = ({ type, variant = "warning" }: RiskBadgeProps) => {
  const info = riskInfo[type];
  const Icon = info.icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={variant} className="cursor-help gap-1">
            <Icon className="h-3 w-3" />
            <span className="text-xs">{type.replace(/_/g, " ")}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="font-semibold mb-1">{info.label}</p>
          <p className="text-sm">{info.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
