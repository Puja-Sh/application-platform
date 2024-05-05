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
        width: 400
    },
    {
        label: 'Experience',
        options: minExperience,
        filter: 'experience',
        multiSelect: false,
        width: 200
    },
    {
        label: 'Work Environment',
        options: workEnvironment,
        filter: 'environment',
        width: 200
    },
    {
        label: 'Min Base Pay',
        options: minBasePay,
        filter: 'minPay',
        multiSelect: false,
        width: 200
    },
]

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 40px;

  .MuiInput-root, .MuiInput-input {
    width: 300px;
  }

  :after {
    border: none;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  //flex-wrap: wrap;

  //.dropdown-component {
  //  min-width: 200px;
  //  width: 300px;
  //}
  //
  @media screen and (max-width: 900px) {
    flex-wrap: wrap;
    //.dropdown-component {
    //  min-width: 90%;
    //  width: 100%;
    //}
  }
`;

const InputElement = styled('input')`
  border-radius: 4px;
  border: 1px solid rgb(178, 178, 178);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  margin-left: 10px;

  &:focus {
    outline: none;
  }

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
                            className='dropdown-component'
                            key={ index }
                            width={ item.width }
                            options={ item.options }
                            dropdownName={ item.label }
                            filterName={ item.filter }
                            setAllFilters={ setAllFilters }
                            multiSelect={ item.multiSelect }
                        />
                    ))
                }
            </FilterContainer>

            <Input disableUnderline
                   type='text'
                   placeholder='Search Company Name'
                   slots={ { input: InputElement } }
                   onChange={ inputChangeHandler }
            />
        </Container>
    );
};

export default Filters;