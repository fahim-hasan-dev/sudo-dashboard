import SavingsGroupsList from "@/components/page/finance/savings-groups/SavingsGroupsList";
import SavingsGroupDetails from "@/components/page/finance/savings-groups/SavingsGroupDetails";

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
    return <SavingsGroupDetails groupId={groupId} />;
  }

  return <SavingsGroupsList />;
};

export default SavingsGroupsRoutePage;
