import SupportTable from "@/components/page/support/SupportTable";
import { demoSupportTicketsData } from "@/demoData/support";

const SupportPage = async ({ searchParams }) => {
  const { priority, status } = await searchParams;

  const tickets = demoSupportTicketsData?.filter(
    (item) =>
      (!priority || item?.priority === priority) &&
      (!status || item?.status === status)
  );

  return (
    <SupportTable
      tickets={tickets as never[]}
      meta={{ page: 1, totalPage: 1, total: 12 }}
    />
  );
};

export default SupportPage;
