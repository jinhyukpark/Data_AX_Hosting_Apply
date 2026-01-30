import { z } from "zod";

export const formSchema = z.object({
    // 1. 신청 기본정보
    requestType: z.array(z.string()).min(1, "Request type is required"),
    serviceName: z.string().min(1, "Service name is required"),
    shortDescription: z.string().max(200, "Max 200 characters").min(1, "Description is required"),
    detailDescription: z.string().optional(),

    contactCompany: z.string().min(1, "Company name is required"),
    contactName: z.string().min(1, "Contact name is required"),
    contactEmail: z.string().email("Invalid email"),
    contactPhone: z.string().min(1, "Phone number is required"),

    techEmail: z.string().email("Invalid email").optional().or(z.literal("")),
    techPhone: z.string().optional(),

    scheduleOnboarding: z.date().optional(),
    scheduleBeta: z.date().optional(),
    scheduleLaunch: z.date().optional(),

    // 2. 제공 형태 및 목적
    purpose: z.string().min(1, "Purpose is required"),
    finalForm: z.string().min(1, "Final form is required"), // e.g. File Download, API Call...
    scenario: z.string().min(1, "Scenario is required"),

    // 3. 데이터/콘텐츠 출처 및 권리
    sourceType: z.array(z.string()).min(1, "Source type is required"),
    sourceDetail: z.string().min(1, "Source detail is required"),
    copyrightStatus: z.string().min(1, "Copyright status is required"),
    redistribution: z.string().min(1, "Redistribution policy is required"),
    sensitiveInfo: z.string().min(1, "Sensitive info check is required"),
    maskingNeeded: z.boolean().default(false),
    maskingPolicy: z.string().optional(),

    // 4. 데이터 형식 및 스키마
    dataFormat: z.string().min(1, "Data format is required"),
    schemaDescription: z.string().min(1, "Schema definition is required"), // File upload handled separately or text
    totalVolume: z.string().min(1, "Total volume is required"),
    monthlyIncrement: z.string().optional(),
    recordCount: z.string().optional(),
    updateFrequency: z.string().min(1, "Update frequency is required"),
    qualityLevel: z.string().optional(),

    // 5. 수집 방식
    collectionMethod: z.array(z.string()).min(1),
    scrapingNeeded: z.boolean().default(false),
    scrapingTarget: z.string().optional(),
    authMethod: z.string().min(1),
    crawlingWindow: z.string().optional(),

    // 6. 트래픽/사용량
    expectedUsers: z.string().min(1, "Expected users info is required"),
    expectedCalls: z.string().min(1, "Expected calls info is required"),
    latencyGoal: z.string().optional(),
    concurrency: z.string().optional(),
    sla: z.string().optional(),

    // 7. 기능 범위 (Specifics)
    // API
    apiSpec: z.string().optional(),
    endpoints: z.string().optional(),
    rateLimit: z.string().optional(),
    // MCP
    mcpLocation: z.string().optional(),
    mcpTools: z.string().optional(),
    mcpPermissions: z.string().optional(),
    // Agent
    agentPurpose: z.string().optional(),
    agentModel: z.string().optional(),
    agentTools: z.string().optional(),
    agentValidation: z.string().optional(),

    // 8. 호스팅/인프라
    hostingType: z.string().min(1),
    cloudProvider: z.string().min(1),
    region: z.string().min(1),
    networkReqs: z.string().min(1), // VPC, VPN etc combined text for simplicity
    computeReqs: z.string().min(1), // CPU/Mem/GPU
    storageReqs: z.string().optional(),
    dbReqs: z.string().optional(),

    // 9. 보안
    securityLevel: z.string().min(1),
    encryption: z.string().min(1),
    accessControl: z.string().min(1),
    compliance: z.string().optional(),

    // 10. 운영
    operator: z.string().min(1),
    monitoring: z.string().min(1),
    alertChannel: z.string().optional(),

    // 11. 과금
    billingModel: z.string().min(1),
    settlementUnit: z.string().min(1),
    freeTier: z.string().optional(),

    // 12. 약관
    agreeToTerms: z.boolean().refine(val => val === true, "Must agree to terms"),
    agreeToRights: z.boolean().refine(val => val === true, "Must confirm rights"),
    agreeToLiability: z.boolean().refine(val => val === true, "Must agree to liability"),
    agreeToPrivacy: z.boolean().optional(),

    // 13. 첨부 (URLs or Text for now)
    attachments: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
