import { IconCheckCircle } from "@/assets/icons";

export function CompleteStep() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-7.75 py-10 text-center">
      <span className="relative size-18.5 shrink-0 overflow-clip">
        <IconCheckCircle aria-hidden className="absolute inset-0 block size-full max-w-none" />
      </span>
      <div className="flex w-full flex-col gap-2.75">
        <p className="typo-heading3 text-primary-950">지원이 완료되었어요</p>
        <p className="typo-subheading typo-medium text-gray-600">
          함께하는 순간을 기대하고 있을게요
        </p>
      </div>
    </div>
  );
}
