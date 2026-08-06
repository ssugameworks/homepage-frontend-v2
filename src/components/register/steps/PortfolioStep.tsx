import type { RegisterForm } from "../types";
import { isValidUrl } from "../validation";
import { TextField } from "@/ui";

type PortfolioStepProps = {
  form: RegisterForm;
  onChange: (patch: Partial<RegisterForm>) => void;
};

export function PortfolioStep({ form, onChange }: PortfolioStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <p className="typo-body1 typo-medium text-primary-950 md:typo-subheading">
        포트폴리오 또는 Github 링크를 남겨주세요
      </p>

      <TextField
        label="포트폴리오"
        name="portfolioUrl"
        type="url"
        placeholder="내용을 입력해 주세요"
        value={form.portfolioUrl}
        onChange={(e) => onChange({ portfolioUrl: e.target.value })}
        state={
          form.portfolioUrl && !isValidUrl(form.portfolioUrl) ? "error" : "default"
        }
        hint={
          form.portfolioUrl && !isValidUrl(form.portfolioUrl)
            ? "올바른 URL을 입력해주세요"
            : undefined
        }
      />

      <TextField
        label="GitHub"
        name="githubUrl"
        type="url"
        placeholder="내용을 입력해 주세요"
        value={form.githubUrl}
        onChange={(e) => onChange({ githubUrl: e.target.value })}
        state={
          form.githubUrl && !isValidUrl(form.githubUrl) ? "error" : "default"
        }
        hint={
          form.githubUrl && !isValidUrl(form.githubUrl)
            ? "올바른 URL을 입력해주세요"
            : undefined
        }
      />
    </div>
  );
}

export function canProceedPortfolio(form: RegisterForm) {
  const hasPortfolio = isValidUrl(form.portfolioUrl);
  const hasGithub = isValidUrl(form.githubUrl);
  return hasPortfolio || hasGithub;
}
