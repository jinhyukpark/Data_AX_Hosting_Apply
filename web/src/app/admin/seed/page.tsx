import { prisma } from "@/lib/db";

export default async function SeedPage() {
    try {
        const existing = await prisma.ticket.findFirst({ where: { isTemplate: true } });
        if (!existing) {
            await prisma.ticket.create({
                data: {
                    title: '표준 데이터 구축 신청서',
                    description: '데이터 AX 플랫폼을 위한 표준 데이터 구축 신청 폼입니다. (Seed)',
                    type: 'DATASET',
                    isTemplate: true,
                    formData: JSON.stringify([
                        {
                            id: 'section-1',
                            type: 'section',
                            title: '기본 정보',
                            children: [
                                { id: 'field-1', type: 'text', label: '프로젝트 명', required: true }
                            ]
                        }
                    ]),
                    user: {
                        connectOrCreate: {
                            where: { email: 'admin@data-ax.com' },
                            create: {
                                email: 'admin@data-ax.com',
                                password: 'hashedpassword',
                                name: 'Admin',
                                role: 'ADMIN'
                            }
                        }
                    }
                }
            });
            return <div className="p-10 text-white font-bold text-2xl">Seed Created Successfully!</div>;
        }

        return <div className="p-10 text-white font-bold text-2xl">Template Already Exists.</div>;
    } catch (e: any) {
        return <div className="p-10 text-red-500">Error: {e.message}</div>;
    }
}
