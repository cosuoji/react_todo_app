

export default function SearchBar({onEnterDown}){

    const handleKeys = (event) =>{
        if(event.key === "Enter"){
            onEnterDown(event.target.value)
           event.target.value = ""
        }
    }

    return <input onKeyDown={handleKeys} className="searchBar" type="text" placeholder="What needs to be done" required></input>
}