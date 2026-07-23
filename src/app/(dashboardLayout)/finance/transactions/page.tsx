import Transactions from "@/components/page/finance/transactions/Transactions";
import { myFetch } from "@/utils/myFetch";

interface SearchParamsProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const TransactionsRoutePage = async ({ searchParams }: SearchParamsProps) => {
  const resolvedSearchParams = await searchParams;
  const page = typeof resolvedSearchParams?.page === "string" ? resolvedSearchParams.page : "1";
  const limit = typeof resolvedSearchParams?.limit === "string" ? resolvedSearchParams.limit : "20";
  const searchTerm = typeof resolvedSearchParams?.searchTerm === "string" ? resolvedSearchParams.searchTerm : "";

  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page);
  if (limit) queryParams.set("limit", limit);
  if (searchTerm.trim()) queryParams.set("searchTerm", searchTerm.trim());

  const res = await myFetch(`/contribution?${queryParams.toString()}`);
  const contributions = res?.data?.contributions || [];
  const meta = res?.data?.meta || { page: 1, totalPage: 1, total: 0 };
  const stats = res?.data?.stats || { totalVolume: 0, completedCount: 0, totalCount: 0 };

  return <Transactions initialContributions={contributions} meta={meta} initialStats={stats} />;
};

export default TransactionsRoutePage;
