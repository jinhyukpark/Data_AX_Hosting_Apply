'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, UserPlus } from "lucide-react";
import { assignTemplateToUser } from "@/app/admin/apply-form/actions";

type UserOption = {
    id: string;
    name: string | null;
    email: string;
}

type TemplateOption = {
    id: string;
    templateName: string | null;
}

interface DistributionDialogProps {
    users: UserOption[];
    templates: TemplateOption[];
}

export function DistributionDialog({ users, templates }: DistributionDialogProps) {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<string>("");
    const [customEmail, setCustomEmail] = useState<string>("");
    const [selectedTemplate, setSelectedTemplate] = useState<string>("");
    const [isSending, setIsSending] = useState(false);

    // Filter templates to only include the "Featured" one if needed, 
    // but here we show all templates found.

    // Auto-select the first template if there is only one
    useState(() => {
        if (templates.length === 1) {
            setSelectedTemplate(templates[0].id);
        }
    });

    async function handleSend() {
        const userId = selectedUser === "custom" ? customEmail : selectedUser;
        if (!userId || !selectedTemplate) return;

        setIsSending(true);

        // Note: For "custom" email, we would normally need an action that handles 
        // user creation or lookup. For now, we'll assume the action handles it 
        // or we just pick from existing users.
        const res = await assignTemplateToUser(selectedTemplate, userId);

        setIsSending(false);
        if (res.success) {
            setOpen(false);
            setSelectedUser("");
            setCustomEmail("");
        } else {
            alert(res.message);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                    <Send className="w-4 h-4 mr-2" /> 요청서 전달하기
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle className="text-xl">요청서 전달하기</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        고객에게 데이터 신청 폼 요청서를 전송합니다.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="space-y-3">
                        <Label htmlFor="user">대상 사용자 선택</Label>
                        <Select onValueChange={setSelectedUser} value={selectedUser}>
                            <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                <SelectValue placeholder="사용자 선택..." />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                {users.map(user => (
                                    <SelectItem key={user.id} value={user.id}>
                                        {user.name ? `${user.name} (${user.email})` : user.email}
                                    </SelectItem>
                                ))}
                                <SelectItem value="custom" className="text-blue-400">직접 입력...</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedUser === "custom" && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                            <Label htmlFor="email">직접 입력 (이메일)</Label>
                            <Input
                                id="email"
                                placeholder="customer@example.com"
                                value={customEmail}
                                onChange={(e) => setCustomEmail(e.target.value)}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>
                    )}

                    <div className="space-y-3">
                        <Label htmlFor="template">템플릿 선택</Label>
                        <Select onValueChange={setSelectedTemplate} value={selectedTemplate}>
                            <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                <SelectValue placeholder="템플릿 선택..." />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                {templates.map(template => (
                                    <SelectItem key={template.id} value={template.id}>
                                        {template.templateName || "기본 템플릿"}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleSend}
                        disabled={!selectedTemplate || (!selectedUser && !customEmail) || isSending}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white h-11"
                    >
                        {isSending ? "전송 중..." : "요청서 전송"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
