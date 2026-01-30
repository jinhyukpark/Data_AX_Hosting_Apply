'use client';

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function SectionTrafficInfra() {
    const { control } = useFormContext();

    return (
        <div className="space-y-8">
            {/* Section 6 */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">6. 트래픽 및 성능</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={control}
                        name="expectedUsers"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>예상 사용자 (월간)</FormLabel>
                                <FormControl>
                                    <Input placeholder="예: 10,000 MAU" {...field} className="bg-zinc-900 border-zinc-700" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="expectedCalls"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>예상 호출 / 실행 수</FormLabel>
                                <FormControl>
                                    <Input placeholder="예: 100 RPS 또는 5000 실행/일" {...field} className="bg-zinc-900 border-zinc-700" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            {/* Section 8 */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h3 className="text-xl font-semibold text-white">8. 호스팅 및 인프라</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={control}
                        name="hostingType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>호스팅 모델</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-zinc-900 border-zinc-700">
                                            <SelectValue placeholder="호스팅 모델 선택" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="illunex_hosted">Illunex 호스팅</SelectItem>
                                        <SelectItem value="customer_vpc">고객 VPC</SelectItem>
                                        <SelectItem value="onprem">온프레미스</SelectItem>
                                        <SelectItem value="hybrid">하이브리드</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="cloudProvider"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>클라우드 제공자</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-zinc-900 border-zinc-700">
                                            <SelectValue placeholder="클라우드 선택" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="aws">AWS</SelectItem>
                                        <SelectItem value="azure">Azure</SelectItem>
                                        <SelectItem value="gcp">GCP</SelectItem>
                                        <SelectItem value="ncp">네이버 클라우드</SelectItem>
                                        <SelectItem value="other">기타</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={control}
                        name="region"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>리전</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. ap-northeast-2" {...field} className="bg-zinc-900 border-zinc-700" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="computeReqs"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>컴퓨팅 요구사항 (CPU/RAM/GPU)</FormLabel>
                                <FormControl>
                                    <Input placeholder="예: 4vCPU, 16GB RAM, T4 GPU" {...field} className="bg-zinc-900 border-zinc-700" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={control}
                    name="networkReqs"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>네트워크 요구사항 (VPC, VPN, 방화벽)</FormLabel>
                            <FormControl>
                                <Input placeholder="예: VPC 피어링 필요, 특정 IP 화이트리스트" {...field} className="bg-zinc-900 border-zinc-700" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}
