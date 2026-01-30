const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// Load .env manually
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            let value = match[2].trim();
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            if (!process.env[key]) {
                process.env[key] = value;
            }
        }
    });
}

// Fix DATABASE_URL interpolation
if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('[YOUR-PASSWORD]')) {
    const password = process.env['YOUR-PASSWORD'];
    if (password) {
        // Encode password for URL validity
        const encodedPassword = encodeURIComponent(password);
        process.env.DATABASE_URL = process.env.DATABASE_URL.replace('[YOUR-PASSWORD]', encodedPassword);
        console.log('Corrected DATABASE_URL by injecting password.');
    }
}

const prisma = new PrismaClient();

async function main() {
    try {
        // Check if any template exists
        const count = await prisma.ticket.count({
            where: { isTemplate: true }
        });

        if (count > 0) {
            console.log('Templates already exist.');
            return;
        }

        console.log('Creating a seed template...');

        await prisma.ticket.create({
            data: {
                title: '표준 데이터 구축 신청서',
                description: '데이터 AX 플랫폼을 위한 표준 데이터 구축 신청 폼입니다. 데이터셋 구축을 위해 필요한 정보를 입력해주세요.',
                type: 'DATASET',
                isTemplate: true,
                formData: JSON.stringify([
                    {
                        id: 'section-1',
                        type: 'section',
                        title: '기본 정보',
                        children: [
                            { id: 'field-1', type: 'text', label: '프로젝트 명', required: true },
                            { id: 'field-2', type: 'textarea', label: '프로젝트 설명', required: true }
                        ]
                    },
                    {
                        id: 'section-2',
                        type: 'section',
                        title: '데이터 요구사항',
                        children: [
                            { id: 'field-3', type: 'select', label: '데이터 유형', options: ['이미지', '텍스트', '음성'], required: true },
                            { id: 'field-4', type: 'number', label: '예상 데이터 수량', required: true }
                        ]
                    }
                ]),
                // We need a dummy user ID for the template creator? 
                // Schema says userId is required.
                // Let's find an admin user or create one.
                user: {
                    connectOrCreate: {
                        where: { email: 'admin@data-ax.com' },
                        create: {
                            email: 'admin@data-ax.com',
                            password: 'hashedpassword',
                            name: 'Admin User',
                            role: 'ADMIN'
                        }
                    }
                }
            }
        });

        console.log('Seed template created successfully.');
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
