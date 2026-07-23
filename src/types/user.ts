export interface IUserGroup {
  _id?: string;
  name?: string;
  status?: string;
  targetPoolAmount?: number;
  contributionAmount?: number;
  targetedMembers?: number;
  totalCycles?: number;
  startDate?: string;
  paymentFrequency?: string;
  visibility?: string;
  admin?: {
    _id?: string;
    fullName?: string;
    email?: string;
  } | string;
  members?: string[];
  rotationSchedule?: Array<{
    periodNumber: number;
    cycleNumber: number;
    receiverId: string;
    payoutDate: string;
    status: string;
  }>;
  createdAt?: string;
}

export interface IUserTransaction {
  _id?: string;
  amount?: number;
  commissionAmount?: number;
  transferAmount?: number;
  paymentDate?: string | Date;
  createdAt?: string | Date;
  transactionId?: string;
  status?: string;
  periodNumber?: number;
  senderId?: {
    _id?: string;
    fullName?: string;
    email?: string;
    image?: string;
  } | string;
  receiverId?: {
    _id?: string;
    fullName?: string;
    email?: string;
    image?: string;
  } | string;
  groupId?: {
    _id?: string;
    name?: string;
    targetPoolAmount?: number;
    paymentFrequency?: string;
  };
}

export interface IUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  kycStatus?: "unverified" | "pending" | "approved" | "rejected";
  idDocumentFront?: string;
  idDocumentBack?: string;
  faceImage?: string;
  kycSessionId?: string;
  stripeAccountId?: string;
  stripeConnected?: boolean;
  status?: "active" | "restricted" | "deleted";
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
  stats?: {
    totalContribution: number;
    totalSavings: number;
    totalGroupsJoined: number;
  };
  groups?: IUserGroup[];
  transactions?: IUserTransaction[];
  gender?: string;
  email: string;
  role: string;
  photo?: string;
  birthday?: string;
  bio?: string;
  location?: string;
  isVacation?: boolean;
  isVerified?: boolean;
  isBlocked?: boolean;
  isDeleted?: boolean;
}
