import { Component } from 'react';
import * as sampleService from '../../service/sampleService';
import style from './HomePage.module.css';
import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar'
import { UserContext } from '../../contexts/UserContext';
import { HomeAuthenticatedComponent } from './HomeAuthenticatedComponent';
import { HomeUnAuthComponent } from './HomeUnAuthComponent';


export default function Home() {
    const [value, onChange] = useState(new Date());
    const { currentUser, isAuthenticated } = useContext(UserContext);

    if (isAuthenticated) {
        return (
            <HomeAuthenticatedComponent username={currentUser.username} />
        )
    }
    return (
        <HomeUnAuthComponent />
    )






}