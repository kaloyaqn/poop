import Avatar from "../Avatar";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "../ui/drawer";

export default function ProfileDrawer({data, avatarUrl}) {
    return (
        <Drawer>
        <DrawerTrigger asChild>
          <button variant="outline" className="relative">
            <Avatar
              url={data.avatar_url || avatarUrl}
              size={50}
              hasUpload={false}
            />
            {data.is_beta_tester ? <span className="absolute bottom-[-8px] right-[-4px] bg-white px-1.5 text-xs rounded-full border-[1px] border-[#C8986C]">
            beta
              </span> : <></>}
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="w-full flex justify-center items-center">
                <Avatar
                  url={data.avatar_url || avatarUrl}
                  size={150}
                  hasUpload={false}
                />
              </DrawerTitle>
              <DrawerDescription className="text-base">
                {data.username}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <div className="flex gap-4">
                <div className="w-full p-3 border-[1px] border-gray-400 rounded-lg">
                  <span className="text-sm manrope">Лайнар от</span>
                  <p className="text-lg font-semibold">2024</p>
                </div>
                <div className="w-full p-3 border-[1px] border-gray-400 rounded-lg">
                  <span className="text-sm manrope">Изсирания</span>
                  <p className="text-lg font-semibold">
                    {data.poop_score}
                  </p>
                </div>
                <div className="w-full p-3 border-[1px] border-gray-400 rounded-lg">
                  <span className="text-sm manrope">Прогноза</span>
                  <p className="text-lg font-semibold">
                    {data.poop_score + 3}
                  </p>
                </div>{" "}
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    )
}