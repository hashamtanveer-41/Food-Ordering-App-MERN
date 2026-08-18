import type {MenuItem as MenutItemType} from "../types.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
type Props = {
    menuItem: MenutItemType;
    addToCart: ()=>void;
}
const MenuItem = ({menuItem, addToCart}:Props) => {
    return (
        <Card className="cursor-pointer" onClick={addToCart}>
            <CardHeader>
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="font-bold">Rs {menuItem.price}</CardContent>
        </Card>
    )
}
export default MenuItem
