import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";

const MobileNav = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-orange-500" />
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    <span>Welcome to HashEats.com!</span>
                </SheetTitle>
                <Separator />
                <SheetDescription className="flex" >
                    <Button className="flex-1 font-bold bg-orange-500">Log In</Button>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}
export default MobileNav
