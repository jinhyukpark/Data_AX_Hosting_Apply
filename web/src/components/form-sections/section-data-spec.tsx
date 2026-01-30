'use client';

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function SectionDataSpec() {
    const { control } = useFormContext();

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">4. 데이터 포맷 및 스키마</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={control}
                        name="dataFormat"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>데이터 포맷</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-zinc-900 border-zinc-700">
                                            <SelectValue placeholder="포맷 선택" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="csv">CSV</SelectItem>
                                        <SelectItem value="json">JSON</SelectItem>
                                        <SelectItem value="parquet">Parquet</SelectItem>
                                        <SelectItem value="pdf">PDF</SelectItem>
                                        <SelectItem value="image">Image</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="totalVolume"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>총 데이터 양 (예상)</FormLabel>
                                <FormControl>
                                    <Input placeholder="예: 100GB" {...field} className="bg-zinc-900 border-zinc-700" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={control}
                    name="updateFrequency"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>업데이트 빈도</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="bg-zinc-900 border-zinc-700">
                                        <SelectValue placeholder="빈도 선택" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="realtime">실시간</SelectItem>
                                    <SelectItem value="daily">매일</SelectItem>
                                    <SelectItem value="weekly">매주</SelectItem>
                                    <SelectItem value="monthly">매월</SelectItem>
                                    <SelectItem value="irregular">비정기</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h3 className="text-xl font-semibold text-white">5. 수집 방법</h3>
                <FormField
                    control={control}
                    name="authMethod"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>인증 방법</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="bg-zinc-900 border-zinc-700">
                                        <SelectValue placeholder="인증 방법 선택" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="apikey">API Key</SelectItem>
                                    <SelectItem value="oauth">OAuth</SelectItem>
                                    <SelectItem value="none">없음 / 공개</SelectItem>
                                    <SelectItem value="whitelist">IP 화이트리스트</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="scrapingNeeded"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-700 p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    스크래핑 필요 여부
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}
