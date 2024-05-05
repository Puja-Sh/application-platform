import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MenuItem, Select, OutlinedInput, InputLabel, FormControl } from "@mui/material";
import styled from "styled-components";
import { FiltersProps } from "../Components/home/Home";

type IProps = {
    className?: string;
    options: { label: string | number, value: string | number | null, isGroup?: boolean }[];
    dropdownName: string;
    setAllFilters: Dispatch<SetStateAction<FiltersProps>>;
    filterName: string;
    multiSelect?: boolean;
    width?: number
}

const Container = styled.div`
  margin: 10px;

  li.group-header {
    color: red !important;
    background: green;
  }
`;

const Clear = styled.button`
  position: absolute;
  right: 30px;
  top: 12px;
  background: transparent;
  color: #7c7c7c;
`;

const Dropdown = ({
                      className = '',
                      options,
                      dropdownName,
                      setAllFilters,
                      filterName,
                      multiSelect = true,
                      width
                  }: IProps) => {
    const [selected, setSelected] = useState<string[] | number[]>([]);

    const handleChange = (e: any) => {
        setSelected(e.target.value)
    }

    const clearHandler = () => {
        setSelected([])
    }

    useEffect(() => {
        setAllFilters(prev => ({ ...prev, [filterName]: selected }))
    }, [selected])

    return (
        <Container className={ className }>
            <FormControl fullWidth size={ "small" } style={ { position: 'relative', width: `${ width }px` } }>
                <InputLabel id="demo-multiple-name-label" style={ { fontSize: '14px' } }>{ dropdownName }</InputLabel>

                <Select
                    multiple={ multiSelect }
                    value={ selected }
                    onChange={ handleChange }
                    input={ <OutlinedInput label={ dropdownName }/> }
                >
                    { options.map(item => (
                        <MenuItem key={ item.value }
                                  value={ item.value as string }
                                  className={ item.isGroup ? 'group-header' : '' }
                                  disabled={ item.isGroup }
                                  style={ {
                                      textTransform: `${ item.isGroup ? 'uppercase' : 'unset' }`,
                                      fontSize: `${ item.isGroup ? '12px' : 'unset' }`,
                                  } }
                        > { item.label }

                        </MenuItem>
                    )) }
                </Select>
                <Clear onClick={ clearHandler }> ⛌ </Clear>
            </FormControl>

        </Container>
    );
};

export default Dropdown;