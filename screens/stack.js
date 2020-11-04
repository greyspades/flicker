const { default: Axios } = require("axios")
const { FlatGrid } = require("react-native-super-grid")

const Movie=()=>{
    const [movie,setmovie]=useState({
        popular:[],
        currentpage:1
    })

    Axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${current}`)
    .then((res)=>{
        setmovies({
            popular:res.data.response
        })
    })

    const getMore=()=>{
        setmovies({
            page:movies.page+1
        })
        Axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=${movies.page}`)
        .then((res=>{
            setmovies([
                ...popular,{popular:res.data.response}
            ])
        }))
    }
    return(
        <View>
             <FlatGrid
             keyExtractor={(item)=>item.id}
             itemDimension={80}
             spacing={10}
             data={movies.popular}
             style={styles.grid}
             renderItem={({ item })=>(
                <Text></Text>
             )}
             onEndReached={getMore} />
        </View>
    )
}