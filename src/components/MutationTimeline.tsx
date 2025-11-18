import { Calendar } from "lucide-react";

interface Mutation {
  year: string;
  description: string;
}

interface MutationTimelineProps {
  mutations: Mutation[];
}

export const MutationTimeline = ({ mutations }: MutationTimelineProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">
        Mutation History / परिवर्तन इतिहास
      </h3>
      
      <div className="relative space-y-4">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-border" />
        
        {mutations.map((mutation, index) => (
          <div key={index} className="relative flex gap-4">
            {/* Timeline dot */}
            <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-border bg-background">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            
            {/* Content */}
            <div className="flex-1 space-y-1 pt-1.5">
              <p className="font-semibold text-sm text-primary">
                {mutation.year}
              </p>
              <p className="text-sm text-muted-foreground">
                {mutation.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {mutations.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No mutation records found / कोई परिवर्तन रिकॉर्ड नहीं मिला
        </p>
      )}
    </div>
  );
};
