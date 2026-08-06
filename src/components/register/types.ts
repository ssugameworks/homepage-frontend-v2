export type RegisterForm = {
  name: string;
  phone: string;
  /** 학번 */
  studentId: string;
  /** 학과 */
  major: string;
  grade: string | null;
  parts: string[];
  motivation: string;
  portfolioUrl: string;
  githubUrl: string;
};

export type RegisterStep = 1 | 2 | 3 | 4 | 5 | 6 | "complete";
