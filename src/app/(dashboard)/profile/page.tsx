import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, CheckCircle2, AlertCircle } from "lucide-react";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import Link from "next/link";

export default async function ProfilePage() {
  const sessionCookie = (await cookies()).get("session")?.value;
  const session = await decrypt(sessionCookie);

  const isActive = session?.status === "active";
  const isEnrolled = session?.enrollment_status === "approved";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
            <CardDescription>Your current enrollment and platform access level.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {isActive ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                </div>
                <div>
                  <p className="font-medium">Account Status</p>
                  <p className="text-sm text-muted-foreground capitalize">{session?.status}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${isEnrolled ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                  {isEnrolled ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                </div>
                <div>
                  <p className="font-medium">Course Access (Enrollment)</p>
                  <p className="text-sm text-muted-foreground capitalize">{session?.enrollment_status}</p>
                </div>
              </div>
              {!isEnrolled && (
                <Button variant="outline" size="sm">Contact Admin</Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <User className="h-10 w-10" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input defaultValue={session?.email.split('@')[0]} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input defaultValue={session?.email} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input defaultValue="01XXXXXXXXX" readOnly />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input defaultValue={session?.role} className="capitalize" readOnly />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline">Edit Profile</Button>
            <Link href="/change-password">
              <Button>Change Password</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
