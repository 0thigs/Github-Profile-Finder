import './card.css'
import React from "react";
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs'

export default function Card() {
    const baseUrl = "https://api.github.com/users/"
    const [user, setUser] = useState("")
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [img, setImg] = useState("")
    const [repos, setRepos] = useState("")
    const [follows, setFollows] = useState("")
    const [followings, setFollowings] = useState("")
    const [link, setLink] = useState("")

    function getUser() {
        let input = document.getElementById("input").value
        setUser(input)
    }
    fetch(baseUrl+user, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer '+process.env.REACT_APP_TOKEN
        })
    })
    .then(Response => {
        return Response.json()
    })
    .then(data => {
        setName(data.name)
        setBio(data.bio)
        setImg(data.avatar_url)
        setRepos(data.public_repos)
        setFollows(data.followers)
        setFollowings(data.following)
        setLink(data.html_url)
    })

    return (

    <div className="container">
        <div className="search">
            <input type="text" placeholder='Search a Github Username' id='input'/> 
            <button onClick={getUser} > <BsSearch /> </button>
        </div>
        
        <div className="card">    
            <div className="about">
                <div className="image">
                    <img src={img} alt="img" />
                </div>
                <div className="profile_information">
                    <b><p className='name pi'>{name}</p></b>
                    <a href={link} target="_blank"><p className="profile_link pi">@{user}</p></a>
                    <p className="bio pi">{bio}</p>
                </div>
            </div>
            <div className="profile_settings">
                <div className="adjustSize">
                    <div className="profile_info">
                        <p className="repos">Repos</p>
                        <p className="follows">Follows</p>
                        <p className="following">Following</p>
                    </div>
                    <div className="profile_numbers">
                        <p className="repos_num">{repos}</p>
                        <p className="follows_num">{follows}</p>
                        <p className="following_num">{followings}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}