import React, { Component } from 'react'
import PetSquare from '../PetSquare/PetSquare'
import Queue from '../Queue/Queue'
import ApiService from '../services/ApiService'
import './AdoptPage.css'

export default class AdoptPage extends Component {
    state = {
        cat: {},
        dog: {},
        people: [],
        userName: '',
        inLine: false,
        atFront: false,
        waiting: false
    }

    componentDidMount() {
        ApiService.getCat()
            .then(cat => {
                this.setState({ cat })
            })
            .catch((error) => this.setState({ error }));
        ApiService.getDog()
            .then(dog => {
                this.setState({ dog })
            })
            .catch((error) => this.setState({ error }));
        ApiService.getPeople()
            .then(people => {
                this.setState({ people })
            })
            .catch((error) => this.setState({ error }));
    }

    adoptButtonClicked = (type) => {
        ApiService.dequeuePet(type)
            .then(() => {
                ApiService.getCat()
                    .then(cat => {
                        this.setState({ cat })
                    })
                    .catch((error) => this.setState({ error }));
                ApiService.getDog()
                    .then(dog => {
                        this.setState({ dog })
                    })
                    .catch((error) => this.setState({ error }));
            })
            .then(() => {
                ApiService.removePerson()
                    .then(() => {
                        ApiService.getPeople()
                            .then((people) => {
                                this.setState({
                                    people,
                                    userName: '',
                                    inLine: false,
                                    atFront: false,
                                });
                            })
                            .catch((error) => this.setState({ error }));
                    });
            });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        ApiService.addPerson(this.state.userName)
            .then(people => {
                this.setState({
                    people: people,
                    inLine: true,
                    atFront: false,
                    waiting: true,
                })
            })

        this.moveQueue();
    }

    changeUserName(e) {
        this.setState({
            userName: e.target.value,
        })
    }

    moveQueue() {
        this.interval = setInterval(() => {
            ApiService.removePerson()
                .then(() => {
                    this.removeRandomPet();
                })
                .then(() => {
                    ApiService.getPeople()
                        .then((people) => {
                            this.setState({ people });
                            if (this.state.people[0] === this.state.userName) {
                                clearInterval(this.interval);
                                this.fillQueue();
                            }
                        })
                        .catch((error) => this.setState({ error }));
                })
        }, 5000);
    };

    removeRandomPet() {
        let pets = ['cat', 'dog'];
        let pet = pets[Math.floor(Math.random() * pets.length)];
        ApiService.dequeuePet(pet)
            .then(() => {
                ApiService.getCat()
                    .then(cat => {
                        this.setState({ cat })
                    })
                    .catch((error) => this.setState({ error }));
                ApiService.getDog()
                    .then(dog => {
                        this.setState({ dog })
                    })
                    .catch((error) => this.setState({ error }));
            });
    };

    fillQueue() {
        this.interval = setInterval(() => {
            const name = `Test Man ${Math.floor(Math.random() * 45)}`
            ApiService.addPerson(name)
                .then(() => {
                    ApiService.getPeople()
                        .then((people) => {
                            this.setState({ people });
                            if (people.length === 5) {
                                clearInterval(this.interval);
                                this.setState({ atFront: true, waiting: false });
                            }
                        })
                        .catch((error) => this.setState({ error }));
                });
        }, 5000);
    };

    render() {
        return (
            <div className='AdoptPage' >

                <div className='pets'>
                    {(this.state.cat &&
                        <PetSquare adoptButtonClicked={this.adoptButtonClicked}
                            pet={this.state.cat}
                            type={'cat'}
                            adoptable={this.state.atFront} />)}
                    {(this.state.dog &&
                        <PetSquare adoptButtonClicked={this.adoptButtonClicked}
                            pet={this.state.dog}
                            type={'dog'}
                            adoptable={this.state.atFront} />)}
                </div>

                {this.state.atFront &&
                    (<div>
                        <h3>Now it's time to adopt!</h3>
                    </div>)}

                {this.state.inLine === false && (
                    <form className="adopt-form" onSubmit={e => this.handleFormSubmit(e)}>
                        <h4>Want to adopt one of these cuties?</h4>
                        <label htmlFor="name">Your name:</label>
                        <input
                            id="name"
                            type='text'
                            value={this.state.userName}
                            onChange={e => this.changeUserName(e)}
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}

                {this.state.people &&
                    <Queue
                        people={this.state.people} />}

            </div>
        )
    }
}