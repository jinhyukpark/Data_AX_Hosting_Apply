'use client'

import { useState } from "react";
import { submitForm } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";

export function SubmitForm({ ticket }: { ticket: any }) {
    const [isLoading, setIsLoading] = useState(false);
    // Parse existing data if any
    const initialData = ticket.formData ? JSON.parse(ticket.formData) : {};

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        const form = new FormData(event.currentTarget);

        // Construct JSON from specific fields for the 'formData' column
        const dataObj = {
            serviceName: form.get('serviceName'),
            requirements: form.get('requirements'),
            targetAudience: form.get('targetAudience')
        };
        form.set('jsonData', JSON.stringify(dataObj));

        await submitForm(ticket.id, form);
        setIsLoading(false);
        // Optionally show success toast
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-white">Service Specifications</CardTitle>
                    <CardDescription>Provide the necessary details for your {ticket.type} request.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="serviceName" className="text-zinc-200">Service Name *</Label>
                        <Input
                            id="serviceName"
                            name="serviceName"
                            defaultValue={initialData.serviceName}
                            placeholder="e.g. My Custom Agent"
                            required
                            className="bg-zinc-950 border-zinc-800"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="targetAudience" className="text-zinc-200">Target Audience</Label>
                        <Input
                            id="targetAudience"
                            name="targetAudience"
                            defaultValue={initialData.targetAudience}
                            placeholder="e.g. Internal Employees, Public Customers"
                            className="bg-zinc-950 border-zinc-800"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-zinc-200">General Description *</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={ticket.description}
                            placeholder="Describe what you need in detail..."
                            required
                            className="min-h-[100px] bg-zinc-950 border-zinc-800"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="requirements" className="text-zinc-200">Technical Requirements</Label>
                        <Textarea
                            id="requirements"
                            name="requirements"
                            defaultValue={initialData.requirements}
                            placeholder="Specific limits, API versions, or integrations..."
                            className="min-h-[100px] bg-zinc-950 border-zinc-800"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white min-w-[150px]">
                    {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <><Save className="w-4 h-4 mr-2" /> Submit Specifications</>}
                </Button>
            </div>
        </form>
    );
}
