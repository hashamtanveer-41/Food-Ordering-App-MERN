import {useParams} from "react-router-dom";
import {useSearchRestaurant} from "@/api/RestaurantAPI.tsx";
import SearchResultInfo from "@/components/SearchResultInfo.tsx";
import SearchResultCard from "@/components/SearchResultCard.tsx";
import {useState} from "react";
import SearchBar, {type SearchForm} from "@/components/SearchBar.tsx";
import PaginationSelector from "@/components/PaginationSelector.tsx";

export type SearchState = {
    searchQuery : string;
    page: number;
}
const SearchPage = () => {
    const {city} = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page:1,
    });
    const {results, isLoading} = useSearchRestaurant(searchState, city);

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
                Insert cuisines list here
            </div>
            <div className="flex flex-col gap-5" id='main-content'>
                <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeholder="Search by cuisine or restaurant name" onReset={resetSearch} />
                <SearchResultInfo total={results.pagination.total} city={city} />
                {results.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant} key={restaurant._id} />
                ))}
                <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
            </div>
        </div>
    )
}
export default SearchPage
