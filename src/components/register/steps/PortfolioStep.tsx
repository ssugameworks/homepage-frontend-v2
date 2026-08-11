import { TextField } from "@/ui";
import type { RegisterForm } from "../types";
import type { RegisterFormApi } from "../useRegisterForm";
import { isValidUrl, urlSchema } from "../validation";

type PortfolioStepProps = {
  form: RegisterFormApi;
};

export function PortfolioStep({ form }: PortfolioStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <p className="typo-body1 typo-medium text-primary-950 md:typo-subheading">
        포트폴리오 또는 Github 링크를 남겨주세요
      </p>

      <form.Field name="portfolioUrl" validators={{ onChange: urlSchema }}>
        {(field) => {
          const message = field.state.meta.errors[0]?.message;
          const hasError = field.state.value !== "" && Boolean(message);
          return (
            <TextField
              label="포트폴리오"
              name="portfolioUrl"
              type="url"
              placeholder="내용을 입력해 주세요"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              state={hasError ? "error" : "default"}
              hint={hasError ? message : undefined}
            />
          );
        }}
      </form.Field>

      <form.Field name="githubUrl" validators={{ onChange: urlSchema }}>
        {(field) => {
          const message = field.state.meta.errors[0]?.message;
          const hasError = field.state.value !== "" && Boolean(message);
          return (
            <TextField
              label="GitHub"
              name="githubUrl"
              type="url"
              placeholder="내용을 입력해 주세요"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              state={hasError ? "error" : "default"}
              hint={hasError ? message : undefined}
            />
          );
        }}
      </form.Field>
    </div>
  );
}

export function canProceedPortfolio(form: RegisterForm) {
  const hasPortfolio = isValidUrl(form.portfolioUrl);
  const hasGithub = isValidUrl(form.githubUrl);
  return hasPortfolio || hasGithub;
}
