import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ReviewDialog } from "./ReviewDialog";

interface Props {
  carId:string
}

const CarReviews = ({carId}:Props) => {
  return (
    <div>
      <Card>
        <CardHeader className="bg-muted/25">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 mb-5 text-2xl">
              <p className="text-2xl font-bold">Your Review</p>
              <ReviewDialog buttonText={"Update Your Review"}/>
            </CardTitle>
            <CardDescription>
              <div className="px-2">
                <div className="flex my-5">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="ksdf" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="ms-4">
                    <h3 className="text-xl font-black">John Doe</h3>
                    <p className="mb-3">Last Updated: 2023-01-01</p>
                    {/* Star Rating Component */}
                    <p className="mt-4 text-md font-semibold">Nice</p>
                  </div>
                </div>
              </div>
            </CardDescription>
            <CardTitle className="group flex items-center gap-2 mb-5 text-xl">
              <Alert
                variant="destructive"
                className="flex justify-between items-center w-full"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <div>
                    <AlertTitle>You have not given any review</AlertTitle>
                    <AlertDescription>
                      You can give your review by clicking on the button below
                    </AlertDescription>
                  </div>
                </div>
                <ReviewDialog buttonText="Post Your Review" carId={carId}/>
              </Alert>
            </CardTitle>
          </div>
        </CardHeader>
      </Card>

      <Card className="mt-10">
        <CardHeader className="bg-muted/25">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 mb-5 text-2xl">
              <p className="text-2xl font-bold mt-5">2 Reviews</p>
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              <div className="px-8">
                <div>
                  <DropdownMenuSeparator />
                  <div className="flex my-5">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="sdf" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="ms-4">
                      <h3 className="text-xl font-black">Johne Doe</h3>
                      <p className="mb-3">Last Updated: 2023-01-02</p>
                      {/* Star Ratings Component */}
                      <p className="mt-4 text-md font-semibold">Nice</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default CarReviews;