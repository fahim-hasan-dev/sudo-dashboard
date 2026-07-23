import UsersTable from "@/components/page/users/UsersTable";
import UserDetails from "@/components/page/users/userDetails/UserDetails";
import { IUser } from "@/types/user";
import { myFetch } from "@/utils/myFetch";

interface SearchParamsProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const UsersPage = async ({ searchParams }: SearchParamsProps) => {
  const resolvedSearchParams = await searchParams;
  const userId = typeof resolvedSearchParams?.userId === "string" ? resolvedSearchParams.userId : undefined;

  if (userId) {
    const res = await myFetch(`/user/${userId}`);
    const user = res?.data;
    return <UserDetails userId={userId} user={user as IUser} />;
  }

  const page = typeof resolvedSearchParams?.page === "string" ? resolvedSearchParams.page : "1";
  const limit = typeof resolvedSearchParams?.limit === "string" ? resolvedSearchParams.limit : "10";
  const searchTerm = typeof resolvedSearchParams?.searchTerm === "string" ? resolvedSearchParams.searchTerm : "";
  const status = typeof resolvedSearchParams?.status === "string" ? resolvedSearchParams.status : "";

  // Construct query string
  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", String(page));
  if (limit) queryParams.set("limit", String(limit));
  if (searchTerm.trim()) queryParams.set("searchTerm", searchTerm.trim());
  if (status) queryParams.set("status", String(status));

  // Fetch live lists
  const usersRes = await myFetch(`/user?${queryParams.toString()}`);
  const users = usersRes?.data?.users || [];
  const meta = usersRes?.data?.meta || { page: 1, totalPage: 1, total: 0 };
  const totalUsers = usersRes?.data?.staticData?.totalUsers || 0;

  // Fetch active and suspended counts
  const activeRes = await myFetch("/user?status=active&limit=1");
  const activeUsersCount = activeRes?.data?.meta?.total || 0;

  const suspendedRes = await myFetch("/user?status=restricted&limit=1");
  const suspendedUsersCount = suspendedRes?.data?.meta?.total || 0;

  return (
    <>
      <UsersTable
        users={users as IUser[]}
        meta={meta}
        totalUsers={totalUsers}
        activeUsers={activeUsersCount}
        suspendedUsers={suspendedUsersCount}
      />
    </>
  );
};

export default UsersPage;
