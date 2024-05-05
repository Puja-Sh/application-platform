import React from 'react';
import styled from "styled-components";
import { JobResponse } from "../../def/response";
import { rolesLabel, currencySymbols } from "./utils";

interface RoleLabel {
    label: string;
    value: string;
}

const Job = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255);
  padding: 16px;
  border-radius: 20px;
  max-width: 360px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0 1px 4px 0;
  margin: 10px;
  width: 360px;
  height: 510px;
  transition: all 0.2s ease-in-out;

  p {
    font-size: 14px;
  }

  img {
    height: 45px;
    width: 45px;
    object-fit: contain;
    border-radius: 3px;
  }
  
  &:hover {
    transform: scale(1.01);
  }
`;

const Header = styled.div`
  display: flex;
  margin: 10px 0;

  div {
    margin-left: 15px;
  }

  .company-name-text {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 3px;
    color: #8b8b8b;
  }
  
  .location-text {
    font-size: 12px;
  }
`;

const Salary = styled.div`
  color: rgb(77, 89, 106);
  margin: 10px 0;
`;

const About = styled.div`
  font-size: 14px;
  position: relative;
  margin-bottom: 20px;

  .description {
    font-weight: 200;
    overflow: hidden;
    height: 200px;
    position: relative;

    &:after {
      content: "";
      height: 200px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: -15px;
      right: -15px;
      box-shadow: inset white 0 -45px 45px
    }
  }
  
  button {
    position: absolute;
    background: transparent;
    color: #4943da;
    font-size: 14px;
    font-weight: 100;
    right: 38%;
    bottom: 0;
  }

  .text-1 {
    font-size: 16px;
  }
`;

const Experience = styled.div`
  margin-top: auto;
  color: #8b8b8b;
  
  p:nth-child(2) {
    font-weight: 200;
    color: black;
  }
`;

const Apply = styled.button`
  width: 100%;
  background-color: rgb(85, 239, 196);
  color: rgb(0, 0, 0);
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.5;
  margin-top: 15px;
`;

const Pill = styled.div`
  padding: 4px 6px;
  box-shadow: rgba(6, 6, 6, 0.05) 0px 2px 6px 0px;
  border-radius: 10px;
  border: 1px solid rgb(230, 230, 230);
  margin-right: auto;
  margin-bottom: 10px;
  p{
    font-size: 10px;
  }
`;

const Card = ({ details }: { details: JobResponse }) => {
    const {
        logoUrl,
        companyName,
        jobDetailsFromCompany,
        jobRole,
        salaryCurrencyCode,
        maxJdSalary,
        minJdSalary,
        minExp,
        location
    } = details ?? {};

    const role = (rolesLabel[jobRole] as RoleLabel).label

    return (
        <Job>
            <Pill> <p> ⌛ Posted 13 days ago </p> </Pill>
            <Header className='details-header'>
                <img src={ logoUrl }/>
                <div>
                    <p className='company-name-text'> { companyName } </p>
                    <p className='role-text'> { role } </p>
                    <p className='location-text'> { location } </p>
                </div>
            </Header>

            <Salary>
                <p>Estimated Salary: { currencySymbols[salaryCurrencyCode] }{ minJdSalary ?? 0 } - { maxJdSalary } LPA ✅ </p>
            </Salary>

            <About>
                <p className='text-1'>About Company:</p>
                <p className='text-2'>About us</p>
                <p className='description'>{ jobDetailsFromCompany }</p>
                <button>Show More</button>
            </About>

            <Experience>
                <p>Minimum Experience</p>
                <p> { minExp ?? 0 } years </p>
            </Experience>

            <Apply onClick={ () => {
            } }> Ease Apply </Apply>

        </Job>
    );
};

export default Card;