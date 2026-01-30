'use client';

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";

export function SectionProvisionSource() {
    const { control, watch } = useFormContext();
    // const sourceType = watch("sourceType"); // Can be used for conditional rendering

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">2. 제공 유형 및 목적</h3>

                <FormField
                    control={control}
                    name="purpose"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>제공 목적</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                                >
                                    {["다운로드", "API 호출", "MCP 도구", "에이전트 실행"].map((opt) => (
                                        <FormItem key={opt}>
                                            <FormControl>
                                                <div className="">
                                                    <RadioGroupItem value={opt} id={`purpose-${opt}`} className="peer sr-only" />
                                                    <Label
                                                        htmlFor={`purpose-${opt}`}
                                                        className="flex flex-col items-center justify-center rounded-md border-2 border-zinc-800 bg-zinc-950 p-4 hover:bg-zinc-900 hover:text-white peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-900/10 peer-data-[state=checked]:text-blue-500 cursor-pointer transition-all"
                                                    >
                                                        {opt}
                                                    </Label>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Re-implementing with proper RadioGroup structure for 'Final Form' */}
                <FormField
                    control={control}
                    name="finalForm"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>최종 사용자 제공 형태</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                >
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <RadioGroupItem value="file_download" id="form-file" className="peer sr-only" />
                                                <Label htmlFor="form-file" className="flex items-center p-4 rounded-md border border-zinc-700 bg-zinc-900 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-blue-500 cursor-pointer hover:bg-zinc-800 transition-all">
                                                    파일 다운로드 (CSV, JSON 등)
                                                </Label>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <RadioGroupItem value="streaming" id="form-streaming" className="peer sr-only" />
                                                <Label htmlFor="form-streaming" className="flex items-center p-4 rounded-md border border-zinc-700 bg-zinc-900 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-blue-500 cursor-pointer hover:bg-zinc-800 transition-all">
                                                    스트리밍 / 실시간
                                                </Label>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <RadioGroupItem value="query" id="form-query" className="peer sr-only" />
                                                <Label htmlFor="form-query" className="flex items-center p-4 rounded-md border border-zinc-700 bg-zinc-900 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-blue-500 cursor-pointer hover:bg-zinc-800 transition-all">
                                                    쿼리 기반
                                                </Label>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="scenario"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>사용 시나리오 (누가/언제/왜)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="예: 금융 분석가가 일일 주가 변동을 추적하기 위해 사용..."
                                    {...field}
                                    className="bg-zinc-900 border-zinc-700"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h3 className="text-xl font-semibold text-white">3. 데이터 출처 및 권한</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={control}
                        name="sourceDetail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>출처 상세 (기관/URL)</FormLabel>
                                <FormControl>
                                    <Input placeholder="예: 공공데이터포털" {...field} className="bg-zinc-900 border-zinc-700" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="copyrightStatus"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>저작권 상태</FormLabel>
                                <FormControl>
                                    <Input placeholder="소유 / 라이선스 확보" {...field} className="bg-zinc-900 border-zinc-700" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={control}
                    name="redistribution"
                    render={({ field }) => (
                        <FormItem className="block">
                            <FormLabel>재배포 정책</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 mt-2">
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl><RadioGroupItem value="allow" /></FormControl>
                                        <FormLabel>허용</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl><RadioGroupItem value="conditional" /></FormControl>
                                        <FormLabel>조건부 허용</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl><RadioGroupItem value="deny" /></FormControl>
                                        <FormLabel>불가</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}
