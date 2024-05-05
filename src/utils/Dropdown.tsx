import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MenuItem, Select, OutlinedInput, InputLabel, FormControl } from "@mui/material";
import styled from "styled-components";
import { FiltersProps } from "../Components/home/Home";

type IProps = {
    options: { label: string | number, value: string | number | null, isGroup?: boolean }[];
    dropdownName: string;
    setAllFilters: Dispatch<SetStateAction<FiltersProps>>;
    filterName: string
}

const Container = styled.div`
  width: 100%;
  margin: 10px;
  
  li.group-header {
    color: red !important;
    background: green;
  }
`;

const Dropdown = ({ options, dropdownName, setAllFilters, filterName }: IProps) => {
    const [selected, setSelected] = useState<string[] | number[]>([]);

    const handleChange = (e: any) => {
        console.log(e)
        setSelected(e.target.value)
    }

    useEffect(() => {
        setAllFilters(prev => ({ ...prev, [filterName]: selected }))
    }, [selected])

    return (
        <Container>
            <FormControl fullWidth size={ "small" }>
                <InputLabel id="demo-multiple-name-label">{ dropdownName }</InputLabel>
                <Select
                    multiple={ true }
                    value={ selected }
                    onChange={ handleChange }
                    input={ <OutlinedInput label={ dropdownName }/> }
                >
                    { options.map(item => (
                        <MenuItem key={ item.value }
                                  value={ item.value as string}
                                  className={ item.isGroup ? 'group-header' : '' }
                                  disabled={ item.isGroup }
                                  style={{
                                      textTransform: `${item.isGroup ? 'uppercase' : 'unset'}`,
                                      fontSize: `${item.isGroup ? '12px' : 'unset'}`
                                  }}
                        > { item.label } </MenuItem>
                    )) }
                </Select>
            </FormControl>

        </Container>
    );
};

export default Dropdown;