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
  height: 480px;
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
        maxExp,
        location
    } = details ?? {};

    const role = (rolesLabel[jobRole] as RoleLabel).label

    return (
        <Job>
            <Header className='details-header'>
                <img src={ logoUrl }/>
                <div>
                    <p className='company-name-text'> { companyName } </p>
                    <p className='role-text'> { role } </p>
                    <p className='role-text'> { location } </p>
                </div>
            </Header>

            <Salary>
                <p>Estimated Salary: { currencySymbols[salaryCurrencyCode] }{ minJdSalary } - { maxJdSalary } LPA ✅ </p>
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