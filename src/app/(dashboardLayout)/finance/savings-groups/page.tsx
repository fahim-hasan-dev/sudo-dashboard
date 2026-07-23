import SavingsGroupsList from "@/components/page/finance/savings-groups/SavingsGroupsList";
import SavingsGroupDetails from "@/components/page/finance/savings-groups/SavingsGroupDetails";
import { myFetch } from "@/utils/myFetch";

interface SearchParamsProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const SavingsGroupsRoutePage = async ({ searchParams }: SearchParamsProps) => {
  const resolvedSearchParams = await searchParams;
  const groupId =
    typeof resolvedSearchParams?.groupId === "string"
      ? resolvedSearchParams.groupId
      : undefined;

  if (groupId) {
    const res = await myFetch(`/group/${groupId}`);
    const details = res?.data;
    return <SavingsGroupDetails groupId={groupId} initialDetails={details} />;
  }

  const page = typeof resolvedSearchParams?.page === "string" ? resolvedSearchParams.page : "1";
  const limit = typeof resolvedSearchParams?.limit === "string" ? resolvedSearchParams.limit : "20";
  const searchTerm = typeof resolvedSearchParams?.searchTerm === "string" ? resolvedSearchParams.searchTerm : "";
  const status = typeof resolvedSearchParams?.status === "string" ? resolvedSearchParams.status : "";

  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page);
  if (limit) queryParams.set("limit", limit);
  if (searchTerm.trim()) queryParams.set("searchTerm", searchTerm.trim());
  if (status) queryParams.set("status", status);

  const res = await myFetch(`/group?${queryParams.toString()}`);
  const groupsData = res?.data?.data || [];
  const meta = res?.data?.meta || { page: 1, totalPage: 1, total: 0 };

  return <SavingsGroupsList initialGroups={groupsData} meta={meta} />;
};

export default SavingsGroupsRoutePage;
