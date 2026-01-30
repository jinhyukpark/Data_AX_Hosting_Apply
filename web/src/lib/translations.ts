export type Language = 'ko' | 'en';

export const translations = {
    ko: {
        common: {
            signOut: "로그아웃",
            adminWorkspace: "관리자 워크스페이스",
        },
        nav: {
            dashboard: "대시보드",
            allTickets: "전체 티켓",
            formTemplates: "신청 폼 템플릿",
            settings: "설정",
        },
        dashboard: {
            title: "대시보드 개요",
            subtitle: "환영합니다. 최근 활동 현황을 확인하세요.",
            totalRequests: "전체 요청",
            pending: "검토 대기중",
            active: "진행중",
            completed: "완료됨",
            recentRequests: "최근 요청 내역",
            viewAll: "전체 보기",
            noRequests: "요청 내역이 없습니다.",
            unknownUser: "알 수 없는 사용자",
            view: "보기",
        },
        status: {
            PENDING: "대기중",
            IN_PROGRESS: "진행중",
            DONE: "완료",
            REJECTED: "거절됨",
        },
    },
    en: {
        common: {
            signOut: "Sign Out",
            adminWorkspace: "Admin Workspace",
        },
        nav: {
            dashboard: "Dashboard",
            allTickets: "All Tickets",
            formTemplates: "Form Templates",
            settings: "Settings",
        },
        dashboard: {
            title: "Dashboard Overview",
            subtitle: "Welcome. Check your recent activity.",
            totalRequests: "Total Requests",
            pending: "Pending Review",
            active: "In Progress",
            completed: "Completed",
            recentRequests: "Recent Requests",
            viewAll: "View All",
            noRequests: "No requests found.",
            unknownUser: "Unknown User",
            view: "View",
        },
        status: {
            PENDING: "PENDING",
            IN_PROGRESS: "IN PROGRESS",
            DONE: "DONE",
            REJECTED: "REJECTED",
        },
    },
};
