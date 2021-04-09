import {Component} from 'react';
import * as sampleService from '../../service/sampleService';
import style from './HomePage.module.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar'

export default function Home() { 
    const [value, onChange] = useState(new Date());

        return (
            <div className={style.container}>
            <Calendar/>
             
            </div>
        )
    

}