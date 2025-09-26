export interface IUser {
  memberId?: number;
  email: string;
  coachId: number;
  accountType: "Coach" | "GymMember";
}
