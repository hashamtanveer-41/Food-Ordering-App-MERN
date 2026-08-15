import {useParams} from "react-router-dom";
import {useSearchRestaurant} from "@/api/RestaurantAPI.tsx";
import SearchResultInfo from "@/components/SearchResultInfo.tsx";
import SearchResultCard from "@/components/SearchResultCard.tsx";
import {useState} from "react";
import SearchBar, {type SearchForm} from "@/components/SearchBar.tsx";

export type SearchState = {
    searchQuery : string;
}
const SearchPage = () => {
    const {city} = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
    });
    const {results, isLoading} = useSearchRestaurant(searchState, city);

    const resetSearch = ()=>{
        setSearchState((prevState)=>({
            ...prevState,
            searchQuery: "",
        }))
    }
    if (isLoading){
        return <span>Loading...</span>
    }
    if ((!results?.data) || !city){
        return <span>No results found</span>
    }
    const setSearchQuery= (searchFormData: SearchForm)=>{
        setSearchState((prevState)=>({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
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
            </div>
        </div>
    )
}
export default SearchPage
