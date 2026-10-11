import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

export default function PdfsPage() {
  const pdfs: Array<{ title: string; desc: string }> = [];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Download PDF Materials</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Exclusive study guides, vocabulary lists, and practice materials for enrolled students.
        </p>
      </div>

      {pdfs.length === 0 ? (
        <Card className="border-dashed p-12 text-center text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
          <h3 className="text-lg font-semibold text-foreground">No PDF materials uploaded yet</h3>
          <p className="text-sm mt-1 max-w-sm mx-auto">
            Study guides and practice worksheets will appear here once uploaded by the administrator.
          </p>
        </Card>
      ) : (
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
      )}
    </div>
  );
}
