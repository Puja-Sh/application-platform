import React, { useEffect, useState } from 'react';
import Filters from "../filters/Filters";
import List from "../jobs/List";
import { JobResponse, Response } from '../../def/response';
import Loader from "../Loader/Loader";
import filters from "../filters/Filters";

export type FiltersProps = {
    role: string[];
    experience: number[];
    minPay: number[];
    environment: string[];
}

const Home = () => {
    const [response, setResponse] = useState<Response>({ jdList: [], totalCount: 0 });
    const [jobList, setJobList] = useState<JobResponse[]>([])
    const [params, setParams] = useState<{ limit: number, offset: number }>({ limit: 9, offset: 0 })
    const [showLoader, setShowLoader] = useState(true);
    const [searchValue, setSearchValue] = useState<string>('');
    const [allFilters, setAllFilters] = useState<FiltersProps>({
        environment: [],
        experience: [],
        minPay: [],
        role: []
    })

    const fetchJobsApi = async (limit = 9, offset = 0) => {
        setShowLoader(true)

        try {
            const api = `https://api.weekday.technology/adhoc/getSampleJdJSON`;
            const body = JSON.stringify({ limit, offset });

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
            setJobList(response.jdList)
            setShowLoader(false)
        } catch (e) {
            setShowLoader(false)
            console.log(e)
        }
    }

    useEffect(() => {
        fetchJobsApi(params.limit, params.offset)
    }, [params])

    useEffect(() => {
        if (searchValue.length) {
            const currentJobList = [...jobList];
            const filteredJobs = currentJobList.filter(item => {
                const value = searchValue.toLowerCase();
                const name = item.companyName.toLowerCase();

                return name.includes(value)
            })

            setJobList(filteredJobs);
        } else {
            setJobList(response.jdList)
        }
    }, [searchValue]);


    // console.log("Response", response)

    return (
        <div>
            <Filters setAllFilters={ setAllFilters } setSearchValue={ setSearchValue }/>
            <List jobs={ jobList } fetchJobsApi={ fetchJobsApi } setParams={ setParams }/>

            <Loader show={ showLoader }/>
        </div>
    )
}

export default Home;