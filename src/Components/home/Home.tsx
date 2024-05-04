import React, { useEffect, useState } from 'react';

const Home = () => {
    const [response, setResponse] = useState({});
    const [apiBody, setApiBody] = useState({limit: 10, offset: 0})

    const fetchJobs = async () => {
        try {
            const api = `https://api.weekday.technology/adhoc/getSampleJdJSON`;
            const body = JSON.stringify(apiBody);

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body
            };

            const data = await fetch(api, requestOptions);
            const response = await data.json();

            setResponse(response)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(()=> {
        fetchJobs()
    },[])

    console.log("Response", response)

    return (
        <></>
    )
}

export default Home;