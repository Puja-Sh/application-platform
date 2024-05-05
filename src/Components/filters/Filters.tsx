import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import Dropdown from "../../utils/Dropdown";
import { minBasePay, minExperience, roles, workEnvironment } from "./filtersData";
import styled from "styled-components";
import { Input } from "@mui/material";
import { FiltersProps } from "../home/Home";

type IProps = {
    setAllFilters: Dispatch<SetStateAction<FiltersProps>>;
    setSearchValue: Dispatch<SetStateAction<string>>;
}

const FilterHOC = [
    {
        label: 'Roles',
        options: roles,
        filter: 'role',
    },
    {
        label: 'Experience',
        options: minExperience,
        filter: 'experience',
    },
    {
        label: 'Work Environment',
        options: workEnvironment,
        filter: 'environment',
    },
    {
        label: 'Min Base Pay',
        options: minBasePay,
        filter: 'minPay',
    },
]

const Container = styled.div`
  :after {
    border: none;
  }
`;

const FilterContainer = styled.div`
  display: flex;
`;

const InputElement = styled('input')`
  border-radius: 4px;
  border: 1px solid rgb(133, 133, 133);
  width: 320px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
`;


const Filters = ({ setAllFilters, setSearchValue }: IProps) => {

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    return (
        <Container>
            <FilterContainer>
                {
                    FilterHOC.map((item, index) => (
                        <Dropdown
                            key={ index }
                            options={ item.options }
                            dropdownName={ item.label }
                            filterName={ item.filter }
                            setAllFilters={ setAllFilters }/>
                    ))
                }
            </FilterContainer>

            <Input disableUnderline
                   type='text'
                   placeholder='Search Company Name'
                   slots={ { input: InputElement } }
                   onChange={ inputChangeHandler }/>
        </Container>
    );
};

export default Filters;