"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Plus, 
  Trash2, 
  FileEdit, 
  Eye, 
  CheckCircle2, 
  HardDrive
} from "lucide-react";
import Link from "next/link";

export default function AdminPdfsPage() {
  const [pdfs, setPdfs] = useState<Array<{ id: string; title: string; size: string; module: string; status: string; downloads: number }>>([]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Study PDF Materials</h1>
          <p className="text-slate-500 mt-1">Manage downloadable study materials, practice tests, and guides for students.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white font-medium flex items-center shadow-md shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Upload New PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Total Study Guides</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{pdfs.length}</h3>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-xl">
              <FileText className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Total Student Downloads</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">0</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Download className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Storage Used</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">0 MB</h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <HardDrive className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle className="text-lg">PDF Resources Library</CardTitle>
            <CardDescription>Files accessible in the Student Download section.</CardDescription>
          </div>
          <Link href="/pdfs" target="_blank">
            <Button variant="outline" size="sm" className="text-xs">
              <Eye className="mr-1.5 h-3.5 w-3.5" /> View Student Library
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {pdfs.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <FileText className="h-12 w-12 mx-auto text-slate-300 mb-3" />
              <h3 className="text-base font-semibold text-slate-800">No PDFs uploaded yet</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
                You haven&apos;t uploaded any study materials yet. Click the button below to upload your first study guide or test sheet.
              </p>
              <Button className="mt-4 bg-primary hover:bg-primary/90 text-white font-medium" size="sm">
                <Plus className="mr-2 h-4 w-4" /> Upload First PDF
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                  <tr>
                    <th className="px-5 py-3">Document Title</th>
                    <th className="px-5 py-3">Module</th>
                    <th className="px-5 py-3">File Size</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
              <tbody className="divide-y divide-slate-100">
                {pdfs.map((pdf) => (
                  <tr key={pdf.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-red-50 text-red-600 rounded-xl shrink-0">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{pdf.title}</p>
                          <p className="text-xs text-slate-400 font-mono">{pdf.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                        {pdf.module}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500 font-mono">
                      {pdf.size}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> {pdf.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-slate-800" title="Edit">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setPdfs(pdfs.filter(p => p.id !== pdf.id))}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700" 
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </CardContent>
      </Card>
    </div>
  );
}
