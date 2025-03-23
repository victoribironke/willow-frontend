import { PencilLine } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Profile = () => {
  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Profile</h1>

      <div className="w-full max-w-4xl relative bg-white border shadow rounded-lg flex flex-col gap-6 p-4">
        <div className="flex justify-between items-center w-full">
          <p className="lg:text-lg">Personal information</p>

          <Button variant="outline" className="rounded-full">
            Edit <PencilLine />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 w-full gap-4">
          <div className="grid gap-1">
            <p className="text-muted-foreground">First name</p>

            {/* <p>Oluwatamilore</p> */}
            <Input value="Oluwatamilore" />
          </div>

          {/* MAP THE REMAINING INTO HERE */}
        </div>

        <div className="flex gap-4 items-center w-full">
          <Button
            variant="outline"
            className="border-red text-red hover:text-red"
          >
            Cancel
          </Button>

          <Button className="bg-main hover:bg-main/90">Save changes</Button>
        </div>
      </div>

      <div className="w-full max-w-4xl relative bg-white border shadow rounded-lg flex flex-col gap-6 p-4">
        <div className="flex justify-between items-center w-full">
          <p className="lg:text-lg">Shipping address</p>

          <Button variant="outline" className="rounded-full">
            Edit <PencilLine />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-sm gap-4">
          <div className="grid gap-1">
            <p className="text-muted-foreground">Country</p>

            <p>Nigeria</p>
          </div>

          {/* MAP THE REMAINING INTO HERE */}
        </div>

        <div className="grid gap-1">
          <p className="text-muted-foreground">Line 1</p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
            quidem. Aperiam eaque veniam ea labore perspiciatis facilis quaerat
            repellat alias!
          </p>
        </div>

        {/* MAP THE SECOND LINE INTO HERE */}
      </div>
    </>
  );
};

export default Profile;
