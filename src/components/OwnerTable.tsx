import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Owner {
  name: string;
  fatherName: string;
  share: string;
  percentage: number;
}

interface OwnerTableProps {
  owners: Owner[];
}

export const OwnerTable = ({ owners }: OwnerTableProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Name / नाम</TableHead>
            <TableHead>Father's Name / पिता का नाम</TableHead>
            <TableHead className="text-right">Share / हिस्सा</TableHead>
            <TableHead className="text-right">Percentage / प्रतिशत</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {owners.map((owner, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{owner.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {owner.fatherName}
              </TableCell>
              <TableCell className="text-right font-mono">
                {owner.share}
              </TableCell>
              <TableCell className="text-right">
                <span className="font-semibold text-primary">
                  {owner.percentage.toFixed(2)}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
