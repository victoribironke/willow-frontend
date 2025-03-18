import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const Profile = () => {
  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Profile</h1>

      <p className="text-[#696969]">Manage your account information</p>

      <Separator />

      <p>Profile picture</p>

      <div className="flex items-center justify-start gap-6">
        <Avatar className="size-20 rounded-full">
          <AvatarImage
            src="https://github.com/victoribironke.png"
            alt="Image"
          />
          <AvatarFallback className="rounded-lg">DP</AvatarFallback>
        </Avatar>

        <Button className="bg-main hover:bg-main/90">Change</Button>
      </div>

      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Orion & Sons"
            required
            // value={fullName}
            // onChange={(e) => setFullName(e.target.value)}
            className="bg-white"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className="bg-white"

            // value={email}
          />
        </div>

        <div className="grid gap-2 col-span-1 md:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Leading provider of eco-friendly products."
            className="bg-white"
            rows={5}
          />
        </div>
      </section>

      <Button className="bg-main hover:bg-main/90 w-fit">Save changes</Button>
    </>
  );
};

export default Profile;
