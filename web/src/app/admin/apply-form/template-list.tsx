'use client';

import { useState } from "react";
import { assignTemplateToUser, deleteTemplate } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, UserPlus, MoreVertical, FileText } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Template = {
    id: string;
    templateName: string | null;
    title: string;
    description: string | null;
    type: string;
    updatedAt: Date;
    createdAt: Date;
    _count: {
        derivedTickets: number;
    };
}

type UserOption = {
    id: string;
    name: string | null;
    email: string;
}

export function TemplateList({ templates, users }: { templates: Template[], users: UserOption[] }) {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<string>("");
    const [isAssigning, setIsAssigning] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    async function handleAssign() {
        if (!selectedTemplate || !selectedUser) return;
        setIsAssigning(true);
        const res = await assignTemplateToUser(selectedTemplate, selectedUser);
        setIsAssigning(false);
        if (res.success) {
            setOpenDialog(false);
            // Maybe toast success
        } else {
            alert(res.message);
        }
    }

    async function handleDelete(id: string) {
        if (confirm("정말로 이 템플릿을 삭제하시겠습니까?")) {
            await deleteTemplate(id);
        }
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Create New Card */}
                <Link href="/admin/apply-form/new" className="group h-full">
                    <Card className="h-full bg-zinc-900/30 border-zinc-800 border-dashed hover:border-blue-500/50 hover:bg-zinc-900 transition-all cursor-pointer flex flex-col items-center justify-center p-8 text-center space-y-4 min-h-[250px]">
                        <div className="w-16 h-16 rounded-full bg-zinc-800 group-hover:bg-blue-500/20 flex items-center justify-center transition-colors">
                            <Plus className="w-8 h-8 text-zinc-400 group-hover:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-white group-hover:text-blue-400">새 템플릿 생성</h3>
                            <p className="text-sm text-zinc-500 mt-2">고객을 위한 새로운 폼 구조를 설계하세요</p>
                        </div>
                    </Card>
                </Link>

                {templates.map(template => (
                    <Card key={template.id} className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm flex flex-col justify-between group hover:border-zinc-700 transition-all">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-blue-500/10 rounded-lg w-fit mb-4">
                                    <FileText className="w-6 h-6 text-blue-500" />
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-200">
                                        <DropdownMenuItem onClick={() => handleDelete(template.id)} className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10 cursor-pointer">
                                            <Trash2 className="mr-2 h-4 w-4" /> 삭제
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <CardTitle className="text-white line-clamp-1">{template.templateName || template.title}</CardTitle>
                            <CardDescription className="line-clamp-2 h-10">
                                {template.description || "설명이 없습니다."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 rounded bg-zinc-800 text-xs text-zinc-400 border border-zinc-700">{template.type}</span>
                                    <span className="px-2 py-1 rounded bg-blue-900/30 text-xs text-blue-400 border border-blue-900/50 flex items-center gap-1">
                                        <UserPlus className="w-3 h-3" /> {template._count.derivedTickets}명에게 할당됨
                                    </span>
                                </div>
                                <span className="text-xs text-zinc-500">
                                    생성일: {new Date(template.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-4 border-t border-zinc-800/50">
                            <Dialog open={openDialog && selectedTemplate === template.id} onOpenChange={(open) => {
                                setOpenDialog(open);
                                if (open) setSelectedTemplate(template.id);
                            }}>
                                <DialogTrigger asChild>
                                    <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700 border">
                                        <UserPlus className="w-4 h-4 mr-2" /> 고객에게 할당
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>템플릿 할당</DialogTitle>
                                        <DialogDescription className="text-zinc-400">
                                            <strong>{template.templateName || template.title}</strong> 템플릿을 고객에게 할당합니다. 고객 대시보드에 '대기중' 상태로 생성됩니다.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="user">고객 선택</Label>
                                            <Select onValueChange={setSelectedUser} value={selectedUser !== "" ? selectedUser : undefined}>
                                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                                    <SelectValue placeholder="사용자를 선택하세요..." />
                                                </SelectTrigger>
                                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                    {users.map(user => (
                                                        <SelectItem key={user.id} value={user.id}>
                                                            {user.name || user.email}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            onClick={handleAssign}
                                            disabled={!selectedUser || isAssigning}
                                            className="bg-blue-600 hover:bg-blue-500 text-white"
                                        >
                                            {isAssigning ? "할당 중..." : "할당 확인"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
