import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EditProfileDialog from "./EditProfileDialog";
import { Currency, User } from "@prisma/client";

import DeleteProfileDialog from "./DeleteProfileDialog";

export default async function ProfileUserInfoSection({
  user,
}: {
  user: User & { currency: Currency | null };
}) {
  return (
    <section className="max-w-7xl mx-auto container space-y-3">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-left">
        {/* Left */}
        <div className="flex-shrink-0">
          <Avatar className="w-48 h-48">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AvatarImage
                    src={user?.profilePic}
                    width={500}
                    height={500}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    This is an auto generated avatar, generated using your name.
                  </p>
                  <p>This will be changed, when you change your name.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <AvatarFallback className="text-4xl">
              {user?.name?.toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
        {/* right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          <div>
            <h2 className="text-xl font-semibold">Name</h2>
            <p className="text-gray-700">{user.name ?? "N/A"}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="text-gray-700">{user.email ?? "N/A"}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Gender</h2>
            <p className="text-gray-700">
              {user.gender === "male" ? "Male" : "Female"}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Currency</h2>
            <p className="text-gray-700">
              {user.currency
                ? `${user.currency.name} (${user.currency.symbol})`
                : "N/A"}
            </p>
          </div>
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
            <EditProfileDialog user={user} />
            <DeleteProfileDialog />
          </div>
        </div>
      </div>
    </section>
  );
}
