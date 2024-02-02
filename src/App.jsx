import React from "react"
import {Navbar} from "./components/Navbar"
import{Meme} from "./components/Meme"

export function App(){
    return(
        <div className="App-layout">
            <Navbar />
            <Meme />
        </div>
    )
}