import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    onChange: (value: string) => void;
    sortOption: string;
}
const SORT_OPTIONS = [
    {value: 'bestMatch', label: 'Best Match'},
    {value: 'deliveryPrice', label: 'Delivery Price'},
    {value: 'estimatedDeliveryTime', label: 'Estimated Delivery Time'},
]
const SortOptionDropdownMenu = ({sortOption, onChange}:Props) => {
    const selectedSortLabel = SORT_OPTIONS.find((option) => option.value === sortOption)?.label || SORT_OPTIONS[0].label;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Button variant='outline' className='w-full'>
                    Sort by: {selectedSortLabel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {SORT_OPTIONS.map((option) => (
                   <DropdownMenuItem className="cursor-pointer" key={option.value} onClick={() => onChange(option.value)}>
                       {option.label}
                   </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default SortOptionDropdownMenu
