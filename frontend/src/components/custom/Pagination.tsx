import { updateSearchParams } from "@/helpers/helpers";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaginationItem = ({ label }: { label: string }) => {
  return (
    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-1 pl-2.5">
      <span>{label === "right" && "Next"}</span>
      {label === "left" ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
      <span>{label === "left" && "Previous"}</span>
    </div>
  );
};

interface Props {
  totalCount: number;
  resPerPage: number;
}

const Pagination = ({ totalCount, resPerPage }: Props) => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const page = (selected + 1).toString();

    searchParams = updateSearchParams(searchParams, "page", page);

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    navigate(newPathname);
  };

  return (
    <div>
      <ReactPaginate
        className="mx-auto flex w-full justify-center items-center my-6"
        breakLabel={<Ellipsis />}
        initialPage={currentPage > 1 ? currentPage - 1 : undefined}
        nextLabel={<PaginationItem label="right" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(totalCount / resPerPage)}
        previousLabel={<PaginationItem label="left" />}
        renderOnZeroPageCount={null}
        containerClassName="flex flex-row items-center gap-1"
        pageLinkClassName="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 w-9"
        activeClassName="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9"
      />
    </div>
  );
};

export default Pagination;
