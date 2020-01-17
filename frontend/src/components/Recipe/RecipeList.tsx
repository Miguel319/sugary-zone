import React, { Component } from 'react'
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

export default class RecipeList extends Component {
    
    async componentDidMount() {
        const response = await axios.get(`${baseUrl}/cakes`);
        console.log(response.data.cakes);
    }
    
    render() {
        return (
            <div>
                Recipe List
            </div>
        )
    }
}
