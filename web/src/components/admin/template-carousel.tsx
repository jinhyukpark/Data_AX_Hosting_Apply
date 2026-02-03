'use client';

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText, UserPlus, Clock, Trash2, MoreVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { deleteTemplate } from "@/app/admin/apply-form/actions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { assignTemplateToUser } from "@/app/admin/apply-form/actions";

type Template = {
    id: string;
    templateName: string | null;
    title: string;
    description: string | null;
    type: string;
    updatedAt: Date | string;
    createdAt: Date | string;
    _count: {
        derivedTickets: number;
    };
}

type UserOption = {
    id: string;
    name: string | null;
    email: string;
}

interface TemplateCarouselProps {
    templates: Template[];
    users: UserOption[];
}

export function TemplateCarousel({ templates, users }: TemplateCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<string>("");
    const [isAssigning, setIsAssigning] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const next = () => {
        if (currentIndex < templates.length - 3) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    async function handleAssign() {
        if (!selectedTemplate || !selectedUser) return;
        setIsAssigning(true);
        const res = await assignTemplateToUser(selectedTemplate, selectedUser);
        setIsAssigning(false);
        if (res.success) {
            setOpenDialog(false);
            setSelectedUser("");
        } else {
            alert(res.message);
        }
    }

    async function handleDelete(id: string) {
        if (confirm("정말로 이 템플릿을 삭제하시겠습니까?")) {
            await deleteTemplate(id);
        }
    }

    if (templates.length === 0) {
        return (
            <div className="text-center py-12 bg-zinc-900/30 rounded-xl border border-dashed border-zinc-800">
                <p className="text-zinc-500">생성된 템플릿이 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="relative group">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">템플릿 보관함 ({templates.length})</h3>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prev}
                        disabled={currentIndex === 0}
                        className="h-8 w-8 rounded-full bg-zinc-900 border-zinc-800 hover:bg-zinc-800 disabled:opacity-30"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={next}
                        disabled={currentIndex >= templates.length - 3}
                        className="h-8 w-8 rounded-full bg-zinc-900 border-zinc-800 hover:bg-zinc-800 disabled:opacity-30"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="overflow-hidden">
                <motion.div
                    className="flex gap-6"
                    animate={{ x: `-${currentIndex * (100 / 3.1)}%` }} // Rough estimate for spacing
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {templates.map((template) => (
                        <Card key={template.id} className="min-w-[300px] max-w-[300px] bg-zinc-900/50 border-zinc-800 backdrop-blur-sm flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <FileText className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-500 hover:text-white">
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
                                <CardTitle className="text-white text-lg line-clamp-1">{template.templateName || template.title}</CardTitle>
                                <CardDescription className="line-clamp-2 text-xs h-8 text-zinc-500">
                                    {template.description || "설명이 없습니다."}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-4 space-y-3">
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>생성일: {new Date(template.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <UserPlus className="w-3.5 h-3.5" />
                                    <span>{template._count.derivedTickets}명 사용 중</span>
                                </div>
                                <div className="pt-2">
                                    <Dialog open={openDialog && selectedTemplate === template.id} onOpenChange={(open) => {
                                        setOpenDialog(open);
                                        if (open) setSelectedTemplate(template.id);
                                    }}>
                                        <DialogTrigger asChild>
                                            <Button variant="secondary" className="w-full h-8 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700">
                                                할당하기
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>템플릿 할당</DialogTitle>
                                                <DialogDescription className="text-zinc-400">
                                                    <strong>{template.templateName || template.title}</strong> 템플릿을 고객에게 할당합니다.
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
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
