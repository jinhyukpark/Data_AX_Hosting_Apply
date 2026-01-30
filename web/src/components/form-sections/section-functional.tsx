'use client';

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function SectionFunctionalScope() {
    const { control, watch } = useFormContext();
    const requestTypes = watch("requestType") || [];

    const isApi = requestTypes.includes("API");
    const isMcp = requestTypes.includes("MCP Server");
    const isAgent = requestTypes.includes("Agent");

    if (!isApi && !isMcp && !isAgent) {
        return <div className="text-zinc-500 italic">섹션 1에서 '요청 유형'을 선택하여 기능적 세부 정보를 확인하십시오.</div>;
    }

    return (
        <div className="space-y-8">
            <h3 className="text-xl font-semibold text-white">7. 기능 범위</h3>

            {isApi && (
                <div className="bg-zinc-900/30 border border-zinc-700 rounded-lg p-6 space-y-4">
                    <h4 className="text-lg font-medium text-blue-400">7-1. API 상세</h4>
                    <FormField
                        control={control}
                        name="endpoints"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>주요 엔드포인트 목록</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="/users, /data, /search..." {...field} className="bg-zinc-950 border-zinc-700 min-h-[100px]" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            )}

            {isMcp && (
                <div className="bg-zinc-900/30 border border-zinc-700 rounded-lg p-6 space-y-4">
                    <h4 className="text-lg font-medium text-green-400">7-2. MCP 서버 상세</h4>
                    <div className="space-y-4">
                        <FormField
                            control={control}
                            name="mcpTools"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>도구 목록 (이름 / 스키마)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="weather_lookup: { city: string }..." {...field} className="bg-zinc-950 border-zinc-700 min-h-[100px]" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="mcpLocation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>서버 실행 위치</FormLabel>
                                    <FormControl>
                                        <Input placeholder="클라이언트 호스팅 / Illunex 호스팅" {...field} className="bg-zinc-950 border-zinc-700" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            )}

            {isAgent && (
                <div className="bg-zinc-900/30 border border-zinc-700 rounded-lg p-6 space-y-4">
                    <h4 className="text-lg font-medium text-purple-400">7-3. 에이전트 상세</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                            control={control}
                            name="agentPurpose"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>에이전트 기능 (분석, 요약 등)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="자동화된 리서치 에이전트..." {...field} className="bg-zinc-950 border-zinc-700" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="agentModel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LLM 모델 전략</FormLabel>
                                    <FormControl>
                                        <Input placeholder="GPT-4o + 로컬 임베딩..." {...field} className="bg-zinc-950 border-zinc-700" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
