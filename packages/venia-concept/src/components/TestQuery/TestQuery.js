import React, { useState } from "react";
import "./TestQuery.css"; // Import CSS file for styling

import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';




const TestQuery = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        age: ""
    });

const GET_RECORD = gql`
{
    getData {
      id
      first_name
      last_name
      email
      age
    }
    }
`;
    
    const ADD_RECORD = gql`
    mutation CreateForm($first_name: String!, $last_name: String!, $email: String!, $age: String!) {
        createForm(
            first_name: $first_name
            last_name: $last_name
            email: $email
            age: $age
        ){
            message
            id
        }
    }
`;

const { loading, error, data } = useQuery(GET_RECORD);
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;
if (data) {
console.log(data);
}


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleButtonClick = async (e) => {
        e.preventDefault();
        try {
            // Log the data fetched from the GET_RECORD query
            console.log("Data from GET_RECORD query:", data);
        } catch (error) {
            console.error(error);
        }
    };
    
    
    const [addRecord] = useMutation(ADD_RECORD);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(formData != null){ // this if is not working!!
                const { data } = await addRecord({
                    variables: {
                        first_name: formData.first_name,
                        last_name: formData.last_name,
                        email: formData.email,
                        // age: parseInt(formData.age, 10) // Convert age to integer
                        age: formData.age 
    
                    }
                });
                console.log(data);
            }
            else {
                alert("Enter the values.");
            }
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <form className="form">
                <label>
                    First Name:
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="input-field"
                    />
                </label>

                <label>
                    Last Name:
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="input-field"
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                    />
                </label>

                <label>
                    Age:
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="input-field"
                    />
                </label>

               
                <button type="submit" onClick={handleSubmit} className="submit-button">Add Record</button>
                <br></br><br></br>
                <button type="button" onClick={handleButtonClick} className="submit-button">Get Data</button>
                

            </form>
        </div>
    );
};

export default TestQuery;
