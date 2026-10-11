"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  UserPlus, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Trash2, 
  ShieldCheck, 
  AlertCircle,
  Phone,
  Mail,
  RefreshCw,
  X
} from "lucide-react";

interface Student {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: string;
  account_status: string;
  enrollment_status: string;
  created_at: string;
  last_login_at: string | null;
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    enrollment_status: "approved",
    account_status: "active",
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/students");
      const data = await res.json();
      if (res.ok) {
        setStudents(data.students || []);
      } else {
        setError(data.error || "Failed to load students");
      }
    } catch {
      setError("Network error while fetching students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(`Student "${data.student.full_name}" created successfully with instant course access!`);
        setIsModalOpen(false);
        setFormData({
          full_name: "",
          email: "",
          phone: "",
          password: "",
          enrollment_status: "approved",
          account_status: "active",
        });
        fetchStudents();
      } else {
        setError(data.error || "Failed to create student");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleEnrollment = async (studentId: string, currentStatus: string) => {
    const newStatus = currentStatus === "approved" ? "pending" : "approved";
    try {
      const res = await fetch(`/api/admin/students/${studentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollment_status: newStatus }),
      });
      if (res.ok) {
        setStudents(students.map(s => s.id === studentId ? { ...s, enrollment_status: newStatus } : s));
      }
    } catch {
      setError("Failed to update enrollment status");
    }
  };

  const toggleAccountStatus = async (studentId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const res = await fetch(`/api/admin/students/${studentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account_status: newStatus }),
      });
      if (res.ok) {
        setStudents(students.map(s => s.id === studentId ? { ...s, account_status: newStatus } : s));
      }
    } catch {
      setError("Failed to update account status");
    }
  };

  const handleDelete = async (studentId: string, studentName: string) => {
    if (!confirm(`Are you sure you want to delete ${studentName}? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/students/${studentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setStudents(students.filter(s => s.id !== studentId));
        setSuccess(`Student ${studentName} was deleted.`);
      }
    } catch {
      setError("Failed to delete student");
    }
  };

  const filteredStudents = students.filter(student => 
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.phone && student.phone.includes(searchTerm))
  );

  const approvedCount = students.filter(s => s.enrollment_status === "approved").length;
  const activeCount = students.filter(s => s.account_status === "active").length;

  return (
    <div className="space-y-6">
      {/* Header and Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Manage Students</h1>
          <p className="text-slate-500 mt-1">Create, approve, and manage student accounts and course access.</p>
        </div>
        <Button 
          onClick={() => { setIsModalOpen(true); setError(""); setSuccess(""); }}
          className="bg-primary hover:bg-primary/90 text-white font-medium flex items-center shadow-md shadow-primary/20"
        >
          <UserPlus className="mr-2 h-4 w-4" /> Add New Student
        </Button>
      </div>

      {/* Notifications */}
      {success && (
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm">
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 text-green-600 shrink-0" />
            <span>{success}</span>
          </div>
          <button onClick={() => setSuccess("")} className="text-green-600 hover:text-green-800">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError("")} className="text-red-600 hover:text-red-800">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Total Registered</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{students.length}</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Course Access Approved</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">{approvedCount}</h3>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Active Accounts</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{activeCount}</h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-lg">Students Directory</CardTitle>
            <CardDescription>Click badges to instantly toggle course access or account status.</CardDescription>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
            <Button variant="outline" size="sm" onClick={fetchStudents} className="h-9 px-3">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-slate-500">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary mb-2" />
              <p className="text-sm">Loading students...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <Users className="h-12 w-12 mx-auto text-slate-300 mb-3" />
              <h3 className="text-base font-semibold text-slate-800">No students found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
                {searchTerm ? "No results match your search query." : "Add your first student to give them access to the courses."}
              </p>
              {!searchTerm && (
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4"
                  size="sm"
                >
                  <UserPlus className="mr-2 h-4 w-4" /> Add Student
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                  <tr>
                    <th className="px-5 py-3">Student</th>
                    <th className="px-5 py-3">Contact</th>
                    <th className="px-5 py-3">Course Access</th>
                    <th className="px-5 py-3">Account</th>
                    <th className="px-5 py-3">Joined Date</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-sm">
                            {student.full_name ? student.full_name.charAt(0).toUpperCase() : "S"}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{student.full_name}</div>
                            <div className="text-xs text-slate-500 flex items-center">
                              <Mail className="h-3 w-3 mr-1 inline" /> {student.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {student.phone ? (
                          <span className="text-xs text-slate-600 flex items-center">
                            <Phone className="h-3 w-3 mr-1 inline text-slate-400" /> {student.phone}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => toggleEnrollment(student.id, student.enrollment_status)}
                          title="Click to toggle course access"
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                            student.enrollment_status === "approved"
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                          }`}
                        >
                          {student.enrollment_status === "approved" ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Approved
                            </>
                          ) : (
                            <>
                              <Clock className="h-3.5 w-3.5 mr-1" /> Pending
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => toggleAccountStatus(student.id, student.account_status)}
                          title="Click to toggle active state"
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                            student.account_status === "active"
                              ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {student.account_status === "active" ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-500 whitespace-nowrap">
                        {new Date(student.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(student.id, student.full_name)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          title="Delete Student"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal: Add Student */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Add New Student</h3>
                <p className="text-xs text-slate-500">Create login credentials for a student.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="full_name">Student Full Name *</Label>
                <Input
                  id="full_name"
                  placeholder="e.g. Rahim Ahmed"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address (Login) *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  placeholder="01XXXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="enrollment_status">Course Access</Label>
                <select
                  id="enrollment_status"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.enrollment_status}
                  onChange={(e) => setFormData({ ...formData, enrollment_status: e.target.value })}
                >
                  <option value="approved">Approved (Instant Full Course Access)</option>
                  <option value="pending">Pending Approval</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  {submitting ? "Creating..." : "Create Student"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
