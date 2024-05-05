import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { JobResponse } from "../../def/response";
import styled from "styled-components";
import Card from "./Card";

type IProps = {
    jobs: JobResponse[];
    fetchJobsApi: (limit: number, offset: number) => void;
    setParams: Dispatch<SetStateAction<{ limit: number, offset: number }>>
}

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const List = ({ jobs, fetchJobsApi, setParams }: IProps) => {

    const handleScroll = useCallback(() => {

        const { scrollTop, clientHeight, scrollHeight } = document.documentElement

        if (Math.trunc(scrollTop + clientHeight) === scrollHeight) {
            setTimeout(() => {
                setParams(prev => ({ limit: prev.limit + 9, offset: prev.offset }))
            },1000)
        }

    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll])

    return (
        <Main>
            {jobs.map(item => (
                <Card key={item.jdUid} details={item}/>
            ))}
        </Main>
    );
};

export default List;