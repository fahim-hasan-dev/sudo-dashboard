import UsersTable from "@/components/page/users/UsersTable";
import UserDetails from "@/components/page/users/userDetails/UserDetails";
import { demoUsersData } from "@/demoData/users";
import { IUser } from "@/types/user";

interface SearchParamsProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const UsersPage = async ({ searchParams }: SearchParamsProps) => {
  const resolvedSearchParams = await searchParams;
  const userId = typeof resolvedSearchParams?.userId === "string" ? resolvedSearchParams.userId : undefined;

  if (userId) {
    const user = demoUsersData.find((u) => u._id === userId);
    return <UserDetails userId={userId} user={user as IUser} />;
  }

  return (
    <>
      <UsersTable
        users={demoUsersData as IUser[]}
        meta={{ page: 1, totalPage: 1, total: 12 }}
      />
    </>
  );
};

export default UsersPage;
