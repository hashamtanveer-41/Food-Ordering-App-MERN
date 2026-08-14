import {useParams} from "react-router-dom";
import {useSearchRestaurant} from "@/api/RestaurantAPI.tsx";
import SearchResultInfo from "@/components/SearchResultInfo.tsx";
import SearchResultCard from "@/components/SearchResultCard.tsx";

const SearchPage = () => {
    const {city} = useParams();
    const {results, isLoading} = useSearchRestaurant(city);
    if (isLoading){
        return <span>Loading...</span>
    }
    if (!results.data || !city){
        return <span>No results found</span>
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="" id='cuisines-list'>
                Insert cuisines list here
            </div>
            <div className="flex flex-col gap-5" id='main-content'>
                <SearchResultInfo total={results.pagination.total} city={city} />
                {results.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant} key={restaurant._id} />
                ))}
            </div>
        </div>
    )
}
export default SearchPage
