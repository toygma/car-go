import RepairLeft from "./partials/left/RepairLeft";
import RepairRight from "./partials/right/RepairRight";

const SectionRepair = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-72 mb-60">
      <div className="flex gap-14 lg:flex-row flex-col">
        <div className="flex-1">
          <RepairLeft />
        </div>
        <div className="flex-1">
          <RepairRight />
        </div>
      </div>
    </div>
  );
};

export default SectionRepair;
