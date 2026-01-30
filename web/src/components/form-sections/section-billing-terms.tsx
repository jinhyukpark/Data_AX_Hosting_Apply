'use client';

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export function SectionBillingMisc() {
    const { control } = useFormContext();

    return (
        <div className="space-y-8">
            {/* Section 11 */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">11. 과금 및 정책</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={control}
                        name="billingModel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>과금 모델</FormLabel>
                                <FormControl>
                                    <Input placeholder="구독 / 종량제" {...field} className="bg-zinc-900 border-zinc-700" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="settlementUnit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>정산 단위</FormLabel>
                                <FormControl>
                                    <Input placeholder="호출당 / 사용자당 / 시간당" {...field} className="bg-zinc-900 border-zinc-700" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            {/* Section 12 */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h3 className="text-xl font-semibold text-white">12. 약관 및 동의</h3>
                <div className="space-y-2 bg-zinc-900/30 p-4 rounded-lg border border-zinc-800">
                    <FormField
                        control={control}
                        name="agreeToTerms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Illunex 호스팅 서비스 약관에 동의합니다. (필수)</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="agreeToRights"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>데이터 출처 권한 및 소유권을 확인했습니다. (필수)</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="agreeToLiability"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>불법 스크래핑 또는 권리 침해에 대한 책임을 수락합니다. (필수)</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="agreeToPrivacy"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>개인정보 처리 방침에 동의합니다. (해당 시)</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            {/* Section 13 */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h3 className="text-xl font-semibold text-white">13. 첨부 파일</h3>
                <FormField
                    control={control}
                    name="attachments"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>업로드된 파일 / 문서 링크</FormLabel>
                            <FormControl>
                                <Textarea placeholder="https://drive.google.com/..." {...field} className="bg-zinc-900 border-zinc-700" />
                            </FormControl>
                            <FormDescription>API 명세, 샘플 데이터, 보안 문서 등에 대한 링크</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}
