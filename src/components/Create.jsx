import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import DragDrop from './Drop';
import './create.css'
function CreateCN({ path,baseURL }) {

    return (
        <>
            <Navbar />
            <div className='create'>
                <h2>Creation of Quiz</h2>
                <p>Upload A PDF about the content on which u have to create quiz</p>
                <div className="fileup">
                    <DragDrop/>
                </div>
            </div>
        </>
    )
}

export default CreateCN