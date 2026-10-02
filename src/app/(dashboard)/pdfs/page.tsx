import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

export default function PdfsPage() {
  const pdfs = [
    { title: "IELTS Vocabulary PDF", desc: "Essential IELTS vocabulary for band 7+." },
    { title: "IELTS Writing Task 1", desc: "Complete guide and sample answers." },
    { title: "IELTS Writing Task 2", desc: "Essay structures and high-scoring examples." },
    { title: "IELTS Speaking Questions", desc: "Latest part 1, 2, and 3 practice questions." },
    { title: "IELTS Reading Practice", desc: "Academic and General Training practice tests." },
    { title: "IELTS Listening Practice", desc: "Transcripts and answer keys for practice tests." },
    { title: "IELTS Grammar Guide", desc: "Crucial grammar rules for writing and speaking." },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Download PDF Materials</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Exclusive study guides, vocabulary lists, and practice materials for enrolled students.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pdfs.map((pdf, index) => (
          <Card key={index} className="flex flex-col h-full hover:shadow-md transition-shadow hover:border-primary/50">
            <CardHeader>
              <div className="h-10 w-10 bg-red-100 rounded flex items-center justify-center mb-3">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
              <CardTitle className="text-lg leading-tight">{pdf.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <p className="text-sm text-muted-foreground mb-6">{pdf.desc}</p>
              <Button className="w-full" variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
