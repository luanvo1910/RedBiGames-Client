import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeStock = this.onChangeStock.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            description: '',
            price:'',
            image:'',
            stock:''
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeImage(e) {
        this.setState({
            image: e.target.value
        });
    }

    onChangeStock(e) {
        this.setState({
            stock: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            name: this.state.name,
            decription: this.state.description,
            price: this.state.price,
            image: this.state.image,
            stock: this.state.stock
        };
        axios.post('http://localhost:4000/products/create', obj)
            .then(res => console.log(res.data));

        this.setState({
            name: '',
            description: '',
            price: '',
            image: '',
            stock: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Product</h3>
                <form>
                    <div className="form-group">
                        <label>Name:  </label>
                        <input 
                        type="text"
                        placeholder="Product's name"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeName}/>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input 
                        type="text" 
                        placeholder="Product's description"
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input 
                        type="text"
                        placeholder="Product's price" 
                        className="form-control"
                        value={this.state.price}
                        onChange={this.onChangePrice}/>
                    </div>
                    <div className="form-group">
                        <label>Image url: </label>
                        <input 
                        type="text"
                        placeholder="Product's image url" 
                        className="form-control"
                        value={this.state.image}
                        onChange={this.onChangeImage}/>
                    </div>
                    <div className="form-group">
                        <label>Stock: </label>
                        <input 
                        type="number"
                        placeholder="Product in stock" 
                        className="form-control"
                        value={this.state.stock}
                        onChange={this.onChangeStock}/>
                    </div>
                    <div className="form-group">
                        <input 
                        type="submit" 
                        className="btn btn-success"
                        onClick={this.onSubmit}
                        />
                    </div>
                </form>
            </div>
        )
    }
}