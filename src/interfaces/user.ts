export interface IUser {
  sportType: "Calisthenics" | "Body building" | "Powerlifting";
  memberId?: number;
  email: string;
  coachId: number;
  accountType: "Coach" | "GymMember";
}
