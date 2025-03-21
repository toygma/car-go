import Loading from "@/components/custom/Loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GET_ALL_FAQS } from "@/graphql/queries/faq.queries";
import { formatDate } from "@/helpers/helpers";
import { useQuery } from "@apollo/client";
import { IFaq } from "shared/src/interfaces";
import { FaqDialogue } from "./partials/FaqDialog";

const ListFaqs = () => {
  const { data, loading, refetch } = useQuery(GET_ALL_FAQS);

  const faqs = data?.getAllFaqs;

  if (loading) {
    return <Loading size={60} fullScreen={true} />;
  }

  return (
    <div className="relative">
      <Card>
        <CardHeader className="flex flex-col md:flex-row mb-4">
          <div className="flex-1">
            <CardTitle>FAQs</CardTitle>
            <CardDescription>View your FAQs details</CardDescription>
          </div>
          <div className="relative ml-auto flex-1 md:grow-0">
            <FaqDialogue refetchFaqs={refetch} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  ID
                </TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead>Car</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs?.map((faq: IFaq) => (
                <TableRow key={faq?.id}>
                  <TableCell className="hidden sm:table-cell">
                    {faq?.id}
                  </TableCell>
                  <TableCell>{faq?.question}</TableCell>
                  <TableCell>{faq?.answer}</TableCell>
                  <TableCell>{formatDate(faq?.createdAt)}</TableCell>
                  <TableCell>
                    <FaqDialogue refetchFaqs={refetch} updateFaqData={faq} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListFaqs;
