import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from './auth';
import InfoTooltip from './InfoTooltip';
import check from '../image/check.svg'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isInfoTooltipOpen: true,
      pass: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(props)
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // здесь обработчик регистрации
    const { email, password } = this.state;
    auth.register(email, password)
    .then((res) => {
      if(res !== undefined){
        this.props.onInfoTooltip()
        this.setState({
          message: '',
          pass: true
        },

         () => {
           setTimeout(() => {
            this.props.history.push('/sign-in');
           }, 2000)
          console.log(this.props.history)
        })
      } else {
        this.setState({
          message: 'Что-то пошло не так!'
        })
      }
      console.log(this.state)
    })
  }

  render(){
    return (
      <div className="access">
        <p className="access__welcome">
					Регистрация
        </p>
        <form onSubmit={this.handleSubmit} className="access__form">
          <input id="email" name="email" className="access__email" type="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
          <input id="password" name="password" className="access__password" placeholder="Пароль" type="password" value={this.state.password} onChange={this.handleChange} />
            <button type="submit" onSubmit={this.handleSubmit} className="access__link">
							Зарегистрироваться
						</button>
        </form>
        <div className="access__signin">
          <p className="access__query">Уже зарегистрированы?
          <Link to="sign-in" className="access__login-link">Войти</Link> 
					</p>
        </div>
        {this.state.pass && <InfoTooltip
        onClose={this.props.onClose}
        src={check}
        alt="ура!"
        text = "Вы успешно зарегистрировались!"
        name="tooltips"
        isOpen = {this.props.isOpen}
        />}
      </div>
      
  );
  }

}

export default withRouter(Register);