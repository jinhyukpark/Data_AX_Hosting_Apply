'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { formSchema, FormValues } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Loader2, FilePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createTemplate } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Form Sections
import { SectionBasicInfo } from "@/components/form-sections/section-basic-info";
import { SectionProvisionSource } from "@/components/form-sections/section-provision-source";
import { SectionDataSpec } from "@/components/form-sections/section-data-spec";
import { SectionFunctionalScope } from "@/components/form-sections/section-functional";
import { SectionTrafficInfra } from "@/components/form-sections/section-traffic-infra";
import { SectionSecurityOps } from "@/components/form-sections/section-security-ops";
import { SectionBillingMisc } from "@/components/form-sections/section-billing-terms";

export function TemplateForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const methods = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            requestType: [],
            collectionMethod: [],
            sourceType: [],
            maskingNeeded: false,
            scrapingNeeded: false,
            agreeToTerms: false,
            agreeToRights: false,
            agreeToLiability: false,
            agreeToPrivacy: false,
            serviceName: "",
            shortDescription: "",
        },
        mode: "onChange"
    });

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true);
        try {
            const res = await createTemplate(data);
            if (res.success) {
                router.push('/admin/apply-form');
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const { formState: { errors } } = methods;
    const hasError = (fields: (keyof FormValues)[]) => fields.some(f => errors[f]);

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white mb-2">새 신청 템플릿 생성</h2>
                    <p className="text-zinc-400 text-sm">요청 유형에 대한 기본 구조와 값들을 정의합니다.</p>
                </div>
            </div>

            <FormProvider {...methods}>
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">

                        <div className="bg-zinc-900/50 p-6 border border-zinc-800 rounded-xl space-y-4">
                            <h3 className="text-white font-medium">템플릿 정보</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-zinc-300">템플릿 이름 (내부 관리용)</Label>
                                    <Input
                                        {...methods.register("serviceName")}
                                        placeholder="예: 표준 데이터셋 요청"
                                        className="bg-zinc-950 border-zinc-800"
                                    />
                                    <p className="text-xs text-zinc-500">이 이름은 템플릿 식별용으로 사용됩니다.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-300">설명</Label>
                                    <Input
                                        {...methods.register("shortDescription")}
                                        placeholder="이 템플릿에 대한 간략한 설명..."
                                        className="bg-zinc-950 border-zinc-800"
                                    />
                                </div>
                            </div>
                        </div>

                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 bg-zinc-900 border border-zinc-800">
                                <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                                    개요
                                    {hasError(['serviceName', 'requestType']) && <span className="ml-2 text-red-400">•</span>}
                                </TabsTrigger>
                                <TabsTrigger value="technical" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                                    기술 스펙
                                    {hasError(['dataFormat', 'updateFrequency']) && <span className="ml-2 text-red-400">•</span>}
                                </TabsTrigger>
                                <TabsTrigger value="infra" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                                    인프라/보안
                                    {hasError(['cloudProvider', 'securityLevel']) && <span className="ml-2 text-red-400">•</span>}
                                </TabsTrigger>
                                <TabsTrigger value="business" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                                    비즈니스/약관
                                    {hasError(['billingModel', 'agreeToTerms']) && <span className="ml-2 text-red-400">•</span>}
                                </TabsTrigger>
                            </TabsList>

                            <div className="mt-6">
                                <TabsContent value="overview">
                                    <Card className="bg-zinc-950/50 border-zinc-800">
                                        <CardContent className="p-6 space-y-10">
                                            <SectionBasicInfo />
                                            <div className="w-full h-px bg-zinc-800" />
                                            <SectionProvisionSource />
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="technical">
                                    <Card className="bg-zinc-950/50 border-zinc-800">
                                        <CardContent className="p-6 space-y-10">
                                            <SectionDataSpec />
                                            <div className="w-full h-px bg-zinc-800" />
                                            <SectionFunctionalScope />
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="infra">
                                    <Card className="bg-zinc-950/50 border-zinc-800">
                                        <CardContent className="p-6 space-y-10">
                                            <SectionTrafficInfra />
                                            <div className="w-full h-px bg-zinc-800" />
                                            <SectionSecurityOps />
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="business">
                                    <Card className="bg-zinc-950/50 border-zinc-800">
                                        <CardContent className="p-6 space-y-10">
                                            <SectionBillingMisc />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </div>
                        </Tabs>

                        <div className="flex justify-end gap-4 sticky bottom-4 p-4 bg-black/80 backdrop-blur border-t border-zinc-800 z-50">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-900/20"
                            >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <FilePlus className="w-4 h-4 mr-2" />}
                                템플릿 생성
                            </Button>
                        </div>
                    </form>
                </Form>
            </FormProvider>
        </div>
    );
}
