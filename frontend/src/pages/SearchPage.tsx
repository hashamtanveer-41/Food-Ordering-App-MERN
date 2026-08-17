import {useParams} from "react-router-dom";
import {useSearchRestaurant} from "@/api/RestaurantAPI.tsx";
import SearchResultInfo from "@/components/SearchResultInfo.tsx";
import SearchResultCard from "@/components/SearchResultCard.tsx";
import {useState} from "react";
import SearchBar, {type SearchForm} from "@/components/SearchBar.tsx";
import PaginationSelector from "@/components/PaginationSelector.tsx";
import CuisineFilter from "@/components/CuisineFilter.tsx";
import SortOptionDropdownMenu from "@/components/SortOptionDropdownMenu.tsx";

export type SearchState = {
    searchQuery : string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;
}
const SearchPage = () => {
    const {city} = useParams();
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page:1,
        selectedCuisines: [],
        sortOption: "bestMatch",
    });
    const {results, isLoading} = useSearchRestaurant(searchState, city);
    const setSortOption = (sortOption: string)=>{
        setSearchState((prevState)=>({
            ...prevState,
            sortOption,
            page:1,
        }))
    }
    const setSelectedCuisines = (selectedCuisines: string[])=>{
        setSearchState((prevState)=>({
            ...prevState,
            selectedCuisines,
            page:1,
        }))
    }

    const resetSearch = ()=>{
        setSearchState((prevState)=>({
            ...prevState,
            searchQuery: "",
            page:1
        }))
    }
    if (isLoading){
        return <span>Loading...</span>
    }
    if ((!results?.data) || !city){
        return <span>No results found</span>
    }

    const setPage = (page:number) =>{
        setSearchState((prevState)=>({
            ...prevState,
            page,
        }))
    }
    const setSearchQuery= (searchFormData: SearchForm)=>{
        setSearchState((prevState)=>({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page:1
        }))
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="" id='cuisines-list'>
                <CuisineFilter onChange={setSelectedCuisines} selectedCuisine={searchState.selectedCuisines} isExpanded={isExpanded}
                               onExpandedClick={()=> setIsExpanded((prev)=>!prev)}
                />
            </div>
            <div className="flex flex-col gap-5" id='main-content'>
                <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeholder="Search by cuisine or restaurant name" onReset={resetSearch} />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultInfo total={results.pagination.total} city={city} />
                    <SortOptionDropdownMenu onChange={(value)=>setSortOption(value)} sortOption={searchState.sortOption} />
                </div>
                {results.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant} key={restaurant._id} />
                ))}
                <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
            </div>
        </div>
    )
}
export default SearchPage
