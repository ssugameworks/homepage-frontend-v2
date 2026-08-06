import iconCheckCircle from "@/assets/icons/register/icon-check-circle.svg";

export function CompleteStep() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[1.9375rem] py-10 text-center">
      <span className="relative size-[4.625rem] shrink-0 overflow-clip">
        <img
          src={iconCheckCircle}
          alt=""
          className="absolute inset-0 block size-full max-w-none"
        />
      </span>
      <div className="flex w-full flex-col gap-[0.6875rem]">
        <p className="text-[length:var(--font-size-heading3)] font-bold leading-[1.5] text-primary-950">
          지원이 완료되었어요
        </p>
        <p className="text-[length:var(--font-size-subheading)] font-medium leading-[1.5] text-gray-600">
          함께하는 순간을 기대하고 있을게요
        </p>
      </div>
    </div>
  );
}
