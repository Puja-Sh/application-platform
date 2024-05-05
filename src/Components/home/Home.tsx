import React, { useEffect, useState } from 'react';
import Filters from "../filters/Filters";
import List from "../jobs/List";
import { JobResponse, Response } from '../../def/response';
import Loader from "../Loader/Loader";
import filters from "../filters/Filters";
import { minBasePay } from "../filters/filtersData";

export type FiltersProps = {
    role: string[];
    experience: number;
    minPay: number;
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
        experience: 0,
        minPay: 0,
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

    useEffect(() => {
        const currentJobList = [...response.jdList];

        let filterApplied = false;
        const filterKey = Object.keys(allFilters);

        for (let i = 0; i < filterKey.length; i++) {
            // @ts-ignore
            if (allFilters[filterKey[i]].length || allFilters[filterKey[i]] >= 0) {
                filterApplied = true;
                break;
            }
        }

        if (!filterApplied) {
            setJobList(currentJobList)
            return;
        }

        const filteredJobs = currentJobList.filter(item => {
            const role = item.jobRole.toLowerCase();
            const minExperience = item.minExp ?? 0;
            const environment = item.location.toLowerCase();
            const minPay = item.minJdSalary ?? 0;
            const maxPay = item.maxJdSalary ?? 0;

            // Filters ---------------
            const _role = allFilters.role ?? '';
            const _minExperience = typeof allFilters.experience === 'object' ? -1 : allFilters.experience;
            const _environment = allFilters.environment ?? '';
            const _minPay = allFilters.minPay ?? 0;

            let roleFlag = true;
            let experienceFlag = true;
            let environmentFlag = true;
            let minBaseFlag = true;

            if (_role.length) {
                roleFlag = _role.includes(role);
            }
            if (_minExperience >= 0) {
                experienceFlag = minExperience <= _minExperience;
            }
            if (_environment.length) {
                const includeHybrid = _environment.includes('hybrid');
                const includeRemote = _environment.includes('remote');

                const isRemote = environment === 'remote';

                environmentFlag = (isRemote && includeRemote) || (!isRemote && (includeHybrid || !_environment.includes('remote') && _environment.includes(environment)));
            }
            if (_minPay >= 10) {
                minBaseFlag = minPay >= _minPay && _minPay <= maxPay
            }

            return roleFlag && experienceFlag && environmentFlag && minBaseFlag;
        });


        setJobList(filteredJobs)
    }, [allFilters])


    // console.log("Response", response)

    return (
        <div>
            <Filters setAllFilters={ setAllFilters } setSearchValue={ setSearchValue }/>
            <List jobs={ jobList } setParams={ setParams }/>

            <Loader show={ showLoader }/>
        </div>
    )
}

export default Home;