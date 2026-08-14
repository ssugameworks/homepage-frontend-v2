export type TeamMemberGroup = {
  label: string;
  members: string[];
};

export type TeamCardProps = {
  teamName: string;
  description: string[];
  memberGroups: TeamMemberGroup[];
  className?: string;
};
