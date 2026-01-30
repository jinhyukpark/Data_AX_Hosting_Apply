'use client';

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export function SectionBasicInfo() {
    const { control } = useFormContext();

    const requestTypes = ["데이터셋", "API", "MCP 서버", "에이전트"];

    return (
        <div className="space-y-8">
            <h3 className="text-xl font-semibold text-white">1. 서비스 기본 정보</h3>

            <FormField
                control={control}
                name="requestType"
                render={() => (
                    <FormItem>
                        <FormLabel className="text-white">요청 유형 (다중 선택)</FormLabel>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                            {requestTypes.map((type) => (
                                <FormField
                                    key={type}
                                    control={control}
                                    name="requestType"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={type}
                                                className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-700 p-4"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(type)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, type])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value: string) => value !== type
                                                                    )
                                                                );
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-zinc-300 cursor-pointer">
                                                    {type}
                                                </FormLabel>
                                            </FormItem>
                                        );
                                    }}
                                />
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                    control={control}
                    name="serviceName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">서비스/제품 명</FormLabel>
                            <FormControl>
                                <Input placeholder="예: 금융 데이터 API" {...field} className="bg-zinc-900 border-zinc-700" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="shortDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">간단한 설명 (최대 200자)</FormLabel>
                            <FormControl>
                                <Input placeholder="한 줄 요약" {...field} maxLength={200} className="bg-zinc-900 border-zinc-700" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={control}
                name="detailDescription"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-white">상세 설명 (선택 사항)</FormLabel>
                        <FormControl>
                            <Textarea placeholder="서비스에 대한 추가 설명..." {...field} className="bg-zinc-900 border-zinc-700 min-h-[100px]" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800">
                <h4 className="col-span-full font-medium text-zinc-400">담당자 정보</h4>
                <FormField
                    control={control}
                    name="contactCompany"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>회사명</FormLabel>
                            <FormControl>
                                <Input placeholder="ACME Corp" {...field} className="bg-zinc-900 border-zinc-700" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="contactName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>담당자명</FormLabel>
                            <FormControl>
                                <Input placeholder="홍길동" {...field} className="bg-zinc-900 border-zinc-700" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="contactEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>이메일</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="john@acme.com" {...field} className="bg-zinc-900 border-zinc-700" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="contactPhone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>전화번호</FormLabel>
                            <FormControl>
                                <Input placeholder="010-1234-5678" {...field} className="bg-zinc-900 border-zinc-700" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}
