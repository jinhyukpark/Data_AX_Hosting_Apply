import { TemplateForm } from "./form";

export default function NewTemplatePage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white">새 템플릿 생성</h1>
                <p className="text-zinc-400">새로운 신청 폼 템플릿을 설계합니다.</p>
            </div>

            <TemplateForm />
        </div>
    );
}
