"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Change Password</h1>
        <p className="text-muted-foreground mt-2">Ensure your account is using a long, random password to stay secure.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
          <CardDescription>Enter your current password and a new one.</CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <div className="bg-green-100 text-green-800 text-sm p-3 rounded-md mb-6">
              Your password has been changed successfully.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm New Password</Label>
              <Input id="confirm" type="password" required />
            </div>
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Updating..." : "Save Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
