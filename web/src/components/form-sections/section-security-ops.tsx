'use client';

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SectionSecurityOps() {
    const { control } = useFormContext();

    return (
        <div className="space-y-8">
            {/* Section 9 */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">9. 보안 및 규정 준수</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={control}
                        name="securityLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>보안 등급</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-zinc-900 border-zinc-700">
                                            <SelectValue placeholder="등급 선택" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="standard">표준</SelectItem>
                                        <SelectItem value="high">높음 (민감 정보)</SelectItem>
                                        <SelectItem value="critical">매우 높음 (금융/의료)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="encryption"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>암호화 요구사항 (저장/전송 시)</FormLabel>
                                <FormControl>
                                    <Input placeholder="TLS 1.3, AES-256..." {...field} className="bg-zinc-900 border-zinc-700" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={control}
                    name="accessControl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>접근 제어 (SSO, RBAC 등)</FormLabel>
                            <FormControl>
                                <Input placeholder="SAML SSO 필요, 관리자/사용자 역할..." {...field} className="bg-zinc-900 border-zinc-700" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Section 10 */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h3 className="text-xl font-semibold text-white">10. 운영 및 지원</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={control}
                        name="operator"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>주 운영 주체</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-zinc-900 border-zinc-700">
                                            <SelectValue placeholder="운영 주체 선택" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="illunex">Illunex 관리</SelectItem>
                                        <SelectItem value="customer">고객 관리</SelectItem>
                                        <SelectItem value="joint">공동 운영</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="monitoring"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>모니터링 범위</FormLabel>
                                <FormControl>
                                    <Input placeholder="가동 시간, 에러율, 지연 시간..." {...field} className="bg-zinc-900 border-zinc-700" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
