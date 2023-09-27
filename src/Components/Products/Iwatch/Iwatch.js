import React, { Component } from 'react';
import Content from '../../Content/Content';
import './Iwatch.css'


class Iwatch extends Component {
  constructor() {
    super();
    this.state = {
      data: null, // Change the state property name to 'data'
    };
  }

  componentDidMount() {
    fetch('/api/iwatch')
      .then((response) => response.json()) // Use .json() to parse JSON data
      .then((data) => {
        this.setState({ data }); // Update the state with the JSON data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  
  render() {
    const { data } = this.state; // Destructure the data from state

    return (
      <div className="main-div">
        {data ? (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <Content
                name={item.name}
                stock={item.bool ?"Out Of Stock":"In Stock"}
                price={item.price}
                size={item.size}
                display={item.display}
                imageLink={item.link}
                productLink={`iwatch/id=${index+1}`}
              ></Content>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
      </div>
    );
  }
}

export default Iwatch;
