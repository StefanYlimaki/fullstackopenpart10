import { Searchbar } from 'react-native-paper'

const Search = ({ search, setSearch }) => {
    return(
        <Searchbar
        placeholder="Search"
        onChangeText={query => setSearch(query)}
        value={search}
    /> 
    )
}

export default Search